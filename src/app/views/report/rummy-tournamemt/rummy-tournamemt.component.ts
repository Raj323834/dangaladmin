import { Component,OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from '../../../constant/AppConstants';
import { Responses } from '../../../constant/Responses';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserModal } from '../../../models/user/UserModal';
import { HelperService } from '../../../services/HelperService';
import { ReportService } from '../../../services/ReportService';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { PermissionNames } from '../../../constant/PermissionNames';
import { RummyTournamentStatsReportsDataModel } from '../../../models/reports/rummyTournamentStatsReportsDataModel/rummytournamentstatsreportsdatamodel.model';
import { ExcelService } from '../../../services/ExcelService';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../services/UserService';


@Component({
  selector: 'app-rummy-tournamemt',
  templateUrl: './rummy-tournamemt.component.html',
  styleUrls: ['./rummy-tournamemt.component.scss']
})
export class RummyTournamemtComponent implements OnInit {

  private userName: string = "";
  private ipAddress: string = '00.00.00.00';

  //general page loading
  dataSource: MatTableDataSource<any>;
  allData: RummyTournamentStatsReportsDataModel[];
  columns: string[] = [
    'userId',
    'userName',
    'tournamentId',
    'tournamentName',
    'maxRegistrations',
    'numberOfLevels',
    'entryFee',
    'entryFeeType',
    'totalPrizeAmount',
    'totalRegistrations',
    'tournamentDate',
    'eventName',
    'rebuyAmount',
    'rakeAmount',
    'wonAmount',
    'wageredAmount',
    'isStaticTournament',
    'isPlayed',

   ];

  private excel: any = [];
  private showDownloadButton: boolean = false;
  private sort: MatSort;
  private paginator: MatPaginator;


  winAmount: number = 0;
  bountyWinAmount: number = 0;
  rank: number = 0;
  buyIn: number = 0;
  toentryFeetalRake: number = 0;
  roundsPlayed: number = 0;
  rebuyInAmount: number = 0;
  rebuyEntryFee: number = 0;
  addonAmount: number = 0;
  addonEntryFee: number = 0;
  toenbountyAmounttryFeetalRake: number = 0;
  bountyEntryFee: number = 0;
  totalEntryFees: number = 0;
  totalRake: number = 0;
  rebuyCount: number = 0;
  addOnCount: number = 0;
  gameType: number = 0;
  totalPlayers: number = 0;
  tournamentId: number = 0;
  totalRounds: number = 0;
  isCash: boolean = false;
  playerName: string = "qwerty";
  userId: string = "qwerty";
  referenceNumber: string = "qwerty";
  playerAvatar: string = "qwerty";
  startTime: string = "qwerty";
  endTime: string = "qwerty";
  mode: string = "qwerty";
  gameId: string = "qwerty";
  timeStamp: string = "qwerty";
  name: string = "qwerty";

  private searchParamsForm: any = null
  showModal: boolean = false;
  noData: boolean = true;
  data:any;

  public showUserModal: boolean = false;
  private searchParamUserForm: any = null;
  private userID: string = "";//ngModel
  public alert: string = "";
  public showAlertModal: boolean = false;
  private userModal: UserModal;
  private message:boolean=false;
  private title: string = 'Rummy Tournament Report';
  access_permission_read: boolean = false;
  findUser: boolean = false;
  access_permission_write: boolean = false


  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private spinnerService: NgxSpinnerService,
    private excelService:ExcelService,
    private userService: UserService,
  ) {

  }

  ngOnInit() {
    

    const accessPermission = HelperService.getModulePermissions(PermissionNames.RUMMY_TOURNAMENT_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });

      this.searchParamsForm = this.formBuilder.group(
        {
          userId: '',
          fromTime: ['',Validators.required],
          toTime: ['',Validators.required]
        });
        this.searchParamUserForm = this.formBuilder.group(
          {
            search_type: '',
            value: ''
          });
    }
  

  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true;
  }
  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = "";
  }

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


  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length;
    if (paramLength === 0) {
      return false;
    } else if (paramLength === 1) {
      return false;
    }
    if (paramLength === 2) {
      if(param.userId!==''){
        this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE);
          return false;
      }
      if (param.fromTime !== '' && param.toTime !== '') {
        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);
          return false;
        } else {
          return true;
        }
      }else return false;
    }else if(paramLength === 3){
      if (param.fromTime !== '' && param.toTime !== '') {
        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);
          return false;
        } else {
          return true;
        }
      }else return false;
    }

    this.closeAlertModal();
    this.showAlertBox(ResponsesDescription.ENTER_ALL_FIELDS);
    return false;
  }

  get search() { return this.searchParamsForm.controls; }

  getUserDetail(from: string, userId: string) {
    let storageUserData = JSON.parse(sessionStorage.user);
    let userName: string = storageUserData.user_name;
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
        } else if (userData.result == Responses.USER_NOT_FOUND) {
          this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
        } else {
          this.showAlertBox(ResponsesDescription.ERROR_FINDING_DETAILS);
        }
      },
        error => {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.ERROR_FINDING_DETAILS);
        });
  }

  receiveCloseModalMessage($event) {
    this.message = $event;
    if (this.message) {
      this.showUserModal = false;
    }
  }

 exportAsXLSX(){
  this.excelService.exportAsExcelFile(this.excel, this.title);
}
 
 getTournamentReportDetails = () => {

    let fromTime;
    let toTime;
   
    if (this.searchParamsForm.get("fromTime").value !== '') {
      fromTime = `${this.searchParamsForm.get("fromTime").value} 00:00:00`
      this.searchParamsForm.value['fromTime'] = AppConstants.getTimestamp(fromTime).toString()
    } else {
      this.searchParamsForm.value['fromTime'] = ''
      fromTime = ''
    }

    if (this.searchParamsForm.get("toTime").value !== '') {
      toTime = `${this.searchParamsForm.get("toTime").value} 23:59:59`
      this.searchParamsForm.value['toTime'] = AppConstants.getTimestamp(toTime).toString()
    } else {
      this.searchParamsForm.value['toTime'] = ''
      toTime = ''
    }

    let isValid = this.validateSearchFilter(this.searchParamsForm.value)
    if (isValid) {
      let userName: string = JSON.parse(sessionStorage.user).user_name;
      this.spinnerService.show();
      this.reportService.getRummyTournamentStatsReport(UrlConstant.getRummyTournamentReportUrl, AppConstants.NO_URL_PARAM, this.searchParamsForm.value, this.ipAddress, userName, '' + Date.now())
      .subscribe(resData => {
        this.excel = [];
        this.allData = [];
        this.spinnerService.hide();
        if (resData.result === Responses.SUCCESS) {
          if (resData.report != null) {
            if (resData.report.length != 0) {
              this.showDownloadButton=true;
              this.allData = resData.report;
              this.allData.forEach(row => {
                this.excel.push(row);
              });

            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
            }
          } else {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
          }
        } else if (resData.result === Responses.INVALID_DATE_RANGE) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);
        }else if (resData.result === Responses.DB_ERROR) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.DB_ERROR)
        } else if (resData.result === Responses.NOT_FOUND) {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
        }
          this.dataSource = new MatTableDataSource(this.allData);
          this.dataSource.sort = this.sort;

        
      },
        error => {
          this.spinnerService.hide();
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
        })
  } else {
    this.closeAlertModal();
    this.showAlertBox(" Enter valid combination :  \n 1) UserId with From date and To date. \n 2) From date and To date.  ");
  }

}

closeModal = () => {
  this.showUserModal = false;
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
