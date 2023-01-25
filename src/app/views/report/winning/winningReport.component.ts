import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { WinningReportSearchParam } from '../../../searchParam/collusion/WinningReportSearchParam';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { AppConstants } from '../../../constant/AppConstants';
import { WinningReportDataModel } from '../../../models/reports/winningReport/WinningReportDataModel';
import { UrlConstant } from '../../../constant/UrlConstant';
import { ReportService } from '../../../services/ReportService';
import { UserService } from '../../../services/UserService';
import { PermissionNames } from '../../../constant/PermissionNames';





@Component({
  templateUrl: 'winningReport.component.html',
  styleUrls: ['winningReport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WinningReportComponent implements OnInit {

  private ipAddress:string = '';
  private title:string = 'Winning Report';
  private excel:any = [];
  private showDownloadButton:boolean = false;
  //general page loading
  
  private dataSource: MatTableDataSource<any>;
  private allData: WinningReportDataModel[];
  private columns: string[] = ['id', 'user_id', 'gameName', 'wallet_name', 'type', 'amount', 'description', 'transaction_time'];
  private userId :string= '';
  private searchParamsForm: any = null;
  private searchParamUserForm: any = null;
  private showModal :boolean= false;
  private result:boolean = false;
  private userID:string = '';
  showUserModal = false;
  findUser: boolean = false;
  private userModal: UserModal;
  private userDetailClickCallback: boolean = false;


  private paginator: MatPaginator;
  private sort: MatSort;
  private userName: string = "";
  private knifeHit: number = 0;
  private bubbleShooter: number = 0;
  private archery: number = 0;
  private runnerNo1: number = 0;
  private streetRacer: number = 0;
  private fantasyCricket: number = 0;
  private rummy: number = 0;
  private fruitSplit: number = 0;
  private candyCrush: number = 0;
  private poker: number = 0;
  private pokerTourney: number = 0;
  private callbreak: number = 0;
  private carrom: number = 0;
  private ludo: number = 0;
  private pool: number = 0;

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
    private reportService: ReportService,
    private excelService: ExcelService,
    private SpinnerService: NgxSpinnerService) {; }

  access_permission_read:boolean = false;
  access_permission_write:boolean = false;

  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.WINNING_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          userId: [''],
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

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }
 

  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  getUserDetail(from: string, userId: string) {
    let userName = JSON.parse(sessionStorage.user).user_name;
    console.log(userId)
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId)

    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
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

    if (this.userDetailClickCallback) {
      this.showUserModal = false;
    }
  }
  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length
    const errorMsg = 'All the fields are mandatory';
    if (paramLength === 3) {
      if (param.userId !== undefined && param.fromTime !== undefined && param.toTime !== undefined) {

        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
          return false
        } else {
          return true
        }

      } else {
        this.showAlertBox(errorMsg);
      }
    } else {
      this.showAlertBox(errorMsg);
    }
  }

  get search() { return this.searchParamsForm.controls; }


  getWinningReport = () => {
    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new WinningReportSearchParam()

    if (this.search.userId.value !== undefined && this.search.userId.value.trim() !== '') {
      param.userId = this.search.userId.value
      params.set('userId', param.userId.trim())
    }
    let fromTime
    let toTime
    if (this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') {
      fromTime = `${this.search.fromTime.value} 00:00:00`;
      param.fromTime = AppConstants.getTimestamp(fromTime).toString();
      params.set('fromTime', param.fromTime);


    }

    if (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '') {
      toTime = `${this.search.toTime.value} 23:59:59`;
      param.toTime = AppConstants.getTimestamp(toTime).toString();
      params.set('toTime', param.toTime)

    }

    this.result = false;
    let isValid = this.validateSearchFilter(param);
    if (isValid) {
      this.SpinnerService.show();
      this.excel = [];
      this.allData = [];
      this.showDownloadButton = false;
      this.reportService.getWinningReport(UrlConstant.getWinningReportUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.SpinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.result = true
            this.userName = resData.userName;
            this.userId = resData.userId;

            this.knifeHit = (resData.knifeCutWinnings != undefined) ? resData.knifeCutWinnings : 0;
            this.bubbleShooter = (resData.bubbleShooterWinnings != undefined) ? resData.bubbleShooterWinnings : 0;
            this.archery = (resData.archeryWinnings != undefined) ? resData.archeryWinnings : 0;
            this.runnerNo1 = (resData.runnerNumber1Winnings != undefined) ? resData.runnerNumber1Winnings : 0;
            this.streetRacer = (resData.streetRacerWinnings != undefined) ? resData.streetRacerWinnings : 0;
            this.fantasyCricket = (resData.fantasyWinnings != undefined) ? resData.fantasyWinnings : 0;
            this.rummy = (resData.rummyWinnings != undefined) ? resData.rummyWinnings : 0;
            this.fruitSplit = (resData.fruitSplitWinnings != undefined) ? resData.fruitSplitWinnings : 0;
            this.candyCrush = (resData.candyCrushWinnings != undefined) ? resData.candyCrushWinnings : 0;
            this.poker = (resData.pokerWinnings != undefined) ? resData.pokerWinnings : 0;
            this.pokerTourney = (resData.pokerTourneyWinnings != undefined) ? resData.pokerTourneyWinnings : 0;
            this.callbreak = (resData.callBreakWinnings != undefined) ? resData.callBreakWinnings : 0;
            this.carrom = (resData.carromWinnings != undefined) ? resData.carromWinnings : 0;
            this.ludo = (resData.ludoWinnings != undefined) ? resData.ludoWinnings : 0
            this.pool = (resData.poolWinnings != undefined) ? resData.poolWinnings : 0


          } else if (resData.result === Responses.DB_ERROR) {
            this.result = false
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.INCORRECT_TIME_INTERVAL) {
            this.result = false
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);

          } else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.result = false
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);

          } else if (resData.result === Responses.INVALID_USER_ID) {
            this.result = false
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_USER_ID);

          } else if (resData.result === ResponsesDescription.NOT_FOUND) {
            this.closeAlertModal();
            this.result = false
            this.showAlertBox(ResponsesDescription.NO_DATA_FOR_THIS_USER);

          }
        },
          error => {
            this.result = false
            this.SpinnerService.hide();
            if (error === 'OK') {
              this.closeAlertModal();
              this.showAlertBox("BAD REQUEST");

            } else if (error === Responses.INCORRECT_TIME_INTERVAL) {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);
            } else if (error === Responses.DB_ERROR) {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.DB_ERROR);
            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.ERROR_FINDING_REPORT);
            }

          });
    }
  }


  closeModal = () => {
    this.showUserModal = false
    this.showModal = false
  }

  findUserModal() {
    this.findUser = true;
  }

  receiveFindUserIDCloseModalMessage($event){

    if( $event!=""){
      this.findUser = false;
      this.userID=$event;
    }else{
      this.findUser = false;
    }
  }


}
