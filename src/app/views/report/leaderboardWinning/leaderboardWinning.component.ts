import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserService } from '../../../services/UserService';
import { LeaderboardWinningReportDataModel } from '../../../models/reports/leaderboardWinning/LeaderboardWinningReportDataModel';
import { ExcelService } from '../../../services/ExcelService';

@Component({
  templateUrl: 'leaderboardWinning.component.html',
  styleUrls: ['leaderboardWinning.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeaderboardWinningComponent implements OnInit {


  private ipAddress: string = '00.00.00.00';
  private leaderboardId: string = ""
  private dataSource: MatTableDataSource<any>;
  private allData: LeaderboardWinningReportDataModel[];
  private columns: string[] = [ 'userId', 'userName', 'rank', 'score']
 
  private showModal: boolean = false

  //user modal details
  public showUserModal = false

  private userModal: UserModal

  private paginator: MatPaginator;
  private sort: MatSort;
  alert: string = "";
  showAlertModal: boolean = false;
  showDownloadButton:boolean=false;
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
    private spinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private excelService: ExcelService,
    private userService: UserService) { }

  access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.LEADERBOARD_WINNING_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
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

  private title: string = 'LeaderboardWinning Report';
  private  excel = [];
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
          if (from == 'userID')
            this.showUserModal = true
          else if (from == 'link') {
            this.showUserModal = false
          }
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
  }  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }

  getLeaderboardWinning = () => {
    if (this.leaderboardId.trim() != '' || this.leaderboardId != null) {
      this.spinnerService.show();
      let userName: string = JSON.parse(sessionStorage.user).user_name;
      this.allData = [];
      this.reportService.getLeaderboardWinningReport(UrlConstant.getLeaderboardWinningReportUrl, this.leaderboardId, AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          this.allData = []
          if (resData.result === Responses.SUCCESS) {
            this.allData = resData.ranks;
            if (this.allData != null && this.allData.length > 0) {
              resData.ranks.forEach(row => {
                this.excel.push(row);
              });
              this.showDownloadButton = true;
              this.dataSource = new MatTableDataSource(this.allData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;

            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
            }

          } else if (resData.result === Responses.DB_ERROR) {
            this.showDownloadButton = false;
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.LEADERBOARD_NOT_FOUND) {
            this.showDownloadButton = false;
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.LEADERBOARD_NOT_FOUND);

          }
          this.dataSource = new MatTableDataSource(this.allData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
          error => {
            this.spinnerService.hide();
            this.showDownloadButton = false;
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
          });
    }
  }





}
