import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { ReportService } from '../../../services/ReportService';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserService } from '../../../services/UserService';
import { ByPassReportDataModel } from '../../../models/reports/bypassReport/ByPassReportDataModel';
import { ExcelService } from '../../../services/ExcelService';

@Component({
  templateUrl: 'byPassReports.component.html',
  styleUrls: ['byPassReports.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ByPassReportsComponent {
  private userName: string = "";
  private ipAddress: string = "00.00.00.00";
  showConfirmBox: boolean = false;
  showAddByPass: boolean = false;
  private downloadUrl: string = "";
  private showDownloadButton: boolean = false;
  private title: string = 'Bypass User Details';
  private excel: any = [];

  private dataSource: MatTableDataSource<any>;
  private allData: ByPassReportDataModel[];
  private columns: string[] = ['userId', 'maxAmount', 'maxDailyCount', 'createdDate', 'Actions'];

  showUserModal: boolean = false
  maxAmount: number = 0;
  userId: string = "";
  maxDailyCount: number = 0;
  private requestParameters = {};
  deleteUserId: string = '';
  findUser: boolean = false

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
    private reportService: ReportService,
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private excelService: ExcelService,
  ) { }

  access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.BYPASS_USER_REPORTS);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];

    this.reportService.getIP().subscribe((res: any) => {
      this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
    });

    this.getByPassReportDetails();
    this.dataSource.paginator = this.paginator;

  }

  applyfilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase()
  }

  closeFindUserIDModal = () => {

    this.findUser = false
  }
  findUserModal() {
    this.findUser = true;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }
  private userID: string = '';

  receiveFindUserIDCloseModalMessage($event) {

    if ($event != "") {
      this.findUser = false;
      this.userID = $event;
    } else {
      this.findUser = false;
    }
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


  getUserDetail(from: string, userId: string) {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId)

    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(userData => {
        if (userData.result == Responses.SUCCESS) {
          this.userModal = userData
          this.showUserModal = true;
          this.findUser = true;
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

  getByPassReportDetails = () => {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    this.excel = [];
    this.spinnerService.show();
    this.reportService.getByPassReport(UrlConstant.getByPassReportUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(resData => {
        this.allData = [];
        this.spinnerService.hide();
        if (resData.result === Responses.SUCCESS) {
          if (resData.bypassUsers != null) {
            this.allData = resData.bypassUsers;
            if (this.allData != null && this.allData.length > 0) {
              for (let i = 1; i < this.allData.length; i++) {
                this.excel.push({ userId: this.allData[i].userId, MaxAmount: this.allData[i].maxAmount, maxDailyCount: this.allData[i].maxDailyCount, CreateDate: AppConstants.getDatefromTimestamp(this.allData[i].createdDate) });
              }
              this.showDownloadButton = true;
            }
          } else {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
          }
        } else if (resData.result === Responses.NOT_FOUND) {
          this.closeAlertModal();
          this.showAlertBox("No bypass user exists");
        }
        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
        error => {
          this.spinnerService.hide();
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
        })
  }

  showAddByPassDialog() {
    this.showAddByPass = true;
  }
  closeAddByPassDialog() {
    this.showAddByPass = false;
  }

  addByPassUser() {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    if (this.userId != "" || this.maxAmount != null) {
      this.requestParameters['userId'] = this.userId;
      this.requestParameters['maxAmount'] = this.maxAmount;
      this.requestParameters['maxDailyCount'] = this.maxDailyCount;
      this.reportService.createByPassReport(UrlConstant.createByPassReportUrl, AppConstants.NO_URL_PARAM, this.requestParameters, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          if (resData['result'] == Responses.SUCCESS) {
            this.closeAddByPassDialog();
            this.showAlertBox("Bypass user added successfully.");
            this.getByPassReportDetails();
            this.initializeModelVariables();
          } else if (resData['result'] == Responses.INVALID_REQUEST) {
            this.showAlertBox("Invalid Request");
          } else if (resData['result'] == Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          }
          else if (resData['result'] == Responses.USER_ALREADY_PRESENT) {
            this.showAlertBox(ResponsesDescription.USER_ALREADY_PRESENT)
          }
        },
          error => {
            this.spinnerService.hide();
            this.initializeModelVariables();
            this.showAlertBox(ResponsesDescription.VALID_INPUT_MSG);
          })
    }


  }
  initializeModelVariables() {
    this.userId = '';
    this.maxAmount = 0;
    this.maxDailyCount = 0;
  }

  showConfirmationBox = (userId) => {
    this.showConfirmBox = true;
    this.deleteUserId = userId;
  }
  closeConfirmationBox() {
    this.showConfirmBox = false
  }

  deleteUserIDApiCall(userId) {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    if (userId == "" || userId == undefined) {
      this.showAlertBox("Invalid User ID");
    } else {
      this.reportService.deleteByPassReport(UrlConstant.deleteByPassReportUrl, userId, AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.showConfirmBox = false;
          if (resData.result === Responses.SUCCESS) {
            this.showAlertBox("User id removed from by pass successfully.");
            this.getByPassReportDetails();
          } else if (resData.result === Responses.NOT_FOUND) {
            this.showAlertBox(ResponsesDescription.NOT_FOUND);
          } else if (resData.result === Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          }
        });
    }
  }
}

