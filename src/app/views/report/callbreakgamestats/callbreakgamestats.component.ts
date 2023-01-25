import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { GameStatsSearchParam } from '../../../searchParam/reports/callBreak/GameStatsSearchParam';
import { getRoundDetailsSearchParam } from '../../../searchParam/reports/callBreak/getRoundDetailsSearchParam';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { Cardunicharacter } from '../../../constant/Cardunicharacter';
import { callBreak } from '../../../models/reports/callBreak/callBreak';
import { roundDetails } from '../../../models/reports/callBreak/roundDetails';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserService } from '../../../services/UserService';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-callbreakgamestats',
  templateUrl: './callbreakgamestats.component.html',
  styleUrls: ['./callbreakgamestats.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class CallbreakgamestatsComponent implements OnInit {

  private searchParamUserForm: any = null;
  public findUser: boolean = false;
  private downloadUrl: string = "";
  private showDownloadFromUrlButton: boolean = false
  private ipAddress: string = '';
  private userID: string = ""
  private title: string = 'Call Break Game Stats';
  private excel: any = [];
  private showDownloadButton: boolean = false;
  private nodata: boolean = true
  private dataSource: MatTableDataSource<any>;
  public allData: callBreak[];
  public gameRound: roundDetails[];

  public playedCardsData : any[] = [];
  public intialCardsData: any[] = [];

  private columns: string[] = ['tableId', 'gameId', 'entryFee', 'rake', 'status','startTime', 'endTime','noOfRounds','round1','round2','round3','round4']
  private searchParamsForm:any = null
  public showModal:boolean = false;
  public showModalRound:boolean = false;
  private winners : [] ;
  public winnersData: any[] = [];
  public playedCard1:string = "";
  public playedCard2:string = "";
  public playedCard3:string = "";
  public playedCard4:string = "";
  public playedCard5:string = "";
  public playedCard6:string = "";
  public playedCard7:string = "";
  public playedCard8:string = "";
  public playedCard9:string = "";
  public playedCard10:string = "";
  public playedCard11:string = "";
  public playedCard12:string = "";
  public playedCard13:string = "";
  public playedCard14:string = "";
  public playedCard15:string = "";
  public playedCard16:string = "";
  public playedCard17:string = "";
  public playedCard18:string = "";
  public playedCard19:string = "";
  public playedCard20:string = "";
  public playedCard21:string = "";
  public playedCard22:string = "";
  public playedCard23:string = "";
  public playedCard24:string = "";
  public playedCard25:string = "";
  public playedCard26:string = "";
  public playedCard27:string = "";
  public playedCard28:string = "";
  public playedCard29:string = "";
  public playedCard30:string = "";
  public playedCard31:string = "";
  public playedCard32:string = "";
  public playedCard33:string = "";
  public playedCard34:string = "";
  public playedCard35:string = "";
  public playedCard36:string = "";
  public playedCard37:string = "";
  public playedCard38:string = "";
  public playedCard39:string = "";
  public playedCard40:string = "";
  public playedCard41:string = "";
  public playedCard42:string = "";
  public playedCard43:string = "";
  public playedCard44:string = "";
  public playedCard45:string = "";
  public playedCard46:string = "";
  public playedCard47:string = "";
  public playedCard48:string = "";
  public playedCard49:string = "";
  public playedCard50:string = "";
  public playedCard51:string = "";
  public playedCard52:string = "";


   public currentHand1:string = "";
   public currentHand2:string = "";
   public currentHand3:string = "";
   public currentHand4:string = "";
   public currentHand5:string = "";
   public currentHand6:string = "";
   public currentHand7:string = "";
   public currentHand8:string = "";
   public currentHand9:string = "";
   public currentHand10:string = "";
   public currentHand11:string = "";
   public currentHand12:string = "";
   public currentHand13:string = "";
   public currentHand14:string = "";
   public currentHand15:string = "";
   public currentHand16:string = "";
   public currentHand17:string = "";
   public currentHand18:string = "";
   public currentHand19:string = "";
   public currentHand20:string = "";
   public currentHand21:string = "";
   public currentHand22:string = "";
   public currentHand23:string = "";
   public currentHand24:string = "";
   public currentHand25:string = "";
   public currentHand26:string = "";
   public currentHand27:string = "";
   public currentHand28:string = "";
   public currentHand29:string = "";
   public currentHand30:string = "";
   public currentHand31:string = "";
   public currentHand32:string = "";
   public currentHand33:string = "";
   public currentHand34:string = "";
   public currentHand35:string = "";
   public currentHand36:string = "";
   public currentHand37:string = "";
   public currentHand38:string = "";
   public currentHand39:string = "";
   public currentHand40:string = "";
   public currentHand41:string = "";
   public currentHand42:string = "";
   public currentHand43:string = "";
   public currentHand44:string = "";
   public currentHand45:string = "";
   public currentHand46:string = "";
   public currentHand47:string = "";
   public currentHand48:string = "";
   public currentHand49:string = "";
   public currentHand50:string = "";
   public currentHand51:string = "";
   public currentHand52:string = "";
   public intialCards1:string = "";
   public intialCards2:string = "";
   public intialCards3:string = "";
   public intialCards4:string = "";
   public  showplayedcard:boolean = false;
 



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

      /*test*/
      this.searchParamsForm = this.formBuilder.group(
        {
          tableId:[''],
          gameId: [''],
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
    this.resetall();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }

  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  currentDate = new Date();

  Showplayerdatails(){this.showplayedcard = true;}

unicharacter(){
this.playedCardsData;
this.playedCard1 = Cardunicharacter.cardcode(this.playedCardsData[0].playedCard);
this.playedCard2 = Cardunicharacter.cardcode(this.playedCardsData[1].playedCard);
this.playedCard3 = Cardunicharacter.cardcode(this.playedCardsData[2].playedCard);
this.playedCard4 = Cardunicharacter.cardcode(this.playedCardsData[3].playedCard);
this.playedCard5 = Cardunicharacter.cardcode(this.playedCardsData[4].playedCard);
this.playedCard6 = Cardunicharacter.cardcode(this.playedCardsData[5].playedCard);
this.playedCard7 = Cardunicharacter.cardcode(this.playedCardsData[6].playedCard);
this.playedCard8 = Cardunicharacter.cardcode(this.playedCardsData[7].playedCard);
this.playedCard9 = Cardunicharacter.cardcode(this.playedCardsData[8].playedCard);
this.playedCard10 = Cardunicharacter.cardcode(this.playedCardsData[9].playedCard);
this.playedCard11 = Cardunicharacter.cardcode(this.playedCardsData[10].playedCard);
this.playedCard12 = Cardunicharacter.cardcode(this.playedCardsData[11].playedCard);
this.playedCard13 = Cardunicharacter.cardcode(this.playedCardsData[12].playedCard);
this.playedCard14 = Cardunicharacter.cardcode(this.playedCardsData[13].playedCard);
this.playedCard15 = Cardunicharacter.cardcode(this.playedCardsData[14].playedCard);
this.playedCard16 = Cardunicharacter.cardcode(this.playedCardsData[15].playedCard);
this.playedCard17 = Cardunicharacter.cardcode(this.playedCardsData[16].playedCard);
this.playedCard18 = Cardunicharacter.cardcode(this.playedCardsData[17].playedCard);
this.playedCard19 = Cardunicharacter.cardcode(this.playedCardsData[18].playedCard);
this.playedCard20 = Cardunicharacter.cardcode(this.playedCardsData[19].playedCard);
this.playedCard21 = Cardunicharacter.cardcode(this.playedCardsData[20].playedCard);
this.playedCard22 = Cardunicharacter.cardcode(this.playedCardsData[21].playedCard);
this.playedCard23 = Cardunicharacter.cardcode(this.playedCardsData[22].playedCard);
this.playedCard24 = Cardunicharacter.cardcode(this.playedCardsData[23].playedCard);
this.playedCard25 = Cardunicharacter.cardcode(this.playedCardsData[24].playedCard);
this.playedCard26 = Cardunicharacter.cardcode(this.playedCardsData[25].playedCard);
this.playedCard27 = Cardunicharacter.cardcode(this.playedCardsData[26].playedCard);
this.playedCard28 = Cardunicharacter.cardcode(this.playedCardsData[27].playedCard);
this.playedCard29 = Cardunicharacter.cardcode(this.playedCardsData[28].playedCard);
this.playedCard30 = Cardunicharacter.cardcode(this.playedCardsData[29].playedCard);
this.playedCard31 = Cardunicharacter.cardcode(this.playedCardsData[30].playedCard);
this.playedCard32 = Cardunicharacter.cardcode(this.playedCardsData[31].playedCard);
this.playedCard33 = Cardunicharacter.cardcode(this.playedCardsData[32].playedCard);
this.playedCard34 = Cardunicharacter.cardcode(this.playedCardsData[33].playedCard);
this.playedCard35 = Cardunicharacter.cardcode(this.playedCardsData[34].playedCard);
this.playedCard36 = Cardunicharacter.cardcode(this.playedCardsData[35].playedCard);
this.playedCard37 = Cardunicharacter.cardcode(this.playedCardsData[36].playedCard);
this.playedCard38 = Cardunicharacter.cardcode(this.playedCardsData[37].playedCard);
this.playedCard39 = Cardunicharacter.cardcode(this.playedCardsData[38].playedCard);
this.playedCard40 = Cardunicharacter.cardcode(this.playedCardsData[39].playedCard);
this.playedCard41 = Cardunicharacter.cardcode(this.playedCardsData[40].playedCard);
this.playedCard42 = Cardunicharacter.cardcode(this.playedCardsData[41].playedCard);
this.playedCard43 = Cardunicharacter.cardcode(this.playedCardsData[42].playedCard);
this.playedCard44 = Cardunicharacter.cardcode(this.playedCardsData[43].playedCard);
this.playedCard45 = Cardunicharacter.cardcode(this.playedCardsData[44].playedCard);
this.playedCard46 = Cardunicharacter.cardcode(this.playedCardsData[45].playedCard);
this.playedCard47 = Cardunicharacter.cardcode(this.playedCardsData[46].playedCard);
this.playedCard48 = Cardunicharacter.cardcode(this.playedCardsData[47].playedCard);
this.playedCard49 = Cardunicharacter.cardcode(this.playedCardsData[48].playedCard);
this.playedCard50 = Cardunicharacter.cardcode(this.playedCardsData[49].playedCard);
this.playedCard51 = Cardunicharacter.cardcode(this.playedCardsData[50].playedCard);
this.playedCard52 = Cardunicharacter.cardcode(this.playedCardsData[51].playedCard);
  }



currentcardunicheracter(){
this.playedCardsData;
this.currentHand1 = Cardunicharacter.cardcodeArray(this.playedCardsData[0].currentHand);
this.currentHand2 = Cardunicharacter.cardcodeArray(this.playedCardsData[1].currentHand);
this.currentHand3 = Cardunicharacter.cardcodeArray(this.playedCardsData[2].currentHand);
this.currentHand4 = Cardunicharacter.cardcodeArray(this.playedCardsData[3].currentHand);
this.currentHand5 = Cardunicharacter.cardcodeArray(this.playedCardsData[4].currentHand);
this.currentHand6 = Cardunicharacter.cardcodeArray(this.playedCardsData[5].currentHand);
this.currentHand7 = Cardunicharacter.cardcodeArray(this.playedCardsData[6].currentHand);
this.currentHand8 = Cardunicharacter.cardcodeArray(this.playedCardsData[7].currentHand);
this.currentHand9 = Cardunicharacter.cardcodeArray(this.playedCardsData[8].currentHand);
this.currentHand10 = Cardunicharacter.cardcodeArray(this.playedCardsData[9].currentHand);
this.currentHand11 = Cardunicharacter.cardcodeArray(this.playedCardsData[10].currentHand);
this.currentHand12 = Cardunicharacter.cardcodeArray(this.playedCardsData[11].currentHand);
this.currentHand13 = Cardunicharacter.cardcodeArray(this.playedCardsData[12].currentHand);
this.currentHand14 = Cardunicharacter.cardcodeArray(this.playedCardsData[13].currentHand);
this.currentHand15 = Cardunicharacter.cardcodeArray(this.playedCardsData[14].currentHand);
this.currentHand16 = Cardunicharacter.cardcodeArray(this.playedCardsData[15].currentHand);
this.currentHand17= Cardunicharacter.cardcodeArray(this.playedCardsData[16].currentHand);
this.currentHand18= Cardunicharacter.cardcodeArray(this.playedCardsData[17].currentHand);
this.currentHand19= Cardunicharacter.cardcodeArray(this.playedCardsData[18].currentHand);
this.currentHand20= Cardunicharacter.cardcodeArray(this.playedCardsData[19].currentHand);
this.currentHand21 = Cardunicharacter.cardcodeArray(this.playedCardsData[20].currentHand);
this.currentHand22 = Cardunicharacter.cardcodeArray(this.playedCardsData[21].currentHand);
this.currentHand23= Cardunicharacter.cardcodeArray(this.playedCardsData[22].currentHand);
this.currentHand24= Cardunicharacter.cardcodeArray(this.playedCardsData[23].currentHand);
this.currentHand25= Cardunicharacter.cardcodeArray(this.playedCardsData[24].currentHand);
this.currentHand26= Cardunicharacter.cardcodeArray(this.playedCardsData[25].currentHand);
this.currentHand27= Cardunicharacter.cardcodeArray(this.playedCardsData[26].currentHand);
this.currentHand28= Cardunicharacter.cardcodeArray(this.playedCardsData[27].currentHand);
this.currentHand29= Cardunicharacter.cardcodeArray(this.playedCardsData[28].currentHand);
this.currentHand30= Cardunicharacter.cardcodeArray(this.playedCardsData[29].currentHand);
this.currentHand31= Cardunicharacter.cardcodeArray(this.playedCardsData[30].currentHand);
this.currentHand32= Cardunicharacter.cardcodeArray(this.playedCardsData[31].currentHand);
this.currentHand33= Cardunicharacter.cardcodeArray(this.playedCardsData[32].currentHand);
this.currentHand34= Cardunicharacter.cardcodeArray(this.playedCardsData[33].currentHand);
this.currentHand35= Cardunicharacter.cardcodeArray(this.playedCardsData[34].currentHand);
this.currentHand36= Cardunicharacter.cardcodeArray(this.playedCardsData[35].currentHand);
this.currentHand37= Cardunicharacter.cardcodeArray(this.playedCardsData[36].currentHand);
this.currentHand38= Cardunicharacter.cardcodeArray(this.playedCardsData[37].currentHand);
this.currentHand39= Cardunicharacter.cardcodeArray(this.playedCardsData[38].currentHand);
this.currentHand40= Cardunicharacter.cardcodeArray(this.playedCardsData[39].currentHand);
this.currentHand41 = Cardunicharacter.cardcodeArray(this.playedCardsData[40].currentHand);
this.currentHand42= Cardunicharacter.cardcodeArray(this.playedCardsData[41].currentHand);
this.currentHand43= Cardunicharacter.cardcodeArray(this.playedCardsData[42].currentHand);
this.currentHand44= Cardunicharacter.cardcodeArray(this.playedCardsData[43].currentHand);
this.currentHand45= Cardunicharacter.cardcodeArray(this.playedCardsData[44].currentHand);
this.currentHand46= Cardunicharacter.cardcodeArray(this.playedCardsData[45].currentHand);
this.currentHand47= Cardunicharacter.cardcodeArray(this.playedCardsData[46].currentHand);
this.currentHand48= Cardunicharacter.cardcodeArray(this.playedCardsData[47].currentHand);
this.currentHand49= Cardunicharacter.cardcodeArray(this.playedCardsData[48].currentHand);
this.currentHand50= Cardunicharacter.cardcodeArray(this.playedCardsData[49].currentHand);
this.currentHand51= Cardunicharacter.cardcodeArray(this.playedCardsData[50].currentHand);
this.currentHand52= Cardunicharacter.cardcodeArray(this.playedCardsData[51].currentHand);
  }

  intialcardkeytounicharacter(){
    this.intialCardsData;

    this.intialCards1 = Cardunicharacter.cardcodeArray(this.intialCardsData[0].cards);
    this.intialCards2 = Cardunicharacter.cardcodeArray(this.intialCardsData[1].cards);
    this.intialCards3 = Cardunicharacter.cardcodeArray(this.intialCardsData[2].cards);
    this.intialCards4 = Cardunicharacter.cardcodeArray(this.intialCardsData[3].cards);
    console.log(this.intialCardsData[0].cards.sort())
  }

getRoundDetail(gameStats,roundno1) {
console.log(gameStats)
this.allData = gameStats;
let gameStartTime = gameStats.startTime;
let gameEndTime = gameStats.endTime;
let gameIdround = gameStats.gameId
let gameround = gameStats.noOfRounds
this.spinnerService.show();
let userName: string = JSON.parse(sessionStorage.user).user_name;
let params: URLSearchParams = new URLSearchParams();
let param = new getRoundDetailsSearchParam();


  param.gameId = gameIdround
  params.set('gameId', param.gameId.trim())

if (roundno1 !== undefined && roundno1.trim() !== '') {
  param.roundId = roundno1;
  params.set('roundId', param.roundId.trim())
}

  param.fromTime = AppConstants.getTimestamp(gameStartTime).toString();
  params.set('gameStartTime', param.fromTime);

  param.toTime = AppConstants.getTimestamp((gameStartTime)).toString();
  params.set('gameEndTime', param.toTime);



let isValid = this.validateSearchFilter(param);
if (isValid) {
  this.spinnerService.show();
  this.reportService.getCallBreakRoundStatsReport(UrlConstant.getCallBreakRoundStatsReportUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
    .subscribe(resData => {
      this.spinnerService.hide();
      if (resData.result === Responses.SUCCESS) {
        this.intialCardsData = resData.roundDetails.initalCardsDetails;
        this.playedCardsData = resData.roundDetails.playedCards;
        if( this.intialCardsData.length>0){
          this.showModalRound = true;
        }
        else{
          this.showAlertBox("Invalid Round Id")
        }
        
     this.intialcardkeytounicharacter();
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

      }  else if (resData.result === Responses.REPORT_UPLOAD_FAILED) {
        this.closeAlertModal();
        this.showAlertBox(ResponsesDescription.REPORT_UPLOAD_FAILED);

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

  receiveCloseModalMessage($event) {
    if ( $event) {
      this.showUserModal = false;
    }
  }

  validateSearchFilter = (param) => {return true;}

  closeviewGameDetails = () => {
    this.resetall();
    this.showModal = false;
  }

  closeRoundGameDetails = () => {
    this.showModalRound = false;
    this.resetall();
    this.showplayedcard = false;
  }


  viewGameDetails = (gameStats) => {
   this.allData = gameStats;
    this.winnersData = gameStats.winners;
    this.showModal = true;
  }


  get search() { return this.searchParamsForm.controls; }

  getCallBreakGameStatsDetails = () => {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new GameStatsSearchParam();

    if((AppConstants.getTimestamp(this.search.fromTime.value).toString())>(AppConstants.getTimestamp(this.search.toTime.value).toString())){
      this.showAlertBox(" please enter Form Time less than To Time ");
      this.spinnerService.hide();
    }
else{
    if (this.search.gameId.value !== undefined && this.search.gameId.value.trim() !== '') {
      param.gameId = this.search.gameId.value;
      params.set('gameId', param.gameId.trim())
    }
    if (this.search.playerId.value !== undefined && this.search.playerId.value.trim() !== '') {
      param.playerId = this.search.playerId.value;
      params.set('playerId', param.playerId.trim())
    }
    if (this.search.tableId.value !== undefined && this.search.tableId.value.trim() !== '') {
      param.tableId = this.search.tableId.value;
      params.set('tableId', param.tableId.trim())
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
   
    let isValid = this.validateSearchFilter(param);
    if (isValid) {
      this.spinnerService.show();
      this.excel = [];
      this.allData = [];

      this.showDownloadFromUrlButton = false;
      
      this.reportService.getCallBreakGameStatsReport(UrlConstant.getCallBreakGameStatsReportUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
      if (resData.result === Responses.SUCCESS) {
            this.allData = resData.gameStats;
            if (resData.gameStats != null) {
              if (resData.gameStats.length != 0) {
                resData.gameStats.forEach(row => {
                  this.excel.push(row);
                });
                this.showDownloadButton = true;
                this.downloadUrl = resData.url;
              }

              this.dataSource = new MatTableDataSource(this.allData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
            }
          }
          
          else if (resData.result === Responses.INVALID_REQUEST) {
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

          }  else if (resData.result === Responses.REPORT_UPLOAD_FAILED) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.REPORT_UPLOAD_FAILED);

          }
          else if (resData.result == "INVALID_REQUEST") {
            this.closeAlertModal();
            this.showAlertBox("enter Form date to till date");

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

  closeModal = () => {
    this.showUserModal = false;
    this.findUser = false;
    this.showModal = false;
  }

  resetall(){
    this.intialCardsData = [];
    this.intialCardsData = [];
    this.playedCard1 = "";this.playedCard2 = "";this.playedCard3 = "";this.playedCard4 = "";this.playedCard5 = "";this.playedCard6 = "";this.playedCard7 = "";this.playedCard8 = "";this.playedCard9 = "";this.playedCard10 = "";
    this.playedCard11 = "";this.playedCard12 = "";this.playedCard13 = "";this.playedCard14 = "";this.playedCard15 = "";this.playedCard16 = "";this.playedCard17 = "";this.playedCard18 = "";this.playedCard19 = "";this.playedCard20 = "";
    this.playedCard21 = "";this.playedCard22 = "";this.playedCard23 = "";this.playedCard24 = "";this.playedCard25 = "";this.playedCard26 = "";this.playedCard27 = "";this.playedCard28 = "";this.playedCard29 = "";this.playedCard30 = "";
    this.playedCard31 = "";this.playedCard32 = "";this.playedCard33 = "";this.playedCard34 = "";this.playedCard35 = "";this.playedCard36 = "";this.playedCard37 = "";this.playedCard38 = "";this.playedCard39 = "";this.playedCard40 = "";
    this.playedCard41 = "";this.playedCard42 = "";this.playedCard43 = "";this.playedCard44 = "";this.playedCard45 = "";this.playedCard46 = "";this.playedCard47 = "";this.playedCard48 = "";this.playedCard49 = "";this.playedCard50 = "";
    this.playedCard51 = "";this.playedCard52 = "";
    this.currentHand1 = "";this.currentHand2 = "";this.currentHand3 = "";this.currentHand4 = "";this.currentHand5 = "";this.currentHand6 = "";this.currentHand7 = "";this.currentHand8 = "";this.currentHand9 = "";this.currentHand10 = "";
    this.currentHand11 = "";this.currentHand12 = "";this.currentHand13 = "";this.currentHand14 = "";this.currentHand15 = "";this.currentHand16 = "";this.currentHand17 = "";this.currentHand18 = "";this.currentHand19 = "";this.currentHand20 = "";
    this.currentHand21 = "";this.currentHand22 = "";this.currentHand23 = "";this.currentHand24 = "";this.currentHand25 = "";this.currentHand26 = "";this.currentHand27 = "";this.currentHand28 = "";this.currentHand29 = "";this.currentHand30 = "";
    this.currentHand31 = "";this.currentHand32 = "";this.currentHand33 = "";this.currentHand34 = "";this.currentHand35 = "";this.currentHand36 = "";this.currentHand37 = "";this.currentHand38 = "";this.currentHand39 = "";this.currentHand40 = "";
    this.currentHand41 = "";this.currentHand42 = "";this.currentHand43 = "";this.currentHand44 = "";this.currentHand45 = "";this.currentHand46 = "";this.currentHand47 = "";this.currentHand48 = "";this.currentHand49 = "";this.currentHand50 = "";
    this.currentHand51 = "";this.currentHand52 = "";
   }


}
