import { Component, OnInit } from '@angular/core';
import {   ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AppConstants } from '../../../constant/AppConstants';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UrlConstant } from '../../../constant/UrlConstant';
import { LockUser } from '../../../models/lockUser/LockUser';
import { UserModal } from '../../../models/user/UserModal';
import { kycJourneySearchParam } from '../../../searchParam/kyc/KycJourneySearchParam';
import { ExcelService } from '../../../services/ExcelService';
import { HelperService } from '../../../services/HelperService';
import { UserService } from '../../../services/UserService';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  templateUrl: 'lockuser.component.html',
  styleUrls: ['lockuser.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LockeduserComponent implements OnInit {

  private ipAddress: string = '';
  private idResult: string = '';
  public findUser: boolean = false
  private title: string = "LockUser";
  private excel: any[] = [];
  public showConfirmationAlert: boolean = false;

  private userID: string = ''
  private showDownloadButton: boolean = false;
  private allData: LockUser[];
  private userName: string = ""
  private columns: string[] = [
    'userId', 'lockedTime', 'lockedBy','depositBalance','withdrawalBalance','promoBalance',
    'lockedBalance','pokerDepositBalance','pokerWithdrawalBalance', 'Actions'
  ]
  private alertBox: boolean = true;

  private nodata: boolean = true
  private dataSource: MatTableDataSource<any>;

  private userId: string = ''
  private searchParamsForm: any = null
  private searchParamUserForm: any = null
  private showModal = false
  public userIdToLock: string = "";

  public showUserModal: boolean = false;

  private paginator: MatPaginator;
  private sort: MatSort;

  private userModal: UserModal
  
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private excelService: ExcelService,
    private spinnerService: NgxSpinnerService,
  ) {

  }

  permissions = []
  public access_permission_read: boolean = false;
  public access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions("lock user");
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
    this.userName = JSON.parse(sessionStorage.user).user_name;
      this.userService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
        this.getAllLockedUser();
      });
     
      this.searchParamsForm = this.formBuilder.group(
        {
          user_id: ['']
        }
      )
      this.searchParamUserForm = this.formBuilder.group(
        {
          search_type: '',
          value: ''
        })
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }

  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public alert: string = ""
  public showAlertModal: boolean = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
    this.clicked = false;

  }
  showConfirmationBox(userID: string) {
    this.showConfirmationAlert = true;
    this.userIdToLock = userID;
  }
  closeConfirmationAlert() {
    this.showConfirmationAlert = false;
    this.userIdToLock = "";
  }
  getUserDetail(from: string, userId: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId)
    
    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(userData => {
        if (userData.result == Responses.SUCCESS) {
          this.userModal = userData
           this.showUserModal = true;
          if (from == 'userID')
            this.showUserModal = true;
          else if (from == 'link') {
            this.showUserModal = false;
          }
        } else {
          this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
        }
      },
        error => {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
        });
  }
  receiveCloseModalMessage($event){
     
    if( $event){
      this.showUserModal=false;
    }
  }
  closeModal = () => {
   
    this.showUserModal = false;
    this.showModal = false;
  }


  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length
    if (paramLength === 1) {
      if (param.userId !== undefined || param.panNumber !== undefined || param.addressProofNumber !== undefined)
        return true;
    } else {
      this.closeAlertModal();
      this.showAlertBox('Enter User ID');
      return false;
    }
  }

  clicked = false;

  get search() { return this.searchParamsForm.controls; }

  LockUser = () => {

    let param = new kycJourneySearchParam()
    if (this.search.user_id.value !== undefined && this.search.user_id.value.trim() !== '') {
      param.userId = this.search.user_id.value
    }

    let isValid = this.validateSearchFilter(param)
    if (isValid) {
      this.spinnerService.show();
      this.userService.lockUser(UrlConstant.lockUserUrl, AppConstants.NO_URL_PARAM, param, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(
          resData => {
            if (resData.result === Responses.SUCCESS) {
              this.spinnerService.hide();
              this.showAlertBox('User locked successfully')
              this.getAllLockedUser();
              this.reset();
              this.clicked = false;
            }else if(resData.result === Responses.USER_ALREADY_LOCKED){
              this.showAlertBox('User already locked')
              this.spinnerService.hide();
              this.clicked = false;
            }
             else {
              this.spinnerService.hide();
              this.showAlertBox(ResponsesDescription.SERVER_ERROR_MSG)
              this.clicked = false;
            }
          },
          error => {
            this.spinnerService.hide();
            this.showAlertBox(ResponsesDescription.SERVER_ERROR_MSG)
            this.clicked = false;
          }
        )
    }
  }

  unLockUser = (userId) => {
  this.showConfirmationAlert=false;
    let param = new kycJourneySearchParam()
    param.userId = userId;
    this.userService.unLockUser(UrlConstant.unLockUserUrl, AppConstants.NO_URL_PARAM, param,  this.ipAddress,this.userName, '' + Date.now())
      .subscribe(resData => {
        
        if (resData.result === Responses.SUCCESS) {
          this.spinnerService.hide();
          this.showAlertBox('User unlocked successfully')
          this.closeModal();
          this.getAllLockedUser();
        } else if (resData.result === Responses.USER_NOT_FOUND) {
          this.spinnerService.hide();
          this.showAlertBox(ResponsesDescription.USER_NOT_FOUND)
        } else if (resData.result === Responses.INTERNAL_SERVER_ERROR) {
          this.spinnerService.hide();
          this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR)
        }
      },
        error => {
          this.spinnerService.hide();
          this.showAlertBox(ResponsesDescription.SERVER_ERROR_MSG)
        }
      )
  }


  getAllLockedUser = () => {

    this.excel = [];
    this.showDownloadButton = false;
    this.allData = []
    this.nodata = true;
    this.userService.getAllLockedUserList(UrlConstant.getAllLockedUSersListUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        if (resData.result === Responses.SUCCESS) {
          this.allData = resData.lockedUsers;
          this.showDownloadButton = true
          if (this.allData != null && this.allData.length > 0) {
            this.allData.forEach(row => {
              this.excel.push(row);
            });
          }
          this.nodata = false;
        } else if (resData.result === Responses.DB_ERROR) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.DB_ERROR);
        } else if (resData.result === Responses.NO_LOCKED_USER_FOUND) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.NO_LOCKED_USER_FOUND);

        } else if (resData.result === Responses.INTERNAL_SERVER_ERROR) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR);
        }

        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
        error => {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
        })
  }

  closeFindUserIDModal = () => {
    this.findUser = false
  }
  findUserModal() {
    this.findUser = true;
  }
  receiveFindUserIDCloseModalMessage($event){

    if( $event!=""){
      this.findUser = false;
      this.userID=$event;
    }else{
      this.findUser = false;
    }
  }

  private showAlertMessage(message: string) {
    this.userID = '';
    this.closeAlertModal();
    this.showAlertBox(message);
  }

  reset(){
    this.userID = "";
  }
}
