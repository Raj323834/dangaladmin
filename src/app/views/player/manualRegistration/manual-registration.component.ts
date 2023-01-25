import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from '../../../constant/AppConstants';
import { PermissionNames } from '../../../constant/PermissionNames';
import { Responses } from '../../../constant/Responses';
import { UrlConstant } from '../../../constant/UrlConstant';
import { HelperService } from '../../../services/HelperService';
import { UserService } from '../../../services/UserService';

@Component({
  templateUrl: 'manual-registration.component.html',
  styleUrls: ['manual-registration.component.scss'],
})
export class ManualRegistration {
  public ipAddress: string = '';
  searchParamsMobileForm = null;
  searchParamsEmailForm = null;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  public alert = "";
  public showAlertModal: boolean = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }
  permissions = []
  public access_permission_read: boolean = false;
  public access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.MANUAL_REGISTRATION);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.userService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsMobileForm = this.formBuilder.group(
        {
          mobile_number: '',
          ip_address: this.ipAddress
        })
      this.searchParamsEmailForm = this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email, Validators.minLength(17), Validators.pattern("^[A-Za-z0-9._%+-]+@(gmail.com)")]],
          ip_address: this.ipAddress
        })
  }

 
  registerMobile() {
    let storageUserData = JSON.parse(sessionStorage.user);
    let userName: string = storageUserData.user_name;
    var mobile = this.searchParamsMobileForm.get("mobile_number").value
    this.searchParamsMobileForm.value['mobile_number'] = mobile
    this.searchParamsMobileForm.value['ip_address'] = this.ipAddress

    if (mobile == '') {
      this.closeAlertModal();
      this.showAlertBox("Enter Mobile number");

    } else if ((mobile.length != 10) || (mobile == '1111111111') || (mobile == '2222222222') || (mobile == '3333333333') || (mobile == '4444444444')
      || (mobile == '5555555555') || (mobile == '6666666666') || (mobile == '7777777777') || (mobile == '1234567890') || (mobile == '0987654321')) {
      this.closeAlertModal();
      this.showAlertBox("Enter a valid mobile number ");

    } else {
      console.log(this.searchParamsMobileForm.value)
      this.userService.registerMobile(UrlConstant.registerMobileUrl,AppConstants.NO_URL_PARAM,this.searchParamsMobileForm.value, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          console.log(resData)
          if (resData['result'] == Responses.SUCCESS) {
            this.closeAlertModal();
            this.showAlertBox("Mobile Registration successful");
            this.searchParamsMobileForm.reset()
          }
        });
    }
  }

  registerEmail() {
    let userName = JSON.parse(sessionStorage.user).user_name;
    var email = this.searchParamsEmailForm.get("email").value
    this.searchParamsEmailForm.value['email'] = email
    this.searchParamsEmailForm.value['ip_address'] = this.ipAddress

    if (email == '') {
      this.closeAlertModal();
      this.showAlertBox("Enter a gmail Email id");

    } else if (!email.includes("gmail.com")) {
      this.closeAlertModal();
      this.showAlertBox("Enter a gmail Email id");

    } else {
      console.log(this.searchParamsEmailForm.value)
      this.userService.registerEmail(UrlConstant.registerEmailUrl,AppConstants.NO_URL_PARAM,this.searchParamsMobileForm.value, this.ipAddress, userName, '' + Date.now())
      .subscribe(resData => {
          console.log(resData)
          if (resData['result'] == Responses.SUCCESS) {
            this.closeAlertModal();
            this.showAlertBox("Email Registration successful");
            this.searchParamsEmailForm.reset()
          }
        });
    }
  }
}
