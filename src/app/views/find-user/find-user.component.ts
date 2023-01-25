import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppConstants } from '../../constant/AppConstants';
import { Responses } from '../../constant/Responses';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { UrlConstant } from '../../constant/UrlConstant';
import { UserService } from '../../services/UserService';


@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss']
})
export class FindUserComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  private userID: string = "";
  searchParamUserForm: any = null;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.searchParamUserForm = this.formBuilder.group(
      {
        search_type: '',
        value: ''
      })
  }
  alert = "";
  showAlertModal = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true;
  }
  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = "";
    this.sendCloseFindUserIDToBaseComponent();
  }

  validateFindUserIDSearchFilter = (params) => {
    if (this.searchParamUserForm.get("search_type").value === '') {
      this.showAlertBox(AppConstants.FIND_USERID_HEADER)
      return false;
    } else if (this.searchParamUserForm.get("search_type").value === AppConstants.MOBILE) {
      if ((this.searchParamUserForm.get("value").value === '') || (this.searchParamUserForm.get("value").value === null) ||
        (this.searchParamUserForm.get("value").value == undefined) || (this.searchParamUserForm.get("value").value.length != 10)) {
        this.showAlertBox(AppConstants.MOBILE_MSG)
        return false;
      } else {
        params.set('mobile', this.searchParamUserForm.get("value").value)
        return true;
      }
    } else if (this.searchParamUserForm.get("search_type").value === AppConstants.EMAIL) {
      if ((this.searchParamUserForm.get("value").value === '') || (this.searchParamUserForm.get("value").value === null) ||
        (this.searchParamUserForm.get("value").value == undefined)) {
        this.showAlertBox(AppConstants.EMAIL_MSG)
        return false;
      } else {
        params.set('email', this.searchParamUserForm.get("value").value)
        return true;
      }
    } else if (this.searchParamUserForm.get("search_type").value === AppConstants.DANGAL_USER) {
      if ((this.searchParamUserForm.get("value").value === '') || (this.searchParamUserForm.get("value").value === null) ||
        (this.searchParamUserForm.get("value").value == undefined)) {
        this.showAlertBox(AppConstants.DANGAL_USER_MSG)
        return false;
      } else {
        params.set('dangalUser', this.searchParamUserForm.get("value").value)
        return true;
      }
    } else {
      return false;
    }
  }

  getFindUserIDDetails() {
    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let isValid = this.validateFindUserIDSearchFilter(params);
    if (isValid) {
      this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, "0.0.0.0", userName, '' + Date.now())
        .subscribe(resData => {
          this.searchParamUserForm.reset()
          if (resData['result'] == Responses.SUCCESS) {
            this.userID = resData['userId'];
            this.sendCloseFindUserIDToBaseComponent();
          } else if (resData['result'] == Responses.USER_NOT_FOUND) {
            this.userID = '';
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
          } else if (resData['result'] == Responses.INTERNAL_SERVER_ERROR) {
            this.userID = '';
            this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR);
          } else if (resData['result'] == Responses.DB_ERROR) {
            this.userID = '';
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else {
            this.userID = '';
            this.showAlertBox(ResponsesDescription.UNABLE_TO_RETRIEVE_DATA);
          }
        },
          error => {
            this.showAlertBox(ResponsesDescription.ERROR_FINDING_USERID);
          });
    }
  }

  sendCloseFindUserIDToBaseComponent() {
    this.messageEvent.emit(this.userID);
  }

}
