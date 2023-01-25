import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from '../../../constant/AppConstants';
import { Responses } from '../../../constant/Responses';
import { UrlConstant } from '../../../constant/UrlConstant';
import { FraudMarkType } from '../../../enums/reports/FraudMarkType';
import { UserModal } from '../../../models/user/UserModal';
import { HelperService } from '../../../services/HelperService';
import { ReportService } from '../../../services/ReportService';
import { UserService } from '../../../services/UserService';
import { FraudUpdateParam } from '../../../searchParam/reports/suspicious/FraudUpdateParam';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { PermissionNames } from '../../../constant/PermissionNames';
import { SuspiciousReportDataModel } from '../../../models/reports/suspicious/SuspiciousReportDataModel';


@Component({
  templateUrl: 'suspiciousReports.component.html',
  styleUrls: ['suspiciousReports.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SuspiciousReportsComponent {

  private ipAddress: string = '0.0.0.0';
  public showFraudAlert: boolean = false;

  //general page loading
  nodata = true
  dataSource: MatTableDataSource<any>;
  allData: SuspiciousReportDataModel[];
  columns: string[] = ['userId', 'isPnlRuleViolated', 'isGamePlayPnlRuleViolated', 'isManualWithdrawalInLastHours','isDepositFailure', 'Actions'];


  public showUserModal: boolean = false
  private modalUserData = UserModal;
  public userIdTobeProcessed: string = '';
  public reason: string = '';
  private searchParamsForm: any = null
  private showModal: boolean = false
  private paginator: MatPaginator;
  private sort: MatSort;
  
  public alert: string = ""
  public showAlertModal: boolean = false;

  
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
    private SpinnerService: NgxSpinnerService,
    private reportService: ReportService,
  ) {

  }
  permissions = []
  access_permission_read: boolean = false
  access_permission_write: boolean = false

  ngOnInit() {


    const accessPermission = HelperService.getModulePermissions(PermissionNames.SUSPICIOUS_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          fromTime: '',
          toTime: ''
        });
  }

  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }

  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length
    if (paramLength === 0) {
      return false
    } else if (paramLength === 1) {
      return false
    }
    if (paramLength === 2) {
      if (param.fromTime !== '' && param.toTime !== '') {
        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
          return false
        } else {
          return true
        }
      }

    }

    this.closeAlertModal();
    this.showAlertBox("Enter Both From Date and To Date")

    return false;

  }

  get search() { return this.searchParamsForm.controls; }


  getUserDetail(from: string, userId: string) {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    console.log(userId)
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId)

    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl,params.toString(),AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
    .subscribe(userData => {
        console.log(userData)
        if (userData.result == Responses.SUCCESS) {
          this.userModal = userData
          this.showUserModal = true;
          if (from == 'userID')
            this.showUserModal = true
          else if (from == 'link') {
            this.showUserModal = false
          }
        } else if (userData.result == Responses.USER_NOT_FOUND) {
          this.showAlertBox(ResponsesDescription.USER_NOT_FOUND)
        } else {
          this.showAlertBox(ResponsesDescription.ERROR_FINDING_DETAILS)
        }

      
      },
        error => {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.ERROR_FINDING_DETAILS)
        });
  }
  receiveCloseModalMessage($event){
     
    if( $event){
      this.showUserModal=false;
    }
  }
  getSuspiciousReportDetails = () => {

    let userName: string = JSON.parse(sessionStorage.user).user_name;
    let fromTime;
    let toTime;

    if (this.searchParamsForm.get("fromTime").value !== '') {
      fromTime = `${this.searchParamsForm.get("fromTime").value} 00:00:00`;
      this.searchParamsForm.value['fromTime'] = AppConstants.getTimestamp(fromTime).toString();
    } else {
      this.searchParamsForm.value['fromTime'] = ''
      fromTime = ''
    }

    if (this.searchParamsForm.get("toTime").value !== '') {
      toTime = `${this.searchParamsForm.get("toTime").value} 23:59:59`;
      this.searchParamsForm.value['toTime'] = AppConstants.getTimestamp(toTime).toString();
    } else {
      this.searchParamsForm.value['toTime'] = ''
      toTime = ''
    }

    let isValid = this.validateSearchFilter(this.searchParamsForm.value)
    if (isValid) {
      this.SpinnerService.show();
      this.reportService.getSuspiciousReport(UrlConstant.getSuspiciousReportUrl, AppConstants.NO_URL_PARAM, this.searchParamsForm.value, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.SpinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.allData = resData.suspiciousUsers;
            if (resData.suspiciousUsers != null) {
              if (resData.suspiciousUsers.length != 0) {
                this.nodata = false;
                this.dataSource = new MatTableDataSource(this.allData);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
              } else {
                this.closeAlertModal();
                this.showAlertBox("No data with above filters")
              }


            } else {
              this.closeAlertModal();
              this.showAlertBox("No data with above filters")
            }
          } else if (resData.result === Responses.DB_ERROR) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR)
          } else if (resData.result === Responses.NOT_FOUND) {
            this.closeAlertModal();
            this.showAlertBox("No data found")
          }

        },
          error => {
            this.SpinnerService.hide();
            this.closeAlertModal();
            this.showAlertBox("There was an error retrieving data");
          })
    } else {
      this.closeAlertModal();
      this.showAlertBox("Enter Both From Date and To Date")
    }


  }

  closeModal = () => {
    this.showUserModal = false
    this.showModal = false
  }

  showFraudBox(userID: string) {
    this.showFraudAlert = true;
    this.userIdTobeProcessed = userID;
  }
  processFraudChange(userId, markFraud) {
    let params = new FraudUpdateParam();
    if (this.reason == undefined || this.reason == '') {
      this.closeAlertModal();
      this.showAlertBox("Pls enter the reason");
      this.showFraudAlert = false;
    }
    else {
      params.userId = userId;
      params.action = markFraud ? FraudMarkType.MARK_FRAUD : FraudMarkType.MARK_NOT_FRAUD;
      params.reason = this.reason;
      this.processFraudChangeNetworkCall(params);
    }
  }

  processFraudChangeNetworkCall(params) {
    this.SpinnerService.show();
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    this.reportService.updateFraudUserInSuspiciousReport(UrlConstant.updateFraudUserInSuspiciousReportUrl, AppConstants.NO_URL_PARAM, params, this.ipAddress, userName, '' + Date.now())
      .subscribe(resData => {
        this.SpinnerService.hide();
        this.closeFraudConfirmationBox();
        if (resData.result === Responses.SUCCESS) {
          this.showAlertBox('Updated Successfully')
          this.getSuspiciousReportDetails();
        } else if (resData.result === Responses.DB_ERROR) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.DB_ERROR)
        }
      },
        error => {
          this.SpinnerService.hide();
          this.closeFraudConfirmationBox();
          this.closeAlertModal();
          this.showAlertBox("There was an error updating");
        })

  }
  closeFraudConfirmationBox() {
    this.showFraudAlert = false;
    this.userIdTobeProcessed = '';
    this.reason = ''
  }


}

