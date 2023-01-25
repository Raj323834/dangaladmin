import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppConstants } from '../../constant/AppConstants';
import { PermissionNames } from '../../constant/PermissionNames';
import { Responses } from '../../constant/Responses';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { UrlConstant } from '../../constant/UrlConstant';
import { HelperService } from '../../services/HelperService';
import { UserService } from '../../services/UserService';

@Component({
  templateUrl: 'updateBalance.component.html',
  styleUrls: ["updateBalance.component.scss"]
})
export class UpdateBalanceComponent implements OnInit {

  private ipAddress: string = '000.000.000.999';
  private userName: string = '';
  private userID: string = '';
  private searchParamsForm: any = null;
  private searchParamsUserIDForm: any = null;
  private searchParamUserForm: any = null;
  findUser: boolean = false;
  alert: string = '';
  showAlertModal: boolean = false;
  access_permission_read: boolean = false
  access_permission_write: boolean = false



  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }

  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.UPDATE_BALANCE);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.userService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          user_id: '',
          amount: 0,
          wallet_type: '',
          description: null,

        }),
        this.searchParamUserForm = this.formBuilder.group(
          {
            search_type: '',
            value: ''
          })
      this.searchParamsUserIDForm = this.formBuilder.group(
        {
          user_id: '',
        })
  }

  closeUserModal = () => {
    this.findUser = false
  }

  updateBalance() {

    this.userName = JSON.parse(sessionStorage.user).user_name;
    this.searchParamsForm.value['user_id'] = this.searchParamsUserIDForm.get("user_id").value
    this.searchParamsForm.value['amount'] = this.searchParamsForm.get("amount").value
    this.searchParamsForm.value['wallet_type'] = this.searchParamsForm.get("wallet_type").value
    this.searchParamsForm.value['description'] = this.searchParamsForm.get("description").value
    this.closeAlertModal();
    if (this.searchParamsForm.value['user_id'] == '') {
      this.showAlertBox("User ID cannot be blank");

    } else if (this.searchParamsForm.value['amount'] == '') {
      this.showAlertBox("Enter Amount");
    } else if (this.searchParamsForm.value['wallet_type'] == '') {
      this.showAlertBox("Select Wallet");
    } else {

      this.userService.updateBalance(UrlConstant.updateBalanceUrl, AppConstants.NO_URL_PARAM, this.searchParamsForm.value, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(resData => {
          this.closeAlertModal();
          this.searchParamsUserIDForm.reset();
          this.searchParamUserForm.reset();
          this.searchParamsForm.reset();

          if (resData['result'] == Responses.SUCCESS) {

            this.showAlertBox("Balance Updated \n \n   Updated Balance   :  " + resData['updatedBalance'] + "\n\n  User ID : " + resData['userId']);

          } else if (resData['result'] == Responses.INSUFFICIENT_BALANCE) {

            this.showAlertBox(ResponsesDescription.INSUFFICIENT_BALANCE);

          } else if (resData['result'] == Responses.WALLET_DOES_NOT_EXIST) {

            this.showAlertBox(ResponsesDescription.WALLET_DOES_NOT_EXIST_MSG);

          } else if (resData['result'] == Responses.WALLET_DISABLED) {

            this.showAlertBox(ResponsesDescription.WALLET_DISABLED_MSG);

          } else if (resData['result'] == Responses.WALLET_SERVICE_NOT_REACHABLE) {

            this.showAlertBox(ResponsesDescription.WALLET_SERVICE_NOT_REACHABLE_MSG);

          } else if (resData['result'] == Responses.INVALID_WALLET_NAME) {

            this.showAlertBox(ResponsesDescription.INVALID_WALLET_NAME_MSG);

          } else if (resData['result'] == Responses.DB_ERROR) {

            this.showAlertBox(ResponsesDescription.DB_ERROR);

          }
          else if (resData['result'] == Responses.INVALID_REQUEST) { 
            this.showAlertBox(ResponsesDescription.INVALID_REQUEST);
          }
        });
    }


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



}
