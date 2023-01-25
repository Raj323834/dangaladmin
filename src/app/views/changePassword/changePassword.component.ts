import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AppConstants } from '../../constant/AppConstants';
import { Responses } from '../../constant/Responses';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { UrlConstant } from '../../constant/UrlConstant';
import { ChangePasswordParam } from '../../searchParam/changePassword/ChangePasswordParam';
import { AdminService } from '../../services/AdminService';


@Component({
  templateUrl: 'changePassword.component.html',
  styleUrls: ['changePassword.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  private userId: string = "";
  private ipAddress: string = "00.00.00.00";
  private userName: string = "";
  constructor(

    private adminService: AdminService) { }

  ngOnInit() {
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
  }

  ChangePassword = () => {
    let param = new ChangePasswordParam();
    let params: URLSearchParams = new URLSearchParams();
    this.userName = JSON.parse(sessionStorage.user).user_name;
    this.adminService.getIP().subscribe((res: any) => {
      this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
    });
    this.userId = JSON.parse(sessionStorage.user).user_id;
    if (this.oldPassword == '' || this.newPassword == '' || this.confirmPassword == '') {
      this.showAlertBox("Enter old password, new password and confirm password");
    } else if (this.newPassword != this.confirmPassword) {
      this.showAlertBox("New Password should match with confirm password");
    } else {
      param.old_password = this.oldPassword;
      param.new_password = this.newPassword;
      params.set("old_password", this.oldPassword);
      params.set("new_password", this.newPassword);

      this.adminService.updatePassword(UrlConstant.changePassword, this.userId.toString(), param, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(resData => {
          if (resData.result == Responses.SUCCESS) {
            this.showAlertBox(ResponsesDescription.SUCCESS);

          } else if (resData.result == Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);

          } else if (resData.result == Responses.USER_NOT_FOUND) {
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);

          } else if (resData.result == Responses.INVALID_PASSWORD) {
            this.showAlertBox(ResponsesDescription.INVALID_PASSWORD);

          } else if (resData.result == Responses.PASSWORD_MISMATCH) {
            this.showAlertBox(ResponsesDescription.PASSWORD_MISMATCH);
          }
        })

    }
  }
}
