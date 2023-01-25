import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginService } from '../../services/UserLoginService';
import { Responses } from '../../constant/Responses';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { UrlConstant } from '../../constant/UrlConstant';
import { AppConstants } from '../../constant/AppConstants';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements  OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  emailLogin:boolean;
  alert = ""
  showAlertModal = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userLoginService: UserLoginService
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('user')
      this.emailLogin = true
      if(this.emailLogin)
      this.form = this.formBuilder.group({
          username: ['',[Validators.required,]],
          password: ['', [Validators.required]]
      });
      else
      this.form = this.formBuilder.group({
          username: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          password: ['', [Validators.required]]
      });

      this.returnUrl = '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  changeLogin = ()=>{
      if(this.emailLogin)
       this.emailLogin = false
     else
       this.emailLogin = true  

     //  this.setValidators()
  }

  login = (bodyParams) => {
    this.userLoginService.login(UrlConstant.loginUrl, AppConstants.NO_URL_PARAM, bodyParams)
      .subscribe(data => {
        if (data.result == Responses.SUCCESS) {
          if (!data.disabled) {
            this.router.navigate([this.returnUrl])
            this.loading = false;
            setTimeout(() => {
            }, 500)
          } else {
            this.closeAlertModal()
            this.showAlertBox('Your account has been disabled. Contact Super Admin.');
            this.loading = false;
          }
        }else if (data.result == Responses.INVALID_PASSWORD) {
          this.closeAlertModal()
          this.showAlertBox('INVALID PASSWORD, Try again. or Contact admin for reset Password');
          this.loading = false;
        }  else if (data.result == Responses.USER_NOT_FOUND) {
          this.closeAlertModal()
          this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
          this.loading = false;
        } else if (data.result == Responses.DB_ERROR) {
          this.closeAlertModal()
          this.showAlertBox(ResponsesDescription.DB_ERROR);
          this.loading = false;
        } else if (data.result == Responses.INVALID_ROLE) {
          this.closeAlertModal()
          this.showAlertBox('Invalid Role');
          this.loading = false;
        }
      },
        error => {

          this.closeAlertModal()
          // this.showAlertBox("Something went wrong.Please try again");
          this.showAlertBox("Something went wrong.Please try again");
          this.loading = false;
        })
   //  this.router.navigate([this.returnUrl])
  }

  setValidators = () => {
      if(this.emailLogin)
      this.form.get('username').setValidators([Validators.required])
     else this.form.get('username').setValidators([Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])

  }

  onSubmit() {
      this.submitted = true;

   //  this.setValidators()
      // stop here if form is invalid
      console.log(this.form)
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      let bodyParams = {password:this.form.controls["password"].value}

     if(this.emailLogin)
      bodyParams = Object.assign(bodyParams,{email: this.form.controls["username"].value})
     else
      bodyParams = Object.assign(bodyParams,{mobile: this.form.controls["username"].value})

      this.login(bodyParams)

  }
}