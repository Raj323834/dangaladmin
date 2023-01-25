import { Component, OnInit } from '@angular/core';
import { MiscJobService } from '../../services/MiscJobService';
import { UrlConstant } from '../../constant/UrlConstant';
import { AppConstants } from '../../constant/AppConstants';
import { Responses } from '../../constant/Responses';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { FormBuilder } from '@angular/forms';
import { PermissionNames } from '../../constant/PermissionNames';
import { HelperService } from '../../services/HelperService';

@Component({
  selector: 'app-miscjob',
  templateUrl: './miscjob.component.html',
  styleUrls: ['./miscjob.component.scss']
})
export class MiscjobComponent implements OnInit {

  public user = null;
  public permissions = []
  public alert: string = ""
  public showAlertModal: boolean = false;
  private ipAddress: string = '';
  private searchParamsForm: any = null;
  private userName: string = '';
  private searchParamsUserIDForm: any = null;
  private searchParamUserForm: any = null;
  access_permission_read_walletBackup:boolean=false
  access_permission_write_walletBackup :boolean=false


  constructor(
    private formBuilder: FormBuilder,private miscJobService:MiscJobService) {
   
  }

  ngOnInit(): void {
    let storageUserData = JSON.parse(sessionStorage.user)
    this.user = storageUserData.user_name;
    this.permissions = storageUserData.permissions;
    this.miscJobService.getIP().subscribe((res: any) => {
      this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
    });

        const accessPermission = HelperService.getModulePermissions(PermissionNames.WALLET_BACKUP);
        this.access_permission_read_walletBackup = accessPermission[HelperService.READ];
        this.access_permission_write_walletBackup = accessPermission[HelperService.WRITE];
  }


  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal (){
    this.alert = "";
    this.showAlertModal = false;
  }

  walletBackup(){
    this.userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
      this.miscJobService.walletbackup(UrlConstant.walletBackupUrl,params.toString(), AppConstants.NO_URL_PARAM,  this.ipAddress, this.userName, '' + Date.now())
        .subscribe(resData => {
          if (resData['result'] == Responses.SUCCESS) {
            this.showAlertBox("Wallet BackUp Executed Successfully")
            console.log("result")
          } else if (resData.result == Responses.NOT_FOUND) {
            this.showAlertBox(ResponsesDescription.NOT_FOUND);
          } else if (resData.result == Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          }
        });
    }
  }



