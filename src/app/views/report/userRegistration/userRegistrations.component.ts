import { Component, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';


@Component({
  templateUrl: 'userRegistrations.component.html',
  styleUrls: ['userRegistrations.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class UserRegistrationsComponent implements OnInit {
  private title = 'User Registrations';

  private ipAddress: string = '';
  private showDownloadButton = false;
  private downloadUrl: string = "";

  private dataSource: MatTableDataSource<any>;

  private searchParamsForm = null

  private showUserModal = false;
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
    private reportService: ReportService,
    private spinnerService: NgxSpinnerService
  ) {

  }

  access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.USER_REGISTRATIONS);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          fromTime: ['',Validators.required],
          toTime: ['',Validators.required]
        });
    }


  alert = "";
  showAlertModal = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }


  receiveCloseModalMessage($event) {

    if ($event) {
      this.showUserModal = false;
    }
  }
  validateSearchFilter = (param) => {
    console.log("param.fromTime  :  " + param.fromTime);
    let paramLength = Object.keys(param).length;
    if (paramLength === 0) {

      return false
    } else if (paramLength === 1) {
      this.closeAlertModal();
      this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE);

      return false
    } else if (paramLength === 2) {
      if ((param.fromTime !== '' && param.toTime !== '')) {
        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
          return false
        } else {
          if (param.fromTime < 1628533800000) {
            this.showAlertBox("Select date after 10 Aug'2021.")
            return false;
          } else {
            return true
          }
        }
      }
    }
  }


  get search() { return this.searchParamsForm.controls; }

  getUserRegistrationDetails = () => {
    let userName = JSON.parse(sessionStorage.user).user_name;
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
      this.spinnerService.show();

      this.showDownloadButton = false;

      this.reportService.getUserRegistrationReport(UrlConstant.getUserRegistrationReportUrl, AppConstants.NO_URL_PARAM, this.searchParamsForm.value, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          console.log(resData)
          if (resData.result === Responses.SUCCESS) {
            this.closeAlertModal();
            this.downloadUrl = resData.url;
            this.showDownloadButton = true
          } else if (resData.result === Responses.DB_ERROR) {
            this.showDownloadButton = false
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR)
          } else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.showDownloadButton = false
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE)
          } else if (resData.result === Responses.REPORT_UPLOAD_FAILED) {
            this.showDownloadButton = false
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.REPORT_UPLOAD_FAILED)
          }

        },
          error => {
            this.spinnerService.hide();
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
          })
    }
  }
}

