import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { ReportService } from '../../../services/ReportService';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { UrlConstant } from '../../../constant/UrlConstant';

@Component({
  templateUrl: 'snapshotReports.component.html',
  styleUrls: ['snapshotReports.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SnapshotReportsComponent {
  private userName: string = "";
  private ipAddress : string = "00.00.00.00";

  totalRegistration:number=0;
  newDepositors:number=0;
  totalDeposit:number=0;
  totalWithdrawal:number=0;
  totalRake:number=0;
  noData:boolean=true;
  
  private searchParamsForm :any= null
  showModal:boolean = false
  

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private spinnerService: NgxSpinnerService
  ) {

  }
  access_permission_read: boolean = false
  access_permission_write: boolean = false

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.SNAPSHOT_REPORT);
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

  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length
    if (paramLength === 0) {
      return false;
    } else if (paramLength === 1) {
      return false;
    }
    if (paramLength === 2) {
      if (param.fromTime !== '' && param.toTime !== '')
        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
          return false;
        } else {
          return true;
        }
    }
    this.closeAlertModal();
    this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE);
    return false;
  }

  get search() { return this.searchParamsForm.controls; }

  getSnapshotReportDetails = () => {
    var fromTime;
    var toTime;

    if (this.searchParamsForm.get("fromTime").value !== '') {
      fromTime = `${this.searchParamsForm.get("fromTime").value} 00:00:00`;
      this.searchParamsForm.value['fromTime'] = AppConstants.getTimestamp(fromTime).toString();

    } else {
      this.searchParamsForm.value['fromTime'] = '';
      fromTime = '';
    }

    if (this.searchParamsForm.get("toTime").value !== '') {
      toTime = `${this.searchParamsForm.get("toTime").value} 23:59:59`;
      this.searchParamsForm.value['toTime'] = AppConstants.getTimestamp(toTime).toString();
    } else {
      this.searchParamsForm.value['toTime'] = '';
      toTime = '';
    }

    let isValid = this.validateSearchFilter(this.searchParamsForm.value);
    if (isValid) {
      this.spinnerService.show();
      let userName = JSON.parse(sessionStorage.user).user_name;
      this.reportService.getSnapshotReport(UrlConstant.getSnapshotReportUrl, AppConstants.NO_URL_PARAM,this.searchParamsForm.value, this.ipAddress, userName, '' + Date.now())
       .subscribe(resData => {
          this.spinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.noData = false;
            this.totalRegistration = resData.totalRegistration;
            this.newDepositors = resData.newDepositors;
            this.totalDeposit = resData.totalDeposit;
            this.totalWithdrawal = resData.totalWithdrawal;
            this.totalRake = resData.totalRake;
          } else if (resData.result === Responses.DB_ERROR) {
            this.noData = true;
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.noData = true;
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);
          }

        },
          error => {
            this.noData = true;
            this.spinnerService.hide();
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
          })
    } else {
      this.noData = true;
      this.closeAlertModal();
      this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE);
    }
  }

  onBtnClick = (row) => {
    this.showModal = true;
  }

}

