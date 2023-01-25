import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UpdateAddressParam } from '../../../models/user/UpdateAddressParam';
import { UserLoginService } from '../../../services/UserLoginService';
import { HelperService } from '../../../services/HelperService';
import { PlayerDetails } from '../../../models/players/PlayerDetails';
import { UserModalData } from '../../../models/players/UserModalData';
import { UrlConstant } from '../../../constant/UrlConstant';
import { AppConstants } from '../../../constant/AppConstants';
import { UserService } from '../../../services/UserService';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: 'player-detail.component.html',
  styleUrls: ['player-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerDetailComponent implements OnInit {
  public updateUserInfoButtonClicked : boolean;
  private ipAddress: string = '';
  public address: string = '';
  public address2: string = '';
  public city: string = '';
  public pin: string = '';
  public state: string = '';
  public firstName: string = '';
  public middleName: string = '';
  public lastName: string = '';
  public dateOfBirth: string = '';

  //general page loading
  private nodata: boolean = true;
  dataSource: MatTableDataSource<any>;
  private playerDetails: PlayerDetails[];
   modalUserData: UserModalData;
  columns: string[] = [
    'userId', 'userName', 'email', 'mobile', 'kycVerified','Details'
  ]
  private userId: string = ''
  searchParamsForm = null;
  private showModal: boolean = false;

  public access_permission_read: boolean = false;
  public access_permission_write: boolean = false;

  //user modal details
  public showUserModal: boolean = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private accountService: UserLoginService,
    private http: HttpClient,
    private userService:UserService,
    private spinnerService: NgxSpinnerService,
  ) {

  }

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions("get player details");
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
    this.searchParamsForm = this.formBuilder.group(
      {
        mobile: ['',Validators.required],
        email: ['',Validators.required],
        userId: ['',Validators.required],
        dangalUser: ['',Validators.required]
      }
    )
    if (this.access_permission_read) {
      this.userService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      
    }
  }


  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserDetail(from: string, userId: string) {
    let storageUserData = JSON.parse(sessionStorage.user);
    let userName: string = storageUserData.user_name;
    let requestParameters: URLSearchParams = new URLSearchParams();
    requestParameters.set('userId', userId)
    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, requestParameters.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(userData => {
        if (userData.result === Responses.SUCCESS) {
          this.modalUserData = userData;
          this.address = this.modalUserData.address;
          this.address2 = this.modalUserData.address2;
          this.city = this.modalUserData.city;
          this.pin = this.modalUserData.pin;
          this.state = this.modalUserData.state;
          this.firstName = this.modalUserData.firstName;
          this.lastName = this.modalUserData.lastName;
          this.middleName = this.modalUserData.middleName;
          this.dateOfBirth = this.modalUserData.dob;
          if (from == 'userID') {
            this.showUserModal = true;
          }
          else if (from == 'link') {
            this.showUserModal = false;
          }
        } else if (userData.result === Responses.USER_NOT_FOUND) {
          this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
        }
      });
  }

  validateSearchFilter = (param) => {
    return true;
  }

  get search() { return this.searchParamsForm.controls; }

  alert = "";
  showAlertModal = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true;
  }
  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = "";
  }
  
  getDetails = () => {
    this.spinnerService.show();
    let storageUserData = JSON.parse(sessionStorage.user);
    let userName: string = storageUserData.user_name;
    let requestParameters: URLSearchParams = new URLSearchParams();
    if ((this.searchParamsForm.get("mobile").value != '' && this.searchParamsForm.get("mobile").value != null) ||
      (this.searchParamsForm.get("email").value != '' && this.searchParamsForm.get("email").value != null) ||
      (this.searchParamsForm.get("userId").value != '' && this.searchParamsForm.get("userId").value != null) ||
      (this.searchParamsForm.get("dangalUser").value.trim() != '' && this.searchParamsForm.get("dangalUser").value.trim() != null)) {
      requestParameters.set('mobile', this.searchParamsForm.get("mobile").value);
      requestParameters.set('email', this.searchParamsForm.get("email").value);
      requestParameters.set('userId', this.searchParamsForm.get("userId").value);
      requestParameters.set('dangalUser', this.searchParamsForm.get("dangalUser").value);
      this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, requestParameters.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          if (resData.result == Responses.SUCCESS) {
            this.spinnerService.hide();
            this.playerDetails = [resData];
            this.nodata = false;
            this.dataSource = new MatTableDataSource(this.playerDetails);
          } else if (resData.result == Responses.USER_NOT_FOUND) {
            this.spinnerService.hide();
            this.playerDetails = [];
            this.nodata = true;
            this.dataSource = new MatTableDataSource(this.playerDetails);
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
          }
        },
          error => {
            this.closeAlertModal();
            this.showAlertBox('error')
            this.spinnerService.hide();
          })
    } else {
      this.showAlertBox("Please enter any one field.");
      this.spinnerService.hide();
    }
  }

  closeModal = () => {
    this.showUserModal = false;
    this.updateUserInfoButtonClicked=false;
    this.showModal = false;
    this.reset();
  }
 
  updateUserInfoClicked = (row) => {
    this.spinnerService.show();
    this.getDetails();
    this.updateUserInfoButtonClicked = true;
    this.showUserModal = true;
    this.modalUserData = row;
    this.address = this.modalUserData.address;
    this.address2 = this.modalUserData.address2;
    this.city = this.modalUserData.city;
    this.pin = this.modalUserData.pin;
    this.state = this.modalUserData.state;
    this.firstName = this.modalUserData.firstName;
    this.middleName = this.modalUserData.middleName;
    this.lastName = this.modalUserData.lastName;
    this.dateOfBirth = this.modalUserData.dob;
  }

  updateUserInfo = (userId) => {
    if (this.dateOfBirth != "" && this.dateOfBirth != null) {
      this.spinnerService.show();
      let storageUserData = JSON.parse(sessionStorage.user);
      let userName: string = storageUserData.user_name;
      let requestParameters: UpdateAddressParam = new UpdateAddressParam();
      requestParameters.userId = userId;
      requestParameters.address = this.address;
      requestParameters.address2 = this.address2;
      requestParameters.city = this.city;
      requestParameters.state = this.state;
      requestParameters.pin = this.pin;
      requestParameters.firstName = this.firstName;
      requestParameters.middleName = this.middleName;
      requestParameters.lastName = this.lastName;
      requestParameters.dateOfBirth = AppConstants.getTimestampInMonthDayYear(this.dateOfBirth);

      this.userService.updateUserInfo(UrlConstant.updateUserInfo, AppConstants.NO_URL_PARAM, requestParameters, userName, this.ipAddress, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          if (resData.result == Responses.SUCCESS) {
            this.spinnerService.hide();
            this.showAlertBox("User Info Updated Successfully");
            this.closeModal();
            this.getDetails();
            this.reset();
          } else if (resData.result == Responses.DB_ERROR) {
            this.spinnerService.hide();
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result == Responses.UPS_NOT_REACHABLE) {
            this.spinnerService.hide();
            this.showAlertBox("Server error");
            this.spinnerService.hide();
          } else if (resData.result == Responses.USER_NOT_FOUND) {
            this.spinnerService.hide();
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
          }
          else if (resData.result == Responses.INVALID_FIRST_NAME) {
            this.spinnerService.hide();
            this.showAlertBox(ResponsesDescription.INVALID_FIRST_NAME)
          }
          else if (resData.result == Responses.INVALID_MIDDLE_NAME) {
            this.spinnerService.hide();
            this.showAlertBox(ResponsesDescription.INVALID_MIDDLE_NAME);
          }
          else if (resData.result == Responses.INVALID_LAST_NAME) {
            this.spinnerService.hide();
            this.showAlertBox(ResponsesDescription.INVALID_LAST_NAME);
          }
        },
          error => {
            this.closeAlertModal();
            this.spinnerService.hide();
            this.showAlertBox("There was an error updating details")
          });
    }
    else {
      this.showAlertBox("Please Enter date of Birth");
    }
  }

  reset() {
    this.address = "";
    this.address2 = "";
    this.city = "";
    this.pin = "";
    this.state = "";
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";
    this.dateOfBirth = "";
  }
}