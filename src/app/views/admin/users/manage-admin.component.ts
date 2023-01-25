import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { AdminUsers } from '../../../models/admin/AdminUsers';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { UrlConstant } from '../../../constant/UrlConstant';
import { AdminService } from '../../../services/AdminService';




@Component({
  templateUrl: 'manage-admin.component.html',
  styleUrls: ['manage-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageAdminComponent implements OnInit {


  dataSource: MatTableDataSource<any>;
  private allData: AdminUsers[];
  private columns: string[] = ['user_id', 'user_name', 'roleId', 'mobile', 'email', 'updated_at', 'created_at', 'Reset', 'Actions']
  isUpdatedPassword: boolean = false;
  private searchParamsForm: any = null
  showUserModal: boolean = false

  private ipAddress: string = "00.00.00.00";
  private userName: string = "";
  private allUsers = []
  private addForm: FormGroup;
  private updateForm: FormGroup;
  isAddMode: boolean;
  isConfirmBox: boolean = false;
  showModal: boolean = false
  private userId: string = '';
  private loading: boolean = false;
  private submitted: boolean = false;
  alert: string = ""
  updatedPassword: string = '';
  showAlertModal: boolean = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }

  closeAlertModal = () => {
    this.showAlertModal = false;
    this.isUpdatedPassword = false;
    this.alert = ""
  }


  private allRoles: []
  private initialModalData = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    roleId: [],
    user_id: '',
    created_at: '',
    updated_at: ''
  }
  private modalData = this.initialModalData


  private paginator: MatPaginator;
  private sort: MatSort;


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
    private adminService: AdminService) { }


  access_permission_read: boolean = false
  access_permission_write: boolean = false

  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.MANAGE_ADMIN_USERS);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];

   
      this.userName = JSON.parse(sessionStorage.user).user_name;
      this.adminService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
        this.getAllUsers();
        this.getAllRoles();
      });
      this.isAddMode = !this.userId;
      this.modalData = this.initialModalData
      
      this.addForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.minLength(17), Validators.pattern("^[A-Za-z0-9._%+-]+@(dangalgames.com)")]],
        mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        password: [''],
        confirmPassword: [''],

        roleId: [[]]
      }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });

      this.updateForm = this.formBuilder.group({
        name: '',
        roleId: [[]],
      })

    
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }


  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserById = (userId) => {
    this.adminService.getUserByID(UrlConstant.getAdminUserByUserIdUrl, userId, AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        if (resData.result == Responses.SUCCESS) {
          this.modalData.name = resData.users[0].user_name
          this.modalData.roleId = resData.users[0].roleId
          this.updateForm.setValue({ name: this.modalData.name, roleId: this.modalData.roleId })
        }
      },
        error => {
          this.closeAlertModal();
          this.showAlertBox("Error in fetching user");

        })
  }
  getAllUsers = () => {

    this.allData = [];

    this.adminService.getAllUsers(UrlConstant.getAllUserUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        this.allData = resData.users;
        this.allUsers = resData.users;

        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
        error => {

          if (error === 'INCORRECT_TIME_INTERVAL') {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)

          }

        });
  }


  getAllRoles = () => {
    this.adminService.getAllRoles(UrlConstant.getAllRoleUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        if (resData.result === "SUCCESS")
          this.allRoles = resData.roles;
      },
        error => {
          this.closeAlertModal();
          this.showAlertBox("Error in fetching roles")


        })
  }

  isRoleIncluded = (roleIdToCheck) => {
    let roles = this.modalData.roleId
    if (roles.length > 0 && roles.indexOf(roleIdToCheck) >= 0)
      return true
    return false
  }
  onUserIDLinkClick = (userId) => {
    this.userId = userId
    this.isAddMode = false
    this.showModal = true
    this.modalData.roleId = []
    this.getUserById(userId)
  }
  onCheckboxClick = (event) => {
    let roleValue
    if (!this.isAddMode)
      roleValue = this.updateForm.controls['roleId'].value
    else
      roleValue = this.addForm.controls['roleId'].value

    if (event.source !== undefined && event.source.value !== undefined) {
      if (event.checked)
        roleValue.push(event.source.value)
      else if (!event.checked) {
        let ind = roleValue.indexOf(event.source.value)
        if (ind >= 0)
          roleValue.splice(ind, 1)

      }

    }

  }

  get addFormControl() { return this.addForm.controls; }

  get updateFormControl() { return this.updateForm.controls };



  onAddUserClick() {
    this.userId = null
    this.addForm.reset()
    this.modalData.roleId = []
    this.addForm.patchValue({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      roleId: [],
    })

    this.isAddMode = true
    this.showModal = true

  }

  onDisable = (userId: string) => {
    this.adminService.disableUsers(UrlConstant.disableUserUrl, userId, AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        if (resData.result == Responses.SUCCESS) {
          this.closeAlertModal();
          this.showAlertBox("User has been disabled successfully");
          this.getAllUsers();
        }
        else if (resData.result == Responses.USER_ALREADY_DISABLED) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.USER_DISABLED_MSG)
          this.getAllUsers();
        }
        else if (resData.result == Responses.USER_NOT_FOUND) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
        }
      },
        error => {
          this.closeAlertModal();
          this.showAlertBox("Something went wrong")


          this.getAllUsers()
        })

    this.closeModal()
  }

  onSubmit() {
    this.submitted = true;

    if ((this.isAddMode && this.addForm.invalid) || (!this.isAddMode && this.updateForm.invalid)) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }


  showConfirmBox = (userId) => {
    this.userId = userId
    this.showModal = true
    this.isConfirmBox = true
  }
  resetPassword(userId: string) {
    this.adminService.resetPassword(UrlConstant.resetPasswordUrl, userId, AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(data => {
        this.isUpdatedPassword = false;
        if (data.result == Responses.SUCCESS) {
          this.showAlertBox("Password has been reset successfully");
          this.updatedPassword = data.newPassword;
          this.isUpdatedPassword = true;
          this.closeResetConfirmationBox();
        } else if (data.result == Responses.DB_ERROR) {
          this.showAlertBox(ResponsesDescription.DB_ERROR)
        } else if (data.result == Responses.USER_NOT_FOUND) {
          this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
        } else if (data.result == Responses.INVALID_PASSWORD) {
          this.showAlertBox(ResponsesDescription.INVALID_PASSWORD_MSG)
        } else if (data.result == Responses.INVALID_EMAIL) {
          this.showAlertBox(ResponsesDescription.INVALID_EMAIL_MSG)
        }
      },
        error => {
          this.showAlertBox("Something went wrong. Try again later")
        }
      )
  }
  private createUser() {
    this.loading = false
    let bodyParams = {
      email: this.addForm.controls['email'].value,
      mobile: this.addForm.controls['mobile'].value,
      user_name: this.addForm.controls['name'].value,
      password: this.addForm.controls['password'].value,
      role_id: this.addForm.controls['roleId'].value
    }

    this.adminService.createUser(UrlConstant.createUserUrl, AppConstants.NO_URL_PARAM, bodyParams, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(data => {

        if (data.result == Responses.SUCCESS) {
          this.showAlertBox("User created successfully")
          this.ngOnInit()
        } else if (data.result == Responses.DB_ERROR) {
          this.showAlertBox(ResponsesDescription.DB_ERROR)
        } else if (data.result == Responses.USER_ALREADY_EXIST) {
          this.showAlertBox(ResponsesDescription.USER_ALREADY_EXIST_MSG)
        } else if (data.result == Responses.INVALID_PASSWORD) {
          this.showAlertBox(ResponsesDescription.INVALID_PASSWORD_MSG)
        } else if (data.result == Responses.INVALID_EMAIL) {
          this.showAlertBox(ResponsesDescription.INVALID_EMAIL_MSG)
        } else if (data.result == Responses.INVALID_ROLE) {
          this.showAlertBox(ResponsesDescription.INVALID_ROLE_MSG)
        } else if (data.result == Responses.INVALID_MOBILE) {
          this.showAlertBox(ResponsesDescription.INVALID_MOBILE_MSG)
        } else if (data.result == Responses.DUPLICATE_USERNAME) {
          this.showAlertBox(ResponsesDescription.DUPLICATE_USERNAME_MSG)
        }
      },
        error => {
          this.showAlertBox("Something went wrong. Try again later")
        }
      )
    this.closeModal()

  }

  private updateUser() {
    this.closeModal()
    let param = {
      user_name: this.updateForm.controls['name'].value,
      role_id: this.updateForm.controls['roleId'].value
    }
    this.adminService.updateUser(UrlConstant.updateUserUrl, this.userId, param, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(
        data => {
          if (data.result == Responses.SUCCESS) {
            this.closeAlertModal();
            this.showAlertBox("User has been updated successfully")
          } else if (data.result == Responses.USER_NOT_FOUND) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND)
          } else if (data.result == Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR)
          }


          this.loading = false
        },
        error => {
          this.showAlertBox("Something went wrong. Try again later");
          this.loading = false

        });
    setTimeout(() => {
      this.loading = false
      this.ngOnInit()

    }, 500)
  }
  closeModal = () => {
    this.showModal = false
    this.submitted = false
    this.isConfirmBox = false
    this.modalData = this.initialModalData
  }
  showResetConfirmBox: boolean = false;
  resetUserId: string = "";
  resetUsername: string = "";

  showResetConfirmationBox(userId, userName) {
    this.showResetConfirmBox = true;
    this.resetUserId = userId;
    this.resetUsername = userName;
  }

  closeResetConfirmationBox() {
    this.showResetConfirmBox = false;
    this.resetUserId = "";
  }
}
