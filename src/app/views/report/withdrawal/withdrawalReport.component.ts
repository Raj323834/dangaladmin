import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { HelperService } from '../../../services/HelperService';
import { NgxSpinnerService } from 'ngx-spinner';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { ReportService } from '../../../services/ReportService';
import { UserService } from '../../../services/UserService';
import { AppConstants } from '../../../constant/AppConstants';
import { PermissionNames } from '../../../constant/PermissionNames';
import { UrlConstant } from '../../../constant/UrlConstant';
import { WithdrawalReportDataModel } from '../../../models/reports/withdrawalReport/WithdrawalReportDataModel';
import { WithdrawalReportSearchParam } from '../../../searchParam/reports/withdrawal/WithdrawalReportSearchParam';



@Component({
  templateUrl: 'withdrawalReport.component.html',
  styleUrls: ['withdrawalReport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class WithdrawalReportComponent implements OnInit {

  private ipAddress: string = '';
  private title: string = 'WithdrawalReport';
  private excel: any = [];
  private showDownloadButton: boolean = false;

  private dataSource: MatTableDataSource<any>;
  private allData: WithdrawalReportDataModel[];
  private searchParamsForm: any = null;
  private paginator: MatPaginator;
  private sort: MatSort;
  private columns: string[] = [
    'userId', 'userName', 'internalReferenceNumber', 'paymentTransactionAmount', 'tdsAmount', 'toBePaidAmount', 'withdrawalType',
    'nameMismatch', 'isSuspicious', 'transactionStatusDescription', 'fulfilledTime'];

  alert: string = ""
  showAlertModal: boolean = false;
  userModal: UserModal;
  showUserModal: boolean = false;

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
    private excelService: ExcelService,
    private spinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private userService: UserService) { }

  public access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.WITHDRAWAL_REPORT);
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


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
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
      this.closeAlertModal();
      this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE)
      return false
    } else if (paramLength === 1) {
      this.closeAlertModal();
      this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE)
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
  }

  get search() { return this.searchParamsForm.controls; }

  getUserDetail(from: string, userId: string) {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId)

    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(userData => {
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

  receiveCloseModalMessage($event) {
    if ($event) {
      this.showUserModal = false;
    }
  }
  getWithdrawalReportDetails = () => {
    let params: URLSearchParams = new URLSearchParams();
    let param = new WithdrawalReportSearchParam()

    if (this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') {
      let fromTime = `${this.search.fromTime.value} 00:00:00`
      param.fromTime = AppConstants.getTimestamp(fromTime).toString();
      params.set('from_time', param.fromTime);
    }
    if (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '') {
      let toTime = `${this.search.toTime.value} 23:59:59`
      param.toTime = AppConstants.getTimestamp(toTime).toString();
      params.set('to_time', param.toTime);
    }
    let isValid = this.validateSearchFilter(param)
    if (isValid) {
      let userName: string = JSON.parse(sessionStorage.user).user_name;
      this.spinnerService.show();
      this.excel = [];
      this.showDownloadButton = false;
      this.reportService.getWithdrawalReport(UrlConstant.getWithdrawalReportUrl, AppConstants.NO_URL_PARAM, param, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          console.log(resData)
          if (resData.result === Responses.SUCCESS) {
            this.allData = resData.reports;
            if (resData.reports != null) {
              if (resData.reports.length != 0) {
                resData.reports.forEach(row => {
                  this.excel.push(row);
                });
                this.showDownloadButton = true;
              }
              this.dataSource = new MatTableDataSource(this.allData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
            }
          } else if (resData.result === Responses.DB_ERROR) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR)
          }
        },
          error => {
            this.spinnerService.hide();
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
          })
    } else {
      this.closeAlertModal();
      this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE);
    }
  }

  closeModal = () => {
    this.showUserModal = false
  }
}

