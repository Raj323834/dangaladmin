import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { CallbreakGameLogsSearchParam } from '../../../searchParam/reports/callBreak/CallbreakGameLogsSearchParam';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { callBreakLogs } from '../../../models/reports/callBreak/callBreakLogs';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserService } from '../../../services/UserService';

@Component({
  selector: 'app-callbreaklog',
  templateUrl: './callbreaklog.component.html',
  styleUrls: ['./callbreaklog.component.scss']
})
export class CallbreaklogComponent implements OnInit {

  private searchParamUserForm: any = null;
  public findUser: boolean = false;
  private downloadUrl: string = "";
  private showDownloadFromUrlButton: boolean = false
  private ipAddress: string = '';
  private userID: string = ""
  private title: string = 'Callbreak Game Logs';
  private excel: any = [];
  private showDownloadButton: boolean = false;
  private nodata: boolean = true
  private dataSource: MatTableDataSource<any>;
  public allData: callBreakLogs[];
  public playedCardsData : any[] = [];
  public intialCardsData: any[] = [];

  private columns: string[] = ['playerId','username','name', 'tableId', 'gameId', 'roundId','timestamp','action','currentCards']
  private searchParamsForm:any = null
  public showModal:boolean = false;
  public showModalRound:boolean = false;
  private winners : [] ;
  public winnersData: any[] = [];


  //user modal details
  public showUserModal = false

  private userModal: UserModal

  private paginator: MatPaginator;
  private sort: MatSort;
  alert:string = "";
  showAlertModal:boolean = false;

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
    private reportService:ReportService,
    private userService:UserService) {}

  access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.CALL_BREAK_GAME_STATS);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });

      this.searchParamsForm = this.formBuilder.group(
        {
          gameId: ['',Validators.required],
          playerId: ['',Validators.required],
          fromTime: [''],
          toTime: ['']
        }
      )
      this.searchParamUserForm = this.formBuilder.group(
        {
          search_type: '',
          value: ''
        })
  }

  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }

  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }

  getUserDetail(from: string, userId: string) {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId)

    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl,params.toString(),AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
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

  get search() { return this.searchParamsForm.controls; }

  getCallBreakGameStatsDetails() {
    if ((this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') && (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '')) {
      if (this.search.playerId.value !== undefined && this.search.playerId.value.trim() !== '') {
        this.getCallBreakGameStatsDetailsNetworkCall();
      }
      else if (this.search.gameId.value !== undefined && this.search.gameId.value.trim() !== '') {
        this.getCallBreakGameStatsDetailsNetworkCall();
      }
      else {
        this.showAlertBox("Either enter PlayerId or GameId");
      }
    }
    else {
      this.showAlertBox("Enter Form date and To date");
    }
  }
 

  getCallBreakGameStatsDetailsNetworkCall = () => {
    this.spinnerService.show();
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new CallbreakGameLogsSearchParam();

    if ((AppConstants.getTimestamp(this.search.fromTime.value).toString()) > (AppConstants.getTimestamp(this.search.toTime.value).toString())) {
      this.showAlertBox(" please enter Form Time less than To Time ");
      this.spinnerService.hide();
    }
    else {
      if (this.search.gameId.value !== undefined && this.search.gameId.value.trim() !== '') {
        param.gameId = this.search.gameId.value;
        params.set('gameId', param.gameId.trim())
      }
      if (this.search.playerId.value !== undefined && this.search.playerId.value.trim() !== '') {
        param.playerId = this.search.playerId.value;
        params.set('playerId', param.playerId.trim())
      }
      if (this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') {
        let fromTime = `${this.search.fromTime.value} 00:00:00`;
        param.fromTime = AppConstants.getTimestamp(fromTime).toString();
        params.set('fromTime', param.fromTime);
      }

      if (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '') {
        let toTime = `${this.search.toTime.value} 23:59:59`;
        param.toTime = AppConstants.getTimestamp(toTime).toString();
        params.set('toTime', param.toTime);
      }

      let paramLength = Object.keys(param).length
      const alerMsg = 'Difference between From Date and To Date should be less than 30 days.';
      if (paramLength >= 2) {
        if (param.fromTime !== undefined && param.toTime !== undefined) {
          if (param.fromTime > param.toTime) {
            this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
            return false;
          } else if (AppConstants.getDifferenceInDays(param.fromTime, param.toTime) > 30) {
            this.showAlertBox(alerMsg)
            this.spinnerService.hide();
            return false
          }
          else {
            this.spinnerService.show();
            this.excel = [];
            this.allData = [];
            this.showDownloadFromUrlButton = false;
            this.reportService.getCallBreakLogReport(UrlConstant.getCallBreakGamesLogReportUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
              .subscribe(resData => {
                this.spinnerService.hide();
                if (resData.result === Responses.SUCCESS) {
                  this.allData = resData.gameLogs;
                  if (resData.url != null) {
                    this.downloadUrl = resData.url;
                    this.showDownloadFromUrlButton = true;
                    this.showDownloadButton = false;
                    this.allData = [];
                  } else if (this.allData != null && this.allData.length > 0) {
                    this.allData.forEach(row => {
                      this.excel.push(row);
                    });
                    this.showDownloadFromUrlButton = false;
                    this.showDownloadButton = true;
                  }
                  this.nodata = false;
                  this.dataSource = new MatTableDataSource(this.allData);
                  this.dataSource.sort = this.sort;
                  this.dataSource.paginator = this.paginator;

                } else if (resData.result === Responses.INVALID_REQUEST) {
                  this.showAlertBox(ResponsesDescription.INVALID_REQUEST);
                } else if (resData.result === Responses.INCORRECT_TIME_INTERVAL) {
                  this.closeAlertModal();
                  this.showAlertBox(ResponsesDescription.INCORRECT_TIME_INTERVAL);

                } else if (resData.result === Responses.INVALID_DATE_RANGE) {
                  this.closeAlertModal();
                  this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);

                } else if (resData.result === Responses.INVALID_gameId) {
                  this.closeAlertModal();
                  this.showAlertBox("please enter valid game id");

                } else if (resData.result === Responses.REPORT_UPLOAD_FAILED) {
                  this.closeAlertModal();
                  this.showAlertBox(ResponsesDescription.REPORT_UPLOAD_FAILED);

                }
                else if (resData.result == "INVALID_REQUEST") {
                  this.closeAlertModal();
                  this.showAlertBox("Please enter from date to till date");
                }
              },
                error => {
                  this.spinnerService.hide();
                  if (error === 'OK') {
                    this.closeAlertModal();
                    this.showAlertBox("Bad Request");
                  } else if (error === Responses.INCORRECT_TIME_INTERVAL) {
                    this.closeAlertModal();
                    this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);
                  } else if (error === Responses.DB_ERROR) {
                    this.closeAlertModal();
                    this.showAlertBox(ResponsesDescription.DB_ERROR);
                  } else {
                    this.closeAlertModal();
                    this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
                  }
                });
          }
        }
      }
    }
  }


  findUserModal() {
    this.findUser = true;
  }
  receiveCloseModalMessage($event) {
     
    if ( $event) {
      this.showUserModal = false;
    }
  }
  receiveFindUserIDCloseModalMessage($event){

    if( $event!=""){
      this.findUser = false;
      this.userID=$event;
    }else{
      this.findUser = false;
    }
  }


  closeModal = () => {
    this.showUserModal = false;
    this.findUser = false;
    this.showModal = false;
  }
}
