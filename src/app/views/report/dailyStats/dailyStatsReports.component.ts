import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { DailyStatsReportDataModel } from '../../../models/reports/dailyStats/DailyStatsReportDataModel';
import { ReportService } from '../../../services/ReportService';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserService } from '../../../services/UserService';



@Component({
  templateUrl: 'dailyStatsReports.component.html',
  styleUrls: ['dailyStatsReports.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DailyStatsReportsComponent {
  private userName: string = "";
  private ipAddress : string = "";
  private title: string = 'DailyStatsReport';
  private  excel = [];
  private showDownloadButton: boolean = false;


  private dataSource: MatTableDataSource<any>;
  private  allData: DailyStatsReportDataModel[];
  private columns: string[] = ['userId', 'username', 'gameName', 'totalGamesPlayed', 'totalRake', 'date'];

  showUserModal:boolean= false

  private modalUserData = UserModal;



  private searchParamsForm :any= null
  showModal:boolean = false
  private modalData;
  private paginator: MatPaginator;
  private sort: MatSort;

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
    private reportService: ReportService,
    private excelService: ExcelService,
    private userService: UserService,
    private SpinnerService: NgxSpinnerService
  ) {

  }
  access_permission_read: boolean = false
  access_permission_write: boolean = false

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.DAILY_STATS_REPORT);
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

  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  getDailyStatsReportDetails = () => {

    let userName = JSON.parse(sessionStorage.user).user_name;
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
      this.SpinnerService.show();
      this.excel = [];
      this.showDownloadButton = false;
      this.reportService.getDailyStatsReport(UrlConstant.getDailyStatsReportUrl, AppConstants.NO_URL_PARAM,this.searchParamsForm.value, this.ipAddress, userName, '' + Date.now())
       .subscribe(resData => {
          this.SpinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.allData = resData.dailyStats;
            if (resData.dailyStats != null) {
              if (resData.dailyStats.length != 0) {
                resData.dailyStats.forEach(row => {
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
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          }

        },
          error => {
            this.SpinnerService.hide();
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
          })
    } else {
      this.closeAlertModal();
      this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE);
    }


  }

  closeModal = () => {
    this.showUserModal = false;
    this.showModal = false;
  }


  onBtnClick = (row) => {
    this.showModal = true;
    this.modalData = row;

  }

}

