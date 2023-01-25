
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from '../../../constant/AppConstants';
import { PermissionNames } from '../../../constant/PermissionNames';
import { Responses } from '../../../constant/Responses';
import { UrlConstant } from '../../../constant/UrlConstant';
import { HelperService } from '../../../services/HelperService';
import { UserService } from '../../../services/UserService';

@Component({
  templateUrl: 'deletePlayer.component.html',
  styleUrls: ['deletePlayer.component.scss'],
})
export class DeletePlayerComponent {
  public ipAddress: string = '000.000.000.999';
  searchParamsUserForm = null;
  findUser: boolean = false;
  userId: string = '';
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private spinnerService:NgxSpinnerService) { }

  public alert = "";
  public showAlertModal: boolean = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true;
  }
  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = ""
  }
  permissions = []
  public access_permission_read: boolean = false;
  public access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.DELETE_PLAYER);

    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.userService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsUserForm = this.formBuilder.group(
        {
          userId: ''
        })
  }

  findUserModal() {
    this.findUser = true;
  }

  deleteUser() {
    let storageUserData = JSON.parse(sessionStorage.user);
    let userName: string = storageUserData.user_name;
    this.userId = this.searchParamsUserForm.get("userId").value
    this.searchParamsUserForm.value['userId'] = this.userId

    if (this.userId == '') {
      this.closeAlertModal();
      this.showAlertBox("Enter UserId");

    } else {
      console.log(this.searchParamsUserForm.value)
      this.spinnerService.show();
      this.userService.deleteUser(UrlConstant.deleteUserUrl, AppConstants.NO_URL_PARAM, this.searchParamsUserForm.value, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          console.log(resData)
          if (resData['result'] == Responses.SUCCESS) {
            this.closeAlertModal();
            this.showAlertBox("User Id deleted successfully");
            this.searchParamsUserForm.reset()
          }
        },
          error => {
            this.spinnerService.hide();
            this.showAlertBox("Server Error");
          });
    }
  }

  receiveFindUserIDCloseModalMessage($event) {
    if ($event != "") {
      this.findUser = false;
      this.userId = $event;
    } else {
      this.findUser = false;
    }
  }
}
