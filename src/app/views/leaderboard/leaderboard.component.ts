import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HelperService } from '../../services/HelperService';
import { UrlConstant } from '../../constant/UrlConstant';
import { AppConstants } from '../../constant/AppConstants';
import { Responses } from '../../constant/Responses';
import { PermissionNames } from '../../constant/PermissionNames';
import { NgxSpinnerService } from 'ngx-spinner';
import { Leaderboard } from '../../models/leaderboard/Leaderboard';
import { LeaderboardRuleType } from '../../enums/leaderboard/LeaderboardRuleType';
import { LeaderboardType } from '../../enums/leaderboard/LeaderboardType';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { AllGames } from '../../enums/leaderboard/AllGames';
import { LeaderboardService } from '../../services/LeaderboardService';


@Component({
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeaderboardComponent implements OnInit {
  [x: string]: any;

  public leaderboardRuleTypes = Object.values(LeaderboardRuleType);
  public leaderboardTypes = Object.values(LeaderboardType);
  public allGamesList = Object.values(AllGames);
  private scheduledPointsByUserId: {}
  public dataSource: MatTableDataSource<any>;
  public allData: Leaderboard[];
  public columns: string[] = ['leaderboardId', 'name', 'ruleType', 'type', 'minValue', 'created_at', 'Actions', 'clone']
  public allGameLength: number = 14
  public worklooperGameLength: number = 9;
  public showConfirmBox = false;
  public allGamesChecked = false;
  public ifAnyGameUnselected = false;
  public checkedGamesList = [];
  public unselect = false;
  public ipAddress = AppConstants.DEFAULT_IP;
  public requestParameters = {};
  public prizeDetailsData: any[] = [];
  public usersData: any[] = [];
  public disableLeaderboardID: string;

  public modalData: any;
  public showModal: boolean = false;
  public showsedulepoint: boolean = false;
  public upDateLeaderBoardModal: boolean = false;
  public showTime: boolean = false;
  public showAllGames: boolean = true;
  public alert = "";
  public showAlertModal = false;
  public showAlertModalClone = false;
  public isLeaderboardEnabled: boolean = false;
  public showCreateModal: boolean = false;
  public isValid = false;
  public nodata = true;
  public all: any = "ALL";

  public userName: string = "";
  public startTime: string = "";
  public endTime: string = "";
  public startDate: string = "";
  public endDate: string = "";
  public name: string = "";
  public stakeWise: string = "";
  public leaderboardRuleType: string = "";
  public leaderboardType: string = "";
  public minValue: string = "";
  public minEntryfee: string = "";
  public maxEntryFee: string = "";
  public promoPrizePool: string = "";
  public lockedPrizePool: string = "";
  public depositPrizePool: string = "";
  public withdrawalPrizePool: string = "";
  public userId1: string = "";

  public score1: string = "";
  public scheduledPoints1: string = "";
  public username1: string = "";
  public avatar1: string = "";
  public userId2: string = "";
  public score2: string = "";
  public scheduledPoints2: string = "";
  public username2: string = "";
  public avatar2: string = "";
  public userId3: string = "";
  public score3: string = "";
  public scheduledPoints3: string = "";
  public username3: string = "";
  public avatar3: string = "";
  public userId4: string = "";
  public score4: string = "";
  public scheduledPoints4: string = "";
  public username4: string = "";
  public avatar4: string = "";
  public userId5: string = "";
  public score5: string = "";
  public scheduledPoints5: string = "";
  public username5: string = "";
  public avatar5: string = "";

  public userId6: string = "";
  public score6: string = "";
  public scheduledPoints6: string = "";
  public username6: string = "";
  public avatar6: string = "";
  public userId7: string = "";
  public score7: string = "";
  public scheduledPoints7: string = "";
  public username7: string = "";
  public avatar7: string = "";
  public userId8: string = "";
  public score8: string = "";
  public scheduledPoints8: string = "";
  public username8: string = "";
  public avatar8: string = "";
  public userId9: string = "";
  public score9: string = "";
  public scheduledPoints9: string = "";
  public username9: string = "";
  public avatar9: string = "";
  public userId10: string = "";
  public score10: string = "";
  public scheduledPoints10: string = "";
  public username10: string = "";
  public avatar10: string = "";
  public userId11: string = "";
  public score11: string = "";
  public scheduledPoints11: string = "";
  public username11: string = "";
  public avatar11: string = "";
  public userId12: string = "";
  public score12: string = "";
  public scheduledPoints12: string = "";
  public username12: string = "";
  public avatar12: string = "";
  public userId13: string = "";
  public score13: string = "";
  public scheduledPoints13: string = "";
  public username13: string = "";
  public avatar13: string = "";
  public userId14: string = "";
  public score14: string = "";
  public scheduledPoints14: string = "";
  public username14: string = "";
  public avatar14: string = "";
  public userId15: string = "";
  public score15: string = "";
  public scheduledPoints15: string = "";
  public username15: string = "";
  public avatar15: string = "";
  public userId16: string = "";
  public score16: string = "";
  public scheduledPoints16: string = "";
  public username16: string = "";
  public avatar16: string = "";
  public userId17: string = "";
  public score17: string = "";
  public scheduledPoints17: string = "";
  public username17: string = "";
  public avatar17: string = "";
  public userId18: string = "";
  public score18: string = "";
  public scheduledPoints18: string = "";
  public username18: string = "";
  public avatar18: string = "";
  public userId19: string = "";
  public score19: string = "";
  public scheduledPoints19: string = "";
  public username19: string = "";
  public avatar19: string = "";
  public userId20: string = "";
  public score20: string = "";
  public scheduledPoints20: string = "";
  public username20: string = "";
  public avatar20: string = "";

  public termsAndConditions: string = "";
  public aboutLeaderboard: string = "";

  public rank1: string = "";
  public promoPercent1: string = "";
  public lockedPercent1: string = "";
  public depositPercent1: string = "";
  public withdrawalPercent1: string = "";
  public rank2: string = "";
  public promoPercent2: string = "";
  public lockedPercent2: string = "";
  public depositPercent2: string = "";
  public withdrawalPercent2: string = "";
  public rank3: string = "";
  public promoPercent3: string = "";
  public lockedPercent3: string = "";
  public depositPercent3: string = "";
  public withdrawalPercent3: string = "";
  public rank4: string = "";
  public promoPercent4: string = "";
  public lockedPercent4: string = "";
  public depositPercent4: string = "";
  public withdrawalPercent4: string = "";
  public rank5: string = "";
  public promoPercent5: string = "";
  public lockedPercent5: string = "";
  public depositPercent5: string = "";
  public withdrawalPercent5: string = "";
  public rank6: string = "";
  public promoPercent6: string = "";
  public lockedPercent6: string = "";
  public depositPercent6: string = "";
  public withdrawalPercent6: string = "";
  public rank7: string = "";
  public promoPercent7: string = "";
  public lockedPercent7: string = "";
  public depositPercent7: string = "";
  public withdrawalPercent7: string = "";
  public rank8: string = "";
  public promoPercent8: string = "";
  public lockedPercent8: string = "";
  public depositPercent8: string = "";
  public withdrawalPercent8: string = "";
  public rank9: string = "";
  public promoPercent9: string = "";
  public lockedPercent9: string = "";
  public depositPercent9: string = "";
  public withdrawalPercent9: string = "";
  public rank10: string = "";
  public promoPercent10: string = "";
  public lockedPercent10: string = "";
  public depositPercent10: string = "";
  public withdrawalPercent10: string = ""

  public rank11: string = "";
  public promoPercent11: string = "";
  public lockedPercent11: string = "";
  public depositPercent11: string = "";
  public withdrawalPercent11: string = "";
  public rank12: string = "";
  public promoPercent12: string = "";
  public lockedPercent12: string = "";
  public depositPercent12: string = "";
  public withdrawalPercent12: string = "";
  public rank13: string = "";
  public promoPercent13: string = "";
  public lockedPercent13: string = "";
  public depositPercent13: string = "";
  public withdrawalPercent13: string = "";
  public rank14: string = "";
  public promoPercent14: string = "";
  public lockedPercent14: string = "";
  public depositPercent14: string = "";
  public withdrawalPercent14: string = "";
  public rank15: string = "";
  public promoPercent15: string = "";
  public lockedPercent15: string = "";
  public depositPercent15: string = "";
  public withdrawalPercent15: string = "";
  public rank16: string = "";
  public promoPercent16: string = "";
  public lockedPercent16: string = "";
  public depositPercent16: string = "";
  public withdrawalPercent16: string = "";
  public rank17: string = "";
  public promoPercent17: string = "";
  public lockedPercent17: string = "";
  public depositPercent17: string = "";
  public withdrawalPercent17: string = "";
  public rank18: string = "";
  public promoPercent18: string = "";
  public lockedPercent18: string = "";
  public depositPercent18: string = "";
  public withdrawalPercent18: string = "";
  public rank19: string = "";
  public promoPercent19: string = "";
  public lockedPercent19: string = "";
  public depositPercent19: string = "";
  public withdrawalPercent19: string = "";
  public rank20: string = "";
  public promoPercent20: string = "";
  public lockedPercent20: string = "";
  public depositPercent20: string = "";
  public withdrawalPercent20: string = ""

  public rank21: string = "";
  public promoPercent21: string = "";
  public lockedPercent21: string = "";
  public depositPercent21: string = "";
  public withdrawalPercent21: string = "";
  public rank22: string = "";
  public promoPercent22: string = "";
  public lockedPercent22: string = "";
  public depositPercent22: string = "";
  public withdrawalPercent22: string = "";
  public rank23: string = "";
  public promoPercent23: string = "";
  public lockedPercent23: string = "";
  public depositPercent23: string = "";
  public withdrawalPercent23: string = "";
  public rank24: string = "";
  public promoPercent24: string = "";
  public lockedPercent24: string = "";
  public depositPercent24: string = "";
  public withdrawalPercent24: string = "";
  public rank25: string = "";
  public promoPercent25: string = "";
  public lockedPercent25: string = "";
  public depositPercent25: string = "";
  public withdrawalPercent25: string = "";
  public rank26: string = "";
  public promoPercent26: string = "";
  public lockedPercent26: string = "";
  public depositPercent26: string = "";
  public withdrawalPercent26: string = "";
  public rank27: string = "";
  public promoPercent27: string = "";
  public lockedPercent27: string = "";
  public depositPercent27: string = "";
  public withdrawalPercent27: string = "";
  public rank28: string = "";
  public promoPercent28: string = "";
  public lockedPercent28: string = "";
  public depositPercent28: string = "";
  public withdrawalPercent28: string = "";
  public rank29: string = "";
  public promoPercent29: string = "";
  public lockedPercent29: string = "";
  public depositPercent29: string = "";
  public withdrawalPercent29: string = "";
  public rank30: string = "";
  public promoPercent30: string = "";
  public lockedPercent30: string = "";
  public depositPercent30: string = "";
  public withdrawalPercent30: string = ""
  public leaderboardIdupdate: string = ""


  public paginator: MatPaginator;
  public sort: MatSort;

  public access_permission_write: boolean = false;
  public access_permission_read: boolean = false;
  public addinternaluse: boolean = false;

  currentDate = new Date();

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

  applyfilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase()
  }

  constructor(
    public leaderboardService: LeaderboardService,
    public spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.LEADERBOARD);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
    this.getLeaderboardDetails();
    this.userName = JSON.parse(sessionStorage.user).user_name;
    this.leaderboardService.getIP().subscribe((res: any) => {
      this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;

    });
  }

  reloadPage() {
    location.reload();
  }

  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  showAlertBoxClone = (alert) => {
    this.alert = alert;
    this.showAlertModalClone = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.showAlertModalClone = false
    this.alert = ""
    this.closeLeaderboardDetails()
  }
  addInternalUsesChange(value: string, event: { checked: any }) {
    if (event.checked) {
      this.addinternaluse = true
    }
    else {
      this.addinternaluse = false
    }
  }
  onGamesCheckboxChange(option: string, event: { checked: any; }) {
    if (event.checked) {
      if (option == this.all) {
        this.checkedGamesList = this.allGamesList;
        this.allGamesChecked = true;
        this.unselect = true
      } else {
        this.checkedGamesList.push(option);
      }

    } else {
      if (option == this.all) {
        this.checkedGamesList = [];
        this.allGamesChecked = false;
        this.unselect = false;
      } else {
        this.unselect = false;
        for (var i = 0; i < this.checkedGamesList.length; i++) {
          if (this.checkedGamesList[i] == option) {
            this.checkedGamesList.splice(i, 1);
          }
        }
      }
    }
  }

  getLeaderboardDetails = () => {
    this.allData = [];
    this.nodata = true;
    this.leaderboardService.getAllLeaderboard(UrlConstant.getAllLeaderboardsUrl, AppConstants.NO_QUERY_PARAM, AppConstants.NO_URL_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        if (resData.result === Responses.SUCCESS) {
          if (resData.leaderboards == null) {
            this.allData = [];
            this.showAlertBox('No data available')
          } else {
            this.allData = resData.leaderboards;
          }
        } else if (resData.result === Responses.INTERNAL_SERVER_ERROR) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR);
        } else if (resData.result === Responses.DB_ERROR) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.DB_ERROR);
        } else if (resData.result === Responses.LEADERBOARD_NOT_FOUND) {
          this.allData = [];
          this.showAlertBox("Leaderboard not found");
        }
        this.nodata = false;
        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
        error => {
          if (error === Responses.INCORRECT_TIME_INTERVAL) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);
          } else {
            this.closeAlertModal();
            this.showAlertBox("There was an error finding the leaderboard");
          }
        });
  }

  onTypeSelected(selectedLeaderBoardType: LeaderboardType) {
    this.showTime = (selectedLeaderBoardType == LeaderboardType.HOURLY);
    this.leaderboardType = selectedLeaderBoardType;
  }
  formatDate(date): string {
    return date.toString();
  }
  onRuleTypeSelected(selectedLeaderboardRuleType: LeaderboardRuleType) {
    this.showAllGames = !(selectedLeaderboardRuleType == LeaderboardRuleType.HIGHEST_SCORE);
    this.leaderboardRuleType = selectedLeaderboardRuleType;
  }

  disableLeaderBoard = (leaderboardID: string) => {
    if (this.access_permission_write) {
      if (leaderboardID == "" || leaderboardID == undefined) {
        this.showAlertBox("Invalid Leaderboard");
      } else {
        this.leaderboardService.disableLeaderboard(UrlConstant.disableLeaderboardUrl, leaderboardID, '', this.ipAddress, this.userName, '' + Date.now())
          .subscribe(resData => {
            this.showConfirmBox = false;
            if (resData.result === Responses.SUCCESS) {
              this.showAlert("Leaderboard disabled successfully.");
              this.getLeaderboardDetails();
            } else if (resData.result === Responses.ALREADY_DISABLED) {
              this.showAlertBox("Leaderboard you are trying to disable is already disabled");
            } else if (resData.result === Responses.DISABLE_TIME_EXPIRED) {
              this.showAlert("Time to disable leaderboard has expired");
            } else if (resData.result === Responses.LEADERBOARD_NOT_FOUND) {
              this.showAlert(ResponsesDescription.LEADERBOARD_NOT_FOUND);
            } else if (resData.result === Responses.DB_ERROR) {
              this.showAlert(ResponsesDescription.DB_ERROR);
            }
          });
      }
    } else {
      this.showAlertBox(AppConstants.NO_ACCESS_PERMISSION + " Leaderboard")
    }
  }

  showConfirmationBox = (leaderboardID) => {
    this.showConfirmBox = true
    this.disableLeaderboardID = leaderboardID;
  }
  closeConfirmationBox = () => {
    this.isLeaderboardEnabled = false;
    this.showConfirmBox = false
    this.disableLeaderboardID = "";
  }
  viewLeaderboardDetails = (leaderboard) => {

    leaderboard.startTime = AppConstants.getDatefromTimestamp(leaderboard.startTime);
    leaderboard.endTime = AppConstants.getDatefromTimestamp(leaderboard.endTime);
    leaderboard.createdAt = AppConstants.getDatefromTimestamp(leaderboard.createdAt)
    this.modalData = leaderboard;
    this.prizeDetailsData = leaderboard.prizeDetails;
    this.usersData = leaderboard.users;
    this.showModal = true;
    this.leaderboardIdupdate = this.modalData.leaderboardId

  }

  closeLeaderboardDetails = () => {
    this.initializeModelVariables();
    this.showModal = false;
  }

  clear1() { this.rank1 = "", this.lockedPercent1 = "", this.promoPercent1 = "", this.depositPercent1 = "", this.withdrawalPercent1 = "" }
  clear2() { this.rank2 = "", this.lockedPercent2 = "", this.promoPercent2 = "", this.depositPercent2 = "", this.withdrawalPercent2 = "" }
  clear3() { this.rank3 = "", this.lockedPercent3 = "", this.promoPercent3 = "", this.depositPercent3 = "", this.withdrawalPercent3 = "" }
  clear4() { this.rank4 = "", this.lockedPercent4 = "", this.promoPercent4 = "", this.depositPercent4 = "", this.withdrawalPercent4 = "" }
  clear5() { this.rank5 = "", this.lockedPercent5 = "", this.promoPercent5 = "", this.depositPercent5 = "", this.withdrawalPercent5 = "" }

  showleaderboard6: boolean;
  addprize6() { this.showleaderboard6 = true }
  deleteprize6() { this.showleaderboard6 = false, this.clear6() }
  clear6() { this.rank6 = "", this.lockedPercent6 = "", this.promoPercent6 = "", this.depositPercent6 = "", this.withdrawalPercent6 = "" }

  showleaderboard7: boolean;
  addprize7() { this.showleaderboard7 = true }
  deleteprize7() { this.showleaderboard7 = false, this.clear7() }
  clear7() { this.rank7 = "", this.lockedPercent7 = "", this.promoPercent7 = "", this.depositPercent7 = "", this.withdrawalPercent7 = "" }

  showleaderboard8: boolean;
  addprize8() { this.showleaderboard8 = true }
  deleteprize8() { this.showleaderboard8 = false, this.clear8() }
  clear8() { this.rank8 = "", this.lockedPercent8 = "", this.promoPercent8 = "", this.depositPercent8 = "", this.withdrawalPercent8 = "" }

  showleaderboard9: boolean;
  addprize9() { this.showleaderboard9 = true }
  deleteprize9() { this.showleaderboard9 = false, this.clear9() }
  clear9() { this.rank9 = "", this.lockedPercent9 = "", this.promoPercent9 = "", this.depositPercent9 = "", this.withdrawalPercent9 = "" }

  showleaderboard10: boolean;
  addprize10() { this.showleaderboard10 = true }
  deleteprize10() { this.showleaderboard10 = false, this.clear10() }
  clear10() { this.rank10 = "", this.lockedPercent10 = "", this.promoPercent10 = "", this.depositPercent10 = "", this.withdrawalPercent10 = "" }

  showleaderboard11: boolean;
  addprize11() { this.showleaderboard11 = true }
  deleteprize11() { this.showleaderboard11 = false, this.clear11() }
  clear11() { this.rank11 = "", this.lockedPercent11 = "", this.promoPercent11 = "", this.depositPercent11 = "", this.withdrawalPercent11 = "" }

  showleaderboard12: boolean;
  addprize12() { this.showleaderboard12 = true }
  deleteprize12() { this.showleaderboard12 = false, this.clear12() }
  clear12() { this.rank12 = "", this.lockedPercent12 = "", this.promoPercent12 = "", this.depositPercent12 = "", this.withdrawalPercent12 = "" }

  showleaderboard13: boolean;
  addprize13() { this.showleaderboard13 = true }
  deleteprize13() { this.showleaderboard13 = false, this.clear13() }
  clear13() { this.rank13 = "", this.lockedPercent13 = "", this.promoPercent13 = "", this.depositPercent13 = "", this.withdrawalPercent13 = "" }

  showleaderboard14: boolean;
  addprize14() { this.showleaderboard14 = true }
  deleteprize14() { this.showleaderboard14 = false, this.clear14() }
  clear14() { this.rank14 = "", this.lockedPercent14 = "", this.promoPercent14 = "", this.depositPercent14 = "", this.withdrawalPercent14 = "" }

  showleaderboard15: boolean;
  addprize15() { this.showleaderboard15 = true }
  deleteprize15() { this.showleaderboard15 = false, this.clear15() }
  clear15() { this.rank15 = "", this.lockedPercent15 = "", this.promoPercent15 = "", this.depositPercent15 = "", this.withdrawalPercent15 = "" }

  showleaderboard16: boolean;
  addprize16() { this.showleaderboard16 = true }
  deleteprize16() { this.showleaderboard16 = false, this.clear16() }
  clear16() { this.rank16 = "", this.lockedPercent16 = "", this.promoPercent16 = "", this.depositPercent16 = "", this.withdrawalPercent16 = "" }

  showleaderboard17: boolean;
  addprize17() { this.showleaderboard17 = true }
  deleteprize17() { this.showleaderboard17 = false, this.clear17() }
  clear17() { this.rank17 = "", this.lockedPercent17 = "", this.promoPercent17 = "", this.depositPercent17 = "", this.withdrawalPercent17 = "" }

  showleaderboard18: boolean;
  addprize18() { this.showleaderboard18 = true }
  deleteprize18() { this.showleaderboard18 = false, this.clear18() }
  clear18() { this.rank18 = "", this.lockedPercent18 = "", this.promoPercent18 = "", this.depositPercent18 = "", this.withdrawalPercent18 = "" }

  showleaderboard19: boolean;
  addprize19() { this.showleaderboard19 = true }
  deleteprize19() { this.showleaderboard19 = false, this.clear19() }
  clear19() { this.rank19 = "", this.lockedPercent19 = "", this.promoPercent19 = "", this.depositPercent19 = "", this.withdrawalPercent19 = "" }

  showleaderboard20: boolean;
  addprize20() { this.showleaderboard20 = true }
  deleteprize20() { this.showleaderboard20 = false, this.clear20() }
  clear20() { this.rank20 = "", this.lockedPercent20 = "", this.promoPercent20 = "", this.depositPercent20 = "", this.withdrawalPercent20 = "" }

  showleaderboard21: boolean;
  addprize21() { this.showleaderboard21 = true }
  deleteprize21() { this.showleaderboard21 = false, this.clear21() }
  clear21() { this.rank21 = "", this.lockedPercent21 = "", this.promoPercent21 = "", this.depositPercent21 = "", this.withdrawalPercent21 = "" }

  showleaderboard22: boolean;
  addprize22() { this.showleaderboard22 = true }
  deleteprize22() { this.showleaderboard22 = false, this.clear22() }
  clear22() { this.rank22 = "", this.lockedPercent22 = "", this.promoPercent22 = "", this.depositPercent22 = "", this.withdrawalPercent22 = "" }

  showleaderboard23: boolean;
  addprize23() { this.showleaderboard23 = true }
  deleteprize23() { this.showleaderboard23 = false, this.clear23() }
  clear23() { this.rank23 = "", this.lockedPercent23 = "", this.promoPercent23 = "", this.depositPercent23 = "", this.withdrawalPercent23 = "" }

  showleaderboard24: boolean;
  addprize24() { this.showleaderboard24 = true }
  deleteprize24() { this.showleaderboard24 = false, this.clear24() }
  clear24() { this.rank24 = "", this.lockedPercent24 = "", this.promoPercent24 = "", this.depositPercent24 = "", this.withdrawalPercent24 = "" }

  showleaderboard25: boolean;
  addprize25() { this.showleaderboard25 = true }
  deleteprize25() { this.showleaderboard25 = false, this.clear25() }
  clear25() { this.rank25 = "", this.lockedPercent25 = "", this.promoPercent25 = "", this.depositPercent25 = "", this.withdrawalPercent25 = "" }

  showleaderboard26: boolean;
  addprize26() { this.showleaderboard26 = true }
  deleteprize26() { this.showleaderboard26 = false, this.clear26() }
  clear26() { this.rank26 = "", this.lockedPercent26 = "", this.promoPercent26 = "", this.depositPercent26 = "", this.withdrawalPercent26 = "" }

  showleaderboard27: boolean;
  addprize27() { this.showleaderboard27 = true }
  deleteprize27() { this.showleaderboard27 = false, this.clear27() }
  clear27() { this.rank27 = "", this.lockedPercent27 = "", this.promoPercent27 = "", this.depositPercent27 = "", this.withdrawalPercent27 = "" }

  showleaderboard28: boolean;
  addprize28() { this.showleaderboard28 = true }
  deleteprize28() { this.showleaderboard28 = false, this.clear28() }
  clear28() { this.rank28 = "", this.lockedPercent28 = "", this.promoPercent28 = "", this.depositPercent28 = "", this.withdrawalPercent28 = "" }

  showleaderboard29: boolean;
  addprize29() { this.showleaderboard29 = true }
  deleteprize29() { this.showleaderboard29 = false, this.clear29() }
  clear29() { this.rank29 = "", this.lockedPercent29 = "", this.promoPercent29 = "", this.depositPercent29 = "", this.withdrawalPercent29 = "" }

  showleaderboard30: boolean;
  addprize30() { this.showleaderboard30 = true }
  deleteprize30() { this.showleaderboard30 = false, this.clear30() }
  clear30() { this.rank30 = "", this.lockedPercent30 = "", this.promoPercent30 = "", this.depositPercent30 = "", this.withdrawalPercent30 = "" }

  clearuserId1() { this.userId1 = "", this.score1 = "", this.scheduledPoints1 = "", this.username1 = "", this.avatar1 = "" }
  clearuserId2() { this.userId2 = "", this.score2 = "", this.scheduledPoints2 = "", this.username2 = "", this.avatar2 = "" }
  clearuserId3() { this.userId3 = "", this.score3 = "", this.scheduledPoints3 = "", this.username3 = "", this.avatar3 = "" }
  clearuserId4() { this.userId4 = "", this.score4 = "", this.scheduledPoints4 = "", this.username4 = "", this.avatar4 = "" }
  clearuserId5() { this.userId5 = "", this.score5 = "", this.scheduledPoints5 = "", this.username5 = "", this.avatar5 = "" }


  showuserId6: boolean;
  adduserId6() { this.showuserId6 = true }
  deleteuserId6() { this.showuserId6 = false, this.clearuserId6() }
  clearuserId6() { this.userId6 = "", this.score6 = "", this.scheduledPoints6 = "", this.username6 = "", this.avatar6 = "" }

  showuserId7: boolean;
  adduserId7() { this.showuserId7 = true }
  deleteuserId7() { this.showuserId7 = false, this.clearuserId7() }
  clearuserId7() { this.userId7 = "", this.score7 = "", this.scheduledPoints7 = "", this.username7 = "", this.avatar7 = "" }

  showuserId8: boolean;
  adduserId8() { this.showuserId8 = true }
  deleteuserId8() { this.showuserId8 = false, this.clearuserId8() }
  clearuserId8() { this.userId8 = "", this.score8 = "", this.scheduledPoints8 = "", this.username8 = "", this.avatar8 = "" }

  showuserId9: boolean;
  adduserId9() { this.showuserId9 = true }
  deleteuserId9() { this.showuserId9 = false, this.clearuserId9() }
  clearuserId9() { this.userId9 = "", this.score9 = "", this.scheduledPoints9 = "", this.username9 = "", this.avatar9 = "" }

  showuserId10: boolean;
  adduserId10() { this.showuserId10 = true }
  deleteuserId10() { this.showuserId10 = false, this.clearuserId10() }
  clearuserId10() { this.userId10 = "", this.score10 = "", this.scheduledPoints10 = "", this.username10 = "", this.avatar10 = "" }

  showuserId11: boolean;
  adduserId11() { this.showuserId11 = true }
  deleteuserId11() { this.showuserId11 = false, this.clearuserId11() }
  clearuserId11() { this.userId11 = "", this.score11 = "", this.scheduledPoints11 = "", this.username11 = "", this.avatar11 = "" }

  showuserId12: boolean;
  adduserId12() { this.showuserId12 = true }
  deleteuserId12() { this.showuserId12 = false, this.clearuserId12() }
  clearuserId12() { this.userId12 = "", this.score12 = "", this.scheduledPoints12 = "", this.username12 = "", this.avatar12 = "" }

  showuserId13: boolean;
  adduserId13() { this.showuserId13 = true }
  deleteuserId13() { this.showuserId13 = false, this.clearuserId13() }
  clearuserId13() { this.userId13 = "", this.score13 = "", this.scheduledPoints13 = "", this.username13 = "", this.avatar13 = "" }

  showuserId14: boolean;
  adduserId14() { this.showuserId14 = true }
  deleteuserId14() { this.showuserId14 = false, this.clearuserId14() }
  clearuserId14() { this.userId14 = "", this.score14 = "", this.scheduledPoints14 = "", this.username14 = "", this.avatar14 = "" }

  showuserId15: boolean;
  adduserId15() { this.showuserId15 = true }
  deleteuserId15() { this.showuserId15 = false, this.clearuserId15() }
  clearuserId15() { this.userId15 = "", this.score15 = "", this.scheduledPoints15 = "", this.username15 = "", this.avatar15 = "" }

  showuserId16: boolean;
  adduserId16() { this.showuserId16 = true }
  deleteuserId16() { this.showuserId16 = false, this.clearuserId16() }
  clearuserId16() { this.userId16 = "", this.score16 = "", this.scheduledPoints16 = "", this.username16 = "", this.avatar16 = "" }

  showuserId17: boolean;
  adduserId17() { this.showuserId17 = true }
  deleteuserId17() { this.showuserId17 = false, this.clearuserId17() }
  clearuserId17() { this.userId17 = "", this.score17 = "", this.scheduledPoints17 = "", this.username17 = "", this.avatar17 = "" }

  showuserId18: boolean;
  adduserId18() { this.showuserId18 = true }
  deleteuserId18() { this.showuserId18 = false, this.clearuserId18() }
  clearuserId18() { this.userId18 = "", this.score18 = "", this.scheduledPoints18 = "", this.username18 = "", this.avatar18 = "" }

  showuserId19: boolean;
  adduserId19() { this.showuserId19 = true }
  deleteuserId19() { this.showuserId19 = false, this.clearuserId19() }
  clearuserId19() { this.userId19 = "", this.score19 = "", this.scheduledPoints19 = "", this.username19 = "", this.avatar19 = "" }

  showuserId20: boolean;
  adduserId20() { this.showuserId20 = true }
  deleteuserId20() { this.showuserId20 = false, this.clearuserId20() }
  clearuserId20() { this.userId20 = "", this.score20 = "", this.scheduledPoints20 = "", this.username20 = "", this.avatar20 = "" }

  showCreateLeaderboard() {
    this.showCreateModal = true
  }

  closeCreateLeaderboard() {
    this.showCreateModal = false
    this.reloadPage();
  }

  /* clone LeaderBoard Details here */
  closeCloneLeaderboardDetails = () => {
    this.initializeModelVariables();
    this.upDateLeaderBoardModal = false;
  }

  cloneLeaderboardDetails = (leaderboard, clone) => {

    leaderboard.startTime = AppConstants.getDatefromTimestamp(leaderboard.startTime);
    leaderboard.endTime = AppConstants.getDatefromTimestamp(leaderboard.endTime);
    this.modalData = leaderboard;
    this.prizeDetailsData = leaderboard.prizeDetails;
    this.usersData = leaderboard.users;
    this.upDateLeaderBoardModal = true;

    this.name = this.modalData['name'];
    this.minValue = this.modalData['minValue'];
    this.promoPrizePool = this.modalData['promoPrizePool'];
    this.lockedPrizePool = this.modalData.lockedPrizePool;
    this.depositPrizePool = this.modalData.depositPrizePool;
    this.withdrawalPrizePool = this.modalData.withdrawalPrizePool;
    this.minEntryfee = this.modalData['minEntryfee'];
    this.maxEntryFee = this.modalData['maxEntryFee'];
    this.stakeWise = this.modalData['stakeWise']
    this.ruleType = this.modalData['ruleType']

    this.aboutLeaderboard = this.modalData['aboutLeaderboard'];
    this.termsAndConditions = this.modalData['termsAndConditions'];

    this.startDate = AppConstants.getDatefromTimestamp(leaderboard.startTime);
    this.endDate = AppConstants.getDatefromTimestamp(leaderboard.endTime);

    if (this.prizeDetailsData.length > 0) {
      this.prizedetailscheck(leaderboard)
    }
    if (this.usersData.length > 0) { this.userdetails(leaderboard, clone); }



    /* clone leaderboard prize details data here */
  }

  userdetails(leaderboard, clone) {
    this.modalData = leaderboard;
    this.prizeDetailsData = leaderboard.prizeDetails;
    this.usersData = leaderboard.users;
    this.userId1 = this.usersData[0].userId;
    this.scheduledPoints1 = this.usersData[0].scheduledPoints;
    this.username1 = this.usersData[0].username;
    this.avatar1 = this.usersData[0].avatar;
    if (clone == "clone") {
      if (this.usersData[0].score > 0) { this.score1 = "0"; }; if (this.modalData.users[1].score > 0) { this.score2 = "0"; }; if (this.modalData.users[2].score > 0) { this.score3 = "0"; };
      if (this.modalData.users[3].score > 0) { this.score4 = "0"; }; if (this.modalData.users[4].score > 0) { this.score5 = "0"; }; if (this.modalData.users[5].score > 0) { this.score6 = "0"; };
      if (this.modalData.users[6].score > 0) { this.score7 = "0"; }; if (this.modalData.users[7].score > 0) { this.score8 = "0"; }; if (this.modalData.users[8].score > 0) { this.score9 = "0"; };
      if (this.modalData.users[9].score > 0) { this.score10 = "0"; }; if (this.modalData.users[10].score > 0) { this.score11 = "0"; }; if (this.modalData.users[11].score > 0) { this.score12 = "0"; };
      if (this.modalData.users[12].score > 0) { this.score13 = "0"; }; if (this.modalData.users[13].score > 0) { this.score14 = "0"; }; if (this.modalData.users[14].score > 0) { this.score15 = "0"; };
      if (this.modalData.users[15].score > 0) { this.score16 = "0"; }; if (this.modalData.users[16].score > 0) { this.score17 = "0"; }; if (this.modalData.users[17].score > 0) { this.score18 = "0"; };
      if (this.modalData.users[18].score > 0) { this.score19 = "0"; }; if (this.modalData.users[19].score > 0) { this.score20 = "0"; };
    } else {
      this.score1 = this.usersData[0].score; this.score2 = this.modalData.users[1].score; this.score3 = this.modalData.users[2].score; this.score4 = this.modalData.users[3].score;
      this.score5 = this.modalData.users[4].score; this.score6 = this.modalData.users[5].score; this.score7 = this.modalData.users[6].score; this.score8 = this.modalData.users[7].score;
      this.score9 = this.modalData.users[8].score; this.score10 = this.modalData.users[9].score; this.score11 = this.modalData.users[10].score; this.score12 = this.modalData.users[11].score;
      this.score13 = this.modalData.users[12].score; this.score14 = this.modalData.users[13].score; this.score15 = this.modalData.users[14].score; this.score16 = this.modalData.users[15].score;
      this.score17 = this.modalData.users[16].score; this.score18 = this.modalData.users[17].score; this.score19 = this.modalData.users[18].score; this.score20 = this.modalData.users[19].score;
    }
    this.userId2 = this.modalData.users[1].userId;
    this.scheduledPoints2 = this.modalData.users[1].scheduledPoints;
    this.username2 = this.modalData.users[1].username;
    this.avatar2 = this.modalData.users[1].avatar;

    this.userId3 = this.modalData.users[2].userId;
    this.scheduledPoints3 = this.modalData.users[2].scheduledPoints;
    this.username3 = this.modalData.users[2].username;
    this.avatar3 = this.modalData.users[2].avatar;

    this.userId4 = this.modalData.users[3].userId;
    this.scheduledPoints4 = this.modalData.users[3].scheduledPoints;
    this.username4 = this.modalData.users[3].username;
    this.avatar4 = this.modalData.users[3].avatar;

    this.userId5 = this.modalData.users[4].userId;
    this.scheduledPoints5 = this.modalData.users[4].scheduledPoints;
    this.username5 = this.modalData.users[4].username;
    this.avatar5 = this.modalData.users[4].avatar;

    this.userId6 = this.modalData.users[5].userId;
    this.scheduledPoints6 = this.modalData.users[5].scheduledPoints;
    this.username6 = this.modalData.users[5].username;
    this.avatar6 = this.modalData.users[5].avatar;

    this.userId7 = this.modalData.users[6].userId;
    this.scheduledPoints7 = this.modalData.users[6].scheduledPoints;
    this.username7 = this.modalData.users[6].username;
    this.avatar7 = this.modalData.users[6].avatar;

    this.userId8 = this.modalData.users[7].userId;
    this.scheduledPoints8 = this.modalData.users[7].scheduledPoints;
    this.username8 = this.modalData.users[7].username;
    this.avatar8 = this.modalData.users[7].avatar;

    this.userId9 = this.modalData.users[8].userId;
    this.scheduledPoints9 = this.modalData.users[8].scheduledPoints;
    this.username9 = this.modalData.users[8].username;
    this.avatar9 = this.modalData.users[8].avatar;

    this.userId10 = this.modalData.users[9].userId;
    this.scheduledPoints10 = this.modalData.users[9].scheduledPoints;
    this.username10 = this.modalData.users[9].username;
    this.avatar10 = this.modalData.users[9].avatar;

    this.userId11 = this.modalData.users[10].userId;
    this.scheduledPoints11 = this.modalData.users[10].scheduledPoints;
    this.username11 = this.modalData.users[10].username;
    this.avatar11 = this.modalData.users[10].avatar;

    this.userId12 = this.modalData.users[11].userId;
    this.scheduledPoints12 = this.modalData.users[11].scheduledPoints;
    this.username12 = this.modalData.users[11].username;
    this.avatar12 = this.modalData.users[11].avatar;

    this.userId13 = this.modalData.users[12].userId;
    this.scheduledPoints13 = this.modalData.users[12].scheduledPoints;
    this.username13 = this.modalData.users[12].username;
    this.avatar13 = this.modalData.users[12].avatar;

    this.userId14 = this.modalData.users[13].userId;
    this.scheduledPoints14 = this.modalData.users[13].scheduledPoints;
    this.username14 = this.modalData.users[13].username;
    this.avatar14 = this.modalData.users[13].avatar;

    this.userId15 = this.modalData.users[14].userId;
    this.scheduledPoints15 = this.modalData.users[14].scheduledPoints;
    this.username15 = this.modalData.users[14].username;
    this.avatar15 = this.modalData.users[14].avatar;

    this.userId16 = this.modalData.users[15].userId;
    this.scheduledPoints16 = this.modalData.users[15].scheduledPoints;
    this.username16 = this.modalData.users[15].username;
    this.avatar16 = this.modalData.users[15].avatar;

    this.userId17 = this.modalData.users[16].userId;
    this.scheduledPoints17 = this.modalData.users[16].scheduledPoints;
    this.username17 = this.modalData.users[16].username;
    this.avatar17 = this.modalData.users[16].avatar;

    this.userId18 = this.modalData.users[17].userId;
    this.scheduledPoints18 = this.modalData.users[17].scheduledPoints;
    this.username18 = this.modalData.users[17].username;
    this.avatar18 = this.modalData.users[17].avatar;

    this.userId19 = this.modalData.users[18].userId;
    this.scheduledPoints19 = this.modalData.users[18].scheduledPoints;
    this.username19 = this.modalData.users[18].username;
    this.avatar19 = this.modalData.users[18].avatar;

    this.userId20 = this.modalData.users[19].userId;
    this.scheduledPoints20 = this.modalData.users[19].scheduledPoints;
    this.username20 = this.modalData.users[19].username;
    this.avatar20 = this.modalData.users[19].avatar;


  }

  prizedetailscheck(leaderboard) {
    if (this.prizeDetailsData.length > 0) {
      this.prizedetailscheck(leaderboard)
    }

    this.modalData = leaderboard;
    this.prizeDetailsData = leaderboard.prizeDetails;
    this.usersData = leaderboard.users;

    this.rank1 = this.prizeDetailsData[0].rank;
    this.promoPercent1 = this.prizeDetailsData[0].promoPercent;
    this.lockedPercent1 = this.prizeDetailsData[0].lockedPercent;
    this.depositPercent1 = this.prizeDetailsData[0].depositPercent;
    this.withdrawalPercent1 = this.prizeDetailsData[0].withdrawalPercent;

    this.rank2 = this.modalData.prizeDetails[1].rank;
    this.promoPercent2 = this.modalData.prizeDetails[1].promoPercent;
    this.lockedPercent2 = this.modalData.prizeDetails[1].lockedPercent;
    this.depositPercent2 = this.modalData.prizeDetails[1].depositPercent;
    this.withdrawalPercent2 = this.modalData.prizeDetails[1].withdrawalPercent;

    this.rank3 = this.modalData.prizeDetails[2].rank;
    this.promoPercent3 = this.modalData.prizeDetails[2].promoPercent;
    this.lockedPercent3 = this.modalData.prizeDetails[2].lockedPercent;
    this.depositPercent3 = this.modalData.prizeDetails[2].depositPercent;
    this.withdrawalPercent3 = this.modalData.prizeDetails[2].withdrawalPercent;

    this.rank4 = this.modalData.prizeDetails[3].rank;
    this.promoPercent4 = this.modalData.prizeDetails[3].promoPercent;
    this.lockedPercent4 = this.modalData.prizeDetails[3].lockedPercent;
    this.depositPercent4 = this.modalData.prizeDetails[3].depositPercent;
    this.withdrawalPercent4 = this.modalData.prizeDetails[3].withdrawalPercent;

    this.rank5 = this.modalData.prizeDetails[4].rank;
    this.promoPercent5 = this.modalData.prizeDetails[4].promoPercent;
    this.lockedPercent5 = this.modalData.prizeDetails[4].lockedPercent;
    this.depositPercent5 = this.modalData.prizeDetails[4].depositPercent;
    this.withdrawalPercent5 = this.modalData.prizeDetails[4].withdrawalPercent;

    this.rank6 = this.modalData.prizeDetails[5].rank;
    this.promoPercent6 = this.modalData.prizeDetails[5].promoPercent;
    this.lockedPercent6 = this.modalData.prizeDetails[5].lockedPercent;
    this.depositPercent6 = this.modalData.prizeDetails[5].depositPercent;
    this.withdrawalPercent6 = this.modalData.prizeDetails[5].withdrawalPercent;

    this.rank7 = this.modalData.prizeDetails[6].rank;
    this.promoPercent7 = this.modalData.prizeDetails[6].promoPercent;
    this.lockedPercent7 = this.modalData.prizeDetails[6].lockedPercent;
    this.depositPercent7 = this.modalData.prizeDetails[6].depositPercent;
    this.withdrawalPercent7 = this.modalData.prizeDetails[6].withdrawalPercent;

    this.rank8 = this.modalData.prizeDetails[7].rank;
    this.promoPercent8 = this.modalData.prizeDetails[7].promoPercent;
    this.lockedPercent8 = this.modalData.prizeDetails[7].lockedPercent;
    this.depositPercent8 = this.modalData.prizeDetails[7].depositPercent;
    this.withdrawalPercent8 = this.modalData.prizeDetails[7].withdrawalPercent;

    this.rank9 = this.modalData.prizeDetails[8].rank;
    this.promoPercent9 = this.modalData.prizeDetails[8].promoPercent;
    this.lockedPercent9 = this.modalData.prizeDetails[8].lockedPercent;
    this.depositPercent9 = this.modalData.prizeDetails[8].depositPercent;
    this.withdrawalPercent9 = this.modalData.prizeDetails[8].withdrawalPercent;

    this.rank10 = this.modalData.prizeDetails[9].rank;
    this.promoPercent10 = this.modalData.prizeDetails[9].promoPercent;
    this.lockedPercent10 = this.modalData.prizeDetails[9].lockedPercent;
    this.depositPercent10 = this.modalData.prizeDetails[9].depositPercent;
    this.withdrawalPercent10 = this.modalData.prizeDetails[9].withdrawalPercent;

    this.rank11 = this.modalData.prizeDetails[10].rank;
    this.promoPercent11 = this.modalData.prizeDetails[10].promoPercent;
    this.lockedPercent11 = this.modalData.prizeDetails[10].lockedPercent;
    this.depositPercent11 = this.modalData.prizeDetails[10].depositPercent;
    this.withdrawalPercent11 = this.modalData.prizeDetails[10].withdrawalPercent;

    this.rank12 = this.modalData.prizeDetails[11].rank;
    this.promoPercent12 = this.modalData.prizeDetails[11].promoPercent;
    this.lockedPercent12 = this.modalData.prizeDetails[11].lockedPercent;
    this.depositPercent12 = this.modalData.prizeDetails[11].depositPercent;
    this.withdrawalPercent12 = this.modalData.prizeDetails[11].withdrawalPercent;

    this.rank13 = this.modalData.prizeDetails[12].rank;
    this.promoPercent13 = this.modalData.prizeDetails[12].promoPercent;
    this.lockedPercent13 = this.modalData.prizeDetails[12].lockedPercent;
    this.depositPercent13 = this.modalData.prizeDetails[12].depositPercent;
    this.withdrawalPercent13 = this.modalData.prizeDetails[12].withdrawalPercent;

    this.rank14 = this.modalData.prizeDetails[13].rank;
    this.promoPercent14 = this.modalData.prizeDetails[13].promoPercent;
    this.lockedPercent14 = this.modalData.prizeDetails[13].lockedPercent;
    this.depositPercent14 = this.modalData.prizeDetails[13].depositPercent;
    this.withdrawalPercent14 = this.modalData.prizeDetails[13].withdrawalPercent;

    this.rank15 = this.modalData.prizeDetails[14].rank;
    this.promoPercent15 = this.modalData.prizeDetails[14].promoPercent;
    this.lockedPercent15 = this.modalData.prizeDetails[14].lockedPercent;
    this.depositPercent15 = this.modalData.prizeDetails[14].depositPercent;
    this.withdrawalPercent15 = this.modalData.prizeDetails[14].withdrawalPercent;

    this.rank16 = this.modalData.prizeDetails[15].rank;
    this.promoPercent16 = this.modalData.prizeDetails[15].promoPercent;
    this.lockedPercent16 = this.modalData.prizeDetails[15].lockedPercent;
    this.depositPercent16 = this.modalData.prizeDetails[15].depositPercent;
    this.withdrawalPercent16 = this.modalData.prizeDetails[15].withdrawalPercent;

    this.rank17 = this.modalData.prizeDetails[16].rank;
    this.promoPercent17 = this.modalData.prizeDetails[16].promoPercent;
    this.lockedPercent17 = this.modalData.prizeDetails[16].lockedPercent;
    this.depositPercent17 = this.modalData.prizeDetails[16].depositPercent;
    this.withdrawalPercent17 = this.modalData.prizeDetails[16].withdrawalPercent;

    this.rank18 = this.modalData.prizeDetails[17].rank;
    this.promoPercent18 = this.modalData.prizeDetails[17].promoPercent;
    this.lockedPercent18 = this.modalData.prizeDetails[17].lockedPercent;
    this.depositPercent18 = this.modalData.prizeDetails[17].depositPercent;
    this.withdrawalPercent18 = this.modalData.prizeDetails[17].withdrawalPercent;

    this.rank19 = this.modalData.prizeDetails[18].rank;
    this.promoPercent19 = this.modalData.prizeDetails[18].promoPercent;
    this.lockedPercent19 = this.modalData.prizeDetails[18].lockedPercent;
    this.depositPercent19 = this.modalData.prizeDetails[18].depositPercent;
    this.withdrawalPercent19 = this.modalData.prizeDetails[18].withdrawalPercent;

    this.rank20 = this.modalData.prizeDetails[19].rank;
    this.promoPercent20 = this.modalData.prizeDetails[19].promoPercent;
    this.lockedPercent20 = this.modalData.prizeDetails[19].lockedPercent;
    this.depositPercent20 = this.modalData.prizeDetails[19].depositPercent;
    this.withdrawalPercent20 = this.modalData.prizeDetails[19].withdrawalPercent;

    this.rank21 = this.modalData.prizeDetails[20].rank;
    this.promoPercent21 = this.modalData.prizeDetails[20].promoPercent;
    this.lockedPercent21 = this.modalData.prizeDetails[20].lockedPercent;
    this.depositPercent21 = this.modalData.prizeDetails[20].depositPercent;
    this.withdrawalPercent21 = this.modalData.prizeDetails[20].withdrawalPercent;

    this.rank22 = this.modalData.prizeDetails[21].rank;
    this.promoPercent22 = this.modalData.prizeDetails[21].promoPercent;
    this.lockedPercent22 = this.modalData.prizeDetails[21].lockedPercent;
    this.depositPercent22 = this.modalData.prizeDetails[21].depositPercent;
    this.withdrawalPercent22 = this.modalData.prizeDetails[21].withdrawalPercent;

    this.rank23 = this.modalData.prizeDetails[22].rank;
    this.promoPercent23 = this.modalData.prizeDetails[22].promoPercent;
    this.lockedPercent23 = this.modalData.prizeDetails[22].lockedPercent;
    this.depositPercent23 = this.modalData.prizeDetails[22].depositPercent;
    this.withdrawalPercent23 = this.modalData.prizeDetails[22].withdrawalPercent;

    this.rank24 = this.modalData.prizeDetails[23].rank;
    this.promoPercent24 = this.modalData.prizeDetails[23].promoPercent;
    this.lockedPercent24 = this.modalData.prizeDetails[23].lockedPercent;
    this.depositPercent24 = this.modalData.prizeDetails[23].depositPercent;
    this.withdrawalPercent24 = this.modalData.prizeDetails[23].withdrawalPercent;

    this.rank25 = this.modalData.prizeDetails[24].rank;
    this.promoPercent25 = this.modalData.prizeDetails[24].promoPercent;
    this.lockedPercent25 = this.modalData.prizeDetails[24].lockedPercent;
    this.depositPercent25 = this.modalData.prizeDetails[24].depositPercent;
    this.withdrawalPercent25 = this.modalData.prizeDetails[24].withdrawalPercent;

    this.rank26 = this.modalData.prizeDetails[25].rank;
    this.promoPercent26 = this.modalData.prizeDetails[25].promoPercent;
    this.lockedPercent26 = this.modalData.prizeDetails[25].lockedPercent;
    this.depositPercent26 = this.modalData.prizeDetails[25].depositPercent;
    this.withdrawalPercent26 = this.modalData.prizeDetails[25].withdrawalPercent;

    this.rank27 = this.modalData.prizeDetails[26].rank;
    this.promoPercent27 = this.modalData.prizeDetails[26].promoPercent;
    this.lockedPercent27 = this.modalData.prizeDetails[26].lockedPercent;
    this.depositPercent27 = this.modalData.prizeDetails[26].depositPercent;
    this.withdrawalPercent27 = this.modalData.prizeDetails[26].withdrawalPercent;

    this.rank28 = this.modalData.prizeDetails[27].rank;
    this.promoPercent28 = this.modalData.prizeDetails[27].promoPercent;
    this.lockedPercent28 = this.modalData.prizeDetails[27].lockedPercent;
    this.depositPercent28 = this.modalData.prizeDetails[27].depositPercent;
    this.withdrawalPercent28 = this.modalData.prizeDetails[27].withdrawalPercent;

    this.rank29 = this.modalData.prizeDetails[28].rank;
    this.promoPercent29 = this.modalData.prizeDetails[28].promoPercent;
    this.lockedPercent29 = this.modalData.prizeDetails[28].lockedPercent;
    this.depositPercent29 = this.modalData.prizeDetails[28].depositPercent;
    this.withdrawalPercent29 = this.modalData.prizeDetails[28].withdrawalPercent;

    this.rank30 = this.modalData.prizeDetails[29].rank;
    this.promoPercent30 = this.modalData.prizeDetails[29].promoPercent;
    this.lockedPercent30 = this.modalData.prizeDetails[29].lockedPercent;
    this.depositPercent30 = this.modalData.prizeDetails[29].depositPercent;
    this.withdrawalPercent30 = this.modalData.prizeDetails[29].withdrawalPercent;

    /* clone user id data here*/
  }

  createLeaderboard() {
    if (this.access_permission_write) {
      this.prizeDetailsData = []
      this.usersData = []
      if (this.leaderboardRuleType != LeaderboardRuleType.DEPOSIT_AMOUNT && (this.startDate == '' ||
        this.endDate == '' ||
        this.name == '' ||
        this.stakeWise == '' ||
        this.leaderboardType == '' ||
        this.minValue == '' ||
        this.minEntryfee == '' ||
        this.maxEntryFee == "" ||
        this.promoPrizePool == '' ||
        this.lockedPrizePool == '' ||
        this.depositPrizePool == '' ||
        this.withdrawalPrizePool == '' ||
        this.termsAndConditions == '' ||
        this.aboutLeaderboard == '' ||
        this.rank1 == '' ||
        this.promoPercent1 == '' ||
        this.lockedPercent1 == '' ||
        this.depositPercent1 == '' ||
        this.withdrawalPercent1 == '' ||
        this.checkedGamesList.length == 0)) {
        this.showAlert("Enter all the mandatory fields");
        return;
      }
      else if (this.leaderboardRuleType == LeaderboardRuleType.DEPOSIT_AMOUNT && (this.startDate == '' ||
        this.endDate == '' ||
        this.name == '' ||
        this.stakeWise == '' ||
        this.leaderboardType == '' ||
        this.minValue == '' ||
        this.minEntryfee == '' ||
        this.maxEntryFee == "" ||
        this.promoPrizePool == '' ||
        this.lockedPrizePool == '' ||
        this.depositPrizePool == '' ||
        this.withdrawalPrizePool == '' ||
        this.termsAndConditions == '' ||
        this.aboutLeaderboard == '' ||
        this.rank1 == '' ||
        this.promoPercent1 == '' ||
        this.lockedPercent1 == '' ||
        this.depositPercent1 == '' ||
        this.withdrawalPercent1 == '')) {
        this.showAlert("Enter all the mandatory fields");
        return;
      }
      else if (this.leaderboardType == LeaderboardType.HOURLY) {
        if (this.startTime == '' || this.endTime == '') {
          this.showAlert("Please enter start and end time as well.")
          return
        } else {
          this.createLeaderboardNetworkCall();
        }
      } else {
        this.createLeaderboardNetworkCall();
      }

    } else {
      this.showAlertBox(AppConstants.NO_ACCESS_PERMISSION + " Leaderboard")
    }
  }


  clonecreateLeaderboard() {
    if (this.access_permission_write) {
      this.prizeDetailsData = []
      this.usersData = []
      if (this.leaderboardRuleType == LeaderboardRuleType.DEPOSIT_AMOUNT && (this.startDate == '' ||
        this.endDate != '' ||
        this.name != '' ||
        this.stakeWise != '' ||
        this.leaderboardType != '' ||
        this.minValue != '' ||
        this.minEntryfee != '' ||
        this.maxEntryFee == "" ||
        this.promoPrizePool != '' ||
        this.lockedPrizePool != '' ||
        this.depositPrizePool != '' ||
        this.withdrawalPrizePool != '' ||
        this.termsAndConditions != '' ||
        this.aboutLeaderboard != '' ||
        this.rank1 != '' ||
        this.promoPercent1 != '' ||
        this.lockedPercent1 != '' ||
        this.depositPercent1 != '' ||
        this.withdrawalPercent1 != '')) {
        this.showAlert("Enter all the mandatory fields");
        return;
      }
      else if (this.leaderboardType == LeaderboardType.HOURLY) {
        if (this.startTime == '' || this.endTime == '') {
          this.showAlert("Please enter start and end time as well.")
          return
        } else {
          this.clonecreateLeaderboardNetworkCall();
        }
      } else {
        this.clonecreateLeaderboardNetworkCall();
      }

    } else {
      this.showAlertBox(AppConstants.NO_ACCESS_PERMISSION + " Leaderboard")
    }
  }



  createRequestBodyandValidations() {
    this.requestParameters['name'] = this.name;
    this.requestParameters['stakeWise'] = !(this.stakeWise == "false");
    this.requestParameters['ruleType'] = this.leaderboardRuleType;
    this.requestParameters['type'] = this.leaderboardType;
    this.requestParameters['minEntryfee'] = parseFloat(this.minEntryfee);
    this.requestParameters['maxEntryFee'] = parseFloat(this.maxEntryFee);
    this.requestParameters['minValue'] = parseFloat(this.minValue);
    this.requestParameters['lockedPrizePool'] = parseFloat(this.lockedPrizePool);
    this.requestParameters['promoPrizePool'] = parseFloat(this.promoPrizePool);
    this.requestParameters['depositPrizePool'] = parseFloat(this.depositPrizePool);
    this.requestParameters['withdrawalPrizePool'] = parseFloat(this.withdrawalPrizePool);
    this.requestParameters['termsAndConditions'] = this.termsAndConditions;
    this.requestParameters['aboutLeaderboard'] = this.aboutLeaderboard;


    if (this.leaderboardType == LeaderboardType.HOURLY) {
      this.showTime = true;
      this.requestParameters['startTime'] = AppConstants.getTimestamp(this.startDate.toString() + " " + this.startTime.toString());
      this.requestParameters['endTime'] = AppConstants.getTimestamp(this.endDate.toString() + " " + this.endTime.toString());
    } else {
      this.showTime = false;
      this.startTime = AppConstants.DEFAULT_BASE_TIME;
      this.endTime = AppConstants.DEFAULT_BASE_TIME;
      this.requestParameters['startTime'] = AppConstants.getTimestamp(this.startDate.toString() + " " + this.startTime.toString());
      this.requestParameters['endTime'] = AppConstants.getTimestamp(this.endDate.toString() + " " + this.endTime.toString());
    }


    if ((this.userId1 != "" && this.userId1 != null) && (this.score1 != "" && this.score1 != null) && (this.scheduledPoints1 != "" && this.scheduledPoints1 != null)
      && (this.username1 != "" && this.username1 != null) && (this.avatar1 != "" && this.avatar1 != null)) {
      this.usersData.push({ userId: this.userId1.toString(), score: parseFloat(this.score1), scheduledPoints: parseFloat(this.scheduledPoints1), username: this.username1, avatar: this.avatar1 });
    } else if ((this.userId1 == "") && (this.score1 == "") && (this.scheduledPoints1 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 1');
      return
    }

    if ((this.userId2 != "" && this.userId2 != null) && (this.score2 != "" && this.score2 != null) && (this.scheduledPoints2 != "" && this.scheduledPoints2 != null)
      && (this.username2 != "" && this.username2 != null) && (this.avatar2 != "" && this.avatar2 != null)) {
      this.usersData.push({ userId: this.userId2, score: parseFloat(this.score2), scheduledPoints: parseFloat(this.scheduledPoints2), username: this.username2, avatar: this.avatar2 });
    } else if ((this.userId2 == "") && (this.score2 == "") && (this.scheduledPoints2 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 2');
      return
    }

    if ((this.userId3 != "" && this.userId3 != null) && (this.score3 != "" && this.score3 != null) && (this.scheduledPoints3 != "" && this.scheduledPoints3 != null)
      && (this.username3 != "" && this.username3 != null) && (this.avatar3 != "" && this.avatar3 != null)) {
      this.usersData.push({ userId: this.userId3, score: parseFloat(this.score3), scheduledPoints: parseFloat(this.scheduledPoints3), username: this.username3, avatar: this.avatar3 });
    } else if ((this.userId3 == "") && (this.score3 == "") && (this.scheduledPoints3 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 3');
      return
    }

    if ((this.userId4 != "" && this.userId4 != null) && (this.score4 != "" && this.score4 != null) && (this.scheduledPoints4 != "" && this.scheduledPoints4 != null)
      && (this.username4 != "" && this.username4 != null) && (this.avatar4 != "" && this.avatar4 != null)) {
      this.usersData.push({ userId: this.userId4, score: parseFloat(this.score4), scheduledPoints: parseFloat(this.scheduledPoints4), username: this.username4, avatar: this.avatar4 });
    } else if ((this.userId4 == "") && (this.score4 == "") && (this.scheduledPoints4 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 4');
      return
    }
    if ((this.userId5 != "" && this.userId5 != null) && (this.score5 != "" && this.score5 != null) && (this.scheduledPoints5 != "" && this.scheduledPoints5 != null)
      && (this.username5 != "" && this.username5 != null) && (this.avatar5 != "" && this.avatar5 != null)) {
      this.usersData.push({ userId: this.userId5, score: parseFloat(this.score5), scheduledPoints: parseFloat(this.scheduledPoints5), username: this.username5, avatar: this.avatar5 });
    } else if ((this.userId5 == "") && (this.score5 == "") && (this.scheduledPoints5 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 5');
      return
    }

    if ((this.userId6 != "" && this.userId6 != null) && (this.score6 != "" && this.score6 != null) && (this.scheduledPoints6 != "" && this.scheduledPoints6 != null)
      && (this.username6 != "" && this.username6 != null) && (this.avatar6 != "" && this.avatar6 != null)) {
      this.usersData.push({ userId: this.userId6.toString(), score: parseFloat(this.score6), scheduledPoints: parseFloat(this.scheduledPoints6), username: this.username6, avatar: this.avatar6 });
    } else if ((this.userId6 == "") && (this.score6 == "") && (this.scheduledPoints6 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 6');
      return
    }

    if ((this.userId7 != "" && this.userId7 != null) && (this.score7 != "" && this.score7 != null) && (this.scheduledPoints7 != "" && this.scheduledPoints7 != null)
      && (this.username7 != "" && this.username7 != null) && (this.avatar7 != "" && this.avatar7 != null)) {
      this.usersData.push({ userId: this.userId7, score: parseFloat(this.score7), scheduledPoints: parseFloat(this.scheduledPoints7), username: this.username7, avatar: this.avatar7 });
    } else if ((this.userId7 == "") && (this.score7 == "") && (this.scheduledPoints7 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 7');
      return
    }

    if ((this.userId8 != "" && this.userId8 != null) && (this.score8 != "" && this.score8 != null) && (this.scheduledPoints8 != "" && this.scheduledPoints8 != null)
      && (this.username8 != "" && this.username8 != null) && (this.avatar8 != "" && this.avatar8 != null)) {
      this.usersData.push({ userId: this.userId8, score: parseFloat(this.score8), scheduledPoints: parseFloat(this.scheduledPoints8), username: this.username8, avatar: this.avatar8 });
    } else if ((this.userId8 == "") && (this.score8 == "") && (this.scheduledPoints8 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 8');
      return
    }

    if ((this.userId9 != "" && this.userId9 != null) && (this.score9 != "" && this.score9 != null) && (this.scheduledPoints9 != "" && this.scheduledPoints9 != null)
      && (this.username9 != "" && this.username9 != null) && (this.avatar9 != "" && this.avatar9 != null)) {
      this.usersData.push({ userId: this.userId9, score: parseFloat(this.score9), scheduledPoints: parseFloat(this.scheduledPoints9), username: this.username9, avatar: this.avatar9 });
    } else if ((this.userId9 == "") && (this.score9 == "") && (this.scheduledPoints9 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 9');
      return
    }

    if ((this.userId10 != "" && this.userId10 != null) && (this.score10 != "" && this.score10 != null) && (this.scheduledPoints10 != "" && this.scheduledPoints10 != null)
      && (this.username10 != "" && this.username10 != null) && (this.avatar10 != "" && this.avatar10 != null)) {
      this.usersData.push({ userId: this.userId10, score: parseFloat(this.score10), scheduledPoints: parseFloat(this.scheduledPoints10), username: this.username10, avatar: this.avatar10 });
    } else if ((this.userId10 == "") && (this.score10 == "") && (this.scheduledPoints10 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 10');
      return
    }

    if ((this.userId11 != "" && this.userId11 != null) && (this.score11 != "" && this.score11 != null) && (this.scheduledPoints11 != "" && this.scheduledPoints11 != null)
      && (this.username11 != "" && this.username11 != null) && (this.avatar11 != "" && this.avatar11 != null)) {
      this.usersData.push({ userId: this.userId11.toString(), score: parseFloat(this.score11), scheduledPoints: parseFloat(this.scheduledPoints11), username: this.username11, avatar: this.avatar11 });
    } else if ((this.userId11 == "") && (this.score11 == "") && (this.scheduledPoints11 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 11');
      return
    }

    if ((this.userId12 != "" && this.userId12 != null) && (this.score12 != "" && this.score12 != null) && (this.scheduledPoints12 != "" && this.scheduledPoints12 != null)
      && (this.username12 != "" && this.username12 != null) && (this.avatar12 != "" && this.avatar12 != null)) {
      this.usersData.push({ userId: this.userId12, score: parseFloat(this.score12), scheduledPoints: parseFloat(this.scheduledPoints12), username: this.username12, avatar: this.avatar12 });
    } else if ((this.userId12 == "") && (this.score12 == "") && (this.scheduledPoints12 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 12');
      return
    }

    if ((this.userId13 != "" && this.userId13 != null) && (this.score13 != "" && this.score13 != null) && (this.scheduledPoints13 != "" && this.scheduledPoints13 != null)
      && (this.username13 != "" && this.username13 != null) && (this.avatar13 != "" && this.avatar13 != null)) {
      this.usersData.push({ userId: this.userId13, score: parseFloat(this.score13), scheduledPoints: parseFloat(this.scheduledPoints13), username: this.username13, avatar: this.avatar13 });
    } else if ((this.userId13 == "") && (this.score13 == "") && (this.scheduledPoints13 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 13');
      return
    }

    if ((this.userId14 != "" && this.userId14 != null) && (this.score14 != "" && this.score14 != null) && (this.scheduledPoints14 != "" && this.scheduledPoints14 != null)
      && (this.username14 != "" && this.username14 != null) && (this.avatar14 != "" && this.avatar14 != null)) {
      this.usersData.push({ userId: this.userId14, score: parseFloat(this.score14), scheduledPoints: parseFloat(this.scheduledPoints14), username: this.username14, avatar: this.avatar14 });
    } else if ((this.userId14 == "") && (this.score14 == "") && (this.scheduledPoints14 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 14');
      return
    }

    if ((this.userId15 != "" && this.userId15 != null) && (this.score15 != "" && this.score15 != null) && (this.scheduledPoints15 != "" && this.scheduledPoints15 != null)
      && (this.username15 != "" && this.username15 != null) && (this.avatar15 != "" && this.avatar15 != null)) {
      this.usersData.push({ userId: this.userId15, score: parseFloat(this.score15), scheduledPoints: parseFloat(this.scheduledPoints15), username: this.username15, avatar: this.avatar15 });
    } else if ((this.userId15 == "") && (this.score15 == "") && (this.scheduledPoints15 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 15');
      return
    }

    if ((this.userId16 != "" && this.userId16 != null) && (this.score16 != "" && this.score16 != null) && (this.scheduledPoints16 != "" && this.scheduledPoints16 != null)
      && (this.username16 != "" && this.username16 != null) && (this.avatar16 != "" && this.avatar16 != null)) {
      this.usersData.push({ userId: this.userId16.toString(), score: parseFloat(this.score16), scheduledPoints: parseFloat(this.scheduledPoints16), username: this.username16, avatar: this.avatar16 });
    } else if ((this.userId16 == "") && (this.score16 == "") && (this.scheduledPoints16 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 16');
      return
    }

    if ((this.userId17 != "" && this.userId17 != null) && (this.score17 != "" && this.score17 != null) && (this.scheduledPoints17 != "" && this.scheduledPoints17 != null)
      && (this.username17 != "" && this.username17 != null) && (this.avatar17 != "" && this.avatar17 != null)) {
      this.usersData.push({ userId: this.userId17, score: parseFloat(this.score17), scheduledPoints: parseFloat(this.scheduledPoints17), username: this.username17, avatar: this.avatar17 });
    } else if ((this.userId17 == "") && (this.score17 == "") && (this.scheduledPoints17 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 17');
      return
    }

    if ((this.userId18 != "" && this.userId18 != null) && (this.score18 != "" && this.score18 != null) && (this.scheduledPoints18 != "" && this.scheduledPoints18 != null)
      && (this.username18 != "" && this.username18 != null) && (this.avatar18 != "" && this.avatar18 != null)) {
      this.usersData.push({ userId: this.userId18, score: parseFloat(this.score18), scheduledPoints: parseFloat(this.scheduledPoints18), username: this.username18, avatar: this.avatar18 });
    } else if ((this.userId18 == "") && (this.score18 == "") && (this.scheduledPoints18 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 18');
      return
    }

    if ((this.userId19 != "" && this.userId19 != null) && (this.score19 != "" && this.score19 != null) && (this.scheduledPoints19 != "" && this.scheduledPoints19 != null)
      && (this.username19 != "" && this.username19 != null) && (this.avatar19 != "" && this.avatar19 != null)) {
      this.usersData.push({ userId: this.userId19, score: parseFloat(this.score19), scheduledPoints: parseFloat(this.scheduledPoints19), username: this.username19, avatar: this.avatar19 });
    } else if ((this.userId19 == "") && (this.score19 == "") && (this.scheduledPoints19 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 19');
      return
    }
    if ((this.userId20 != "" && this.userId20 != null) && (this.score20 != "" && this.score20 != null) && (this.scheduledPoints20 != "" && this.scheduledPoints20 != null)
      && (this.username20 != "" && this.username20 != null) && (this.avatar20 != "" && this.avatar20 != null)) {
      this.usersData.push({ userId: this.userId20, score: parseFloat(this.score20), scheduledPoints: parseFloat(this.scheduledPoints20), username: this.username20, avatar: this.avatar20 });
    } else if ((this.userId20 == "") && (this.score20 == "") && (this.scheduledPoints20 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 20');
      return
    }

    var numbers = /^\d+(-\d+)/;

    if ((this.rank1 != "" && this.rank1 != null) && (this.promoPercent1 != "" && this.promoPercent1 != null) && (this.lockedPercent1 != "" && this.lockedPercent1 != null)
      && (this.depositPercent1 != "" && this.withdrawalPercent2 != null) && (this.rank1.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank1, promoPercent: parseFloat(this.promoPercent1), lockedPercent: parseFloat(this.lockedPercent1), depositPercent: parseFloat(this.depositPercent1), withdrawalPercent: parseFloat(this.withdrawalPercent1) });

    } else if ((this.rank1 == "") && (this.promoPercent1 == "") && (this.lockedPercent1 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 1  & enter in (1-1 or 1-10) format');
      return
    }


    if ((this.rank2 != "" && this.rank2 != null) && (this.promoPercent2 != "" && this.promoPercent2 != null) && (this.lockedPercent2 != "" && this.lockedPercent2 != null)
      && (this.depositPercent2 != "" && this.withdrawalPercent2 != null) && (this.rank2.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank2, promoPercent: parseFloat(this.promoPercent2), lockedPercent: parseFloat(this.lockedPercent2), depositPercent: parseFloat(this.depositPercent2), withdrawalPercent: parseFloat(this.withdrawalPercent2) });
    } else if ((this.rank2 == "") && (this.promoPercent2 == "") && (this.lockedPercent2 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 2  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank3 != "" && this.rank3 != null) && (this.promoPercent3 != "" && this.promoPercent3 != null) && (this.lockedPercent3 != "" && this.lockedPercent3 != null)
      && (this.depositPercent3 != "" && this.withdrawalPercent3 != null) && (this.rank3.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank3, promoPercent: parseFloat(this.promoPercent3), lockedPercent: parseFloat(this.lockedPercent3), depositPercent: parseFloat(this.depositPercent3), withdrawalPercent: parseFloat(this.withdrawalPercent3) });
    } else if ((this.rank3 == "") && (this.promoPercent3 == "") && (this.lockedPercent3 == "")) {
      this.showAlertBox('Enter all the fields for rank 3  & enter in (1-1 or 1-10) format');

    } else {
      return
    }
    if ((this.rank4 != "" && this.rank4 != null) && (this.promoPercent4 != "" && this.promoPercent4 != null) && (this.lockedPercent4 != "" && this.lockedPercent4 != null)
      && (this.depositPercent4 != "" && this.withdrawalPercent4 != null) && (this.rank4.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank4, promoPercent: parseFloat(this.promoPercent4), lockedPercent: parseFloat(this.lockedPercent4), depositPercent: parseFloat(this.depositPercent4), withdrawalPercent: parseFloat(this.withdrawalPercent4) });
    } else if ((this.rank4 == "") && (this.promoPercent4 == "") && (this.lockedPercent4 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 4  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank5 != "" && this.rank5 != null) && (this.promoPercent5 != "" && this.promoPercent5 != null) && (this.lockedPercent5 != "" && this.lockedPercent5 != null)
      && (this.depositPercent5 != "" && this.withdrawalPercent5 != null) && (this.rank5.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank5, promoPercent: parseFloat(this.promoPercent5), lockedPercent: parseFloat(this.lockedPercent5), depositPercent: parseFloat(this.depositPercent5), withdrawalPercent: parseFloat(this.withdrawalPercent5) });
    } else if ((this.rank5 == "") && (this.promoPercent5 == "") && (this.lockedPercent5 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 5  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank6 != "" && this.rank6 != null) && (this.promoPercent6 != "" && this.promoPercent6 != null) && (this.lockedPercent6 != "" && this.lockedPercent6 != null)
      && (this.depositPercent6 != "" && this.withdrawalPercent6 != null) && (this.rank6.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank6, promoPercent: parseFloat(this.promoPercent6), lockedPercent: parseFloat(this.lockedPercent6), depositPercent: parseFloat(this.depositPercent6), withdrawalPercent: parseFloat(this.withdrawalPercent6) });
    } else if ((this.rank6 == "") && (this.promoPercent6 == "") && (this.lockedPercent6 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 6  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank7 != "" && this.rank7 != null) && (this.promoPercent7 != "" && this.promoPercent7 != null) && (this.lockedPercent7 != "" && this.lockedPercent7 != null)
      && (this.depositPercent7 != "" && this.withdrawalPercent7 != null) && (this.rank7.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank7, promoPercent: parseFloat(this.promoPercent7), lockedPercent: parseFloat(this.lockedPercent7), depositPercent: parseFloat(this.depositPercent7), withdrawalPercent: parseFloat(this.withdrawalPercent7) });
    } else if ((this.rank7 == "") && (this.promoPercent7 == "") && (this.lockedPercent7 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 7  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank8 != "" && this.rank8 != null) && (this.promoPercent8 != "" && this.promoPercent8 != null) && (this.lockedPercent8 != "" && this.lockedPercent8 != null)
      && (this.depositPercent8 != "" && this.withdrawalPercent8 != null) && (this.rank8.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank8, promoPercent: parseFloat(this.promoPercent8), lockedPercent: parseFloat(this.lockedPercent8), depositPercent: parseFloat(this.depositPercent8), withdrawalPercent: parseFloat(this.withdrawalPercent8) });
    } else if ((this.rank8 == "") && (this.promoPercent8 == "") && (this.lockedPercent8 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 8  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank9 != "" && this.rank9 != null) && (this.promoPercent9 != "" && this.promoPercent9 != null) && (this.lockedPercent9 != "" && this.lockedPercent9 != null)
      && (this.depositPercent9 != "" && this.withdrawalPercent9 != null) && (this.rank9.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank9, promoPercent: parseFloat(this.promoPercent9), lockedPercent: parseFloat(this.lockedPercent9), depositPercent: parseFloat(this.depositPercent9), withdrawalPercent: parseFloat(this.withdrawalPercent9) });
    } else if ((this.rank9 == "") && (this.promoPercent9 == "") && (this.lockedPercent9 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 9  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank10 != "" && this.rank10 != null) && (this.promoPercent10 != "" && this.promoPercent10 != null) && (this.lockedPercent10 != "" && this.lockedPercent10 != null)
      && (this.depositPercent10 != "" && this.withdrawalPercent10 != null) && (this.rank10.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank10, promoPercent: parseFloat(this.promoPercent10), lockedPercent: parseFloat(this.lockedPercent10), depositPercent: parseFloat(this.depositPercent10), withdrawalPercent: parseFloat(this.withdrawalPercent10) });
    } else if ((this.rank10 == "") && (this.promoPercent10 == "") && (this.lockedPercent10 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 10  & enter in (1-1 or 1-10) format');

      return
    }

    if ((this.rank11 != "" && this.rank11 != null) && (this.promoPercent11 != "" && this.promoPercent11 != null) && (this.lockedPercent11 != "" && this.lockedPercent11 != null)
      && (this.depositPercent11 != "" && this.withdrawalPercent2 != null) && (this.rank11.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank11, promoPercent: parseFloat(this.promoPercent11), lockedPercent: parseFloat(this.lockedPercent11), depositPercent: parseFloat(this.depositPercent11), withdrawalPercent: parseFloat(this.withdrawalPercent11) });

    } else if ((this.rank11 == "") && (this.promoPercent11 == "") && (this.lockedPercent11 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 11  & enter in (1-1 or 1-10) format');
      return
    }


    if ((this.rank12 != "" && this.rank12 != null) && (this.promoPercent12 != "" && this.promoPercent12 != null) && (this.lockedPercent12 != "" && this.lockedPercent12 != null)
      && (this.depositPercent12 != "" && this.withdrawalPercent12 != null) && (this.rank12.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank12, promoPercent: parseFloat(this.promoPercent12), lockedPercent: parseFloat(this.lockedPercent12), depositPercent: parseFloat(this.depositPercent12), withdrawalPercent: parseFloat(this.withdrawalPercent12) });
    } else if ((this.rank12 == "") && (this.promoPercent12 == "") && (this.lockedPercent12 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 12  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank13 != "" && this.rank13 != null) && (this.promoPercent13 != "" && this.promoPercent13 != null) && (this.lockedPercent13 != "" && this.lockedPercent13 != null)
      && (this.depositPercent13 != "" && this.withdrawalPercent13 != null) && (this.rank13.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank13, promoPercent: parseFloat(this.promoPercent13), lockedPercent: parseFloat(this.lockedPercent13), depositPercent: parseFloat(this.depositPercent13), withdrawalPercent: parseFloat(this.withdrawalPercent13) });
    } else if ((this.rank13 == "") && (this.promoPercent13 == "") && (this.lockedPercent13 == "")) {
      this.showAlertBox('Enter all the fields for rank 13  & enter in (1-1 or 1-10) format');

    } else {
      return
    }
    if ((this.rank14 != "" && this.rank14 != null) && (this.promoPercent14 != "" && this.promoPercent14 != null) && (this.lockedPercent14 != "" && this.lockedPercent14 != null)
      && (this.depositPercent14 != "" && this.withdrawalPercent14 != null) && (this.rank14.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank14, promoPercent: parseFloat(this.promoPercent14), lockedPercent: parseFloat(this.lockedPercent14), depositPercent: parseFloat(this.depositPercent14), withdrawalPercent: parseFloat(this.withdrawalPercent14) });
    } else if ((this.rank14 == "") && (this.promoPercent14 == "") && (this.lockedPercent14 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 14  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank15 != "" && this.rank15 != null) && (this.promoPercent15 != "" && this.promoPercent15 != null) && (this.lockedPercent15 != "" && this.lockedPercent15 != null)
      && (this.depositPercent15 != "" && this.withdrawalPercent15 != null) && (this.rank15.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank15, promoPercent: parseFloat(this.promoPercent15), lockedPercent: parseFloat(this.lockedPercent15), depositPercent: parseFloat(this.depositPercent15), withdrawalPercent: parseFloat(this.withdrawalPercent15) });
    } else if ((this.rank15 == "") && (this.promoPercent15 == "") && (this.lockedPercent15 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 15  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank16 != "" && this.rank16 != null) && (this.promoPercent16 != "" && this.promoPercent16 != null) && (this.lockedPercent16 != "" && this.lockedPercent16 != null)
      && (this.depositPercent16 != "" && this.withdrawalPercent16 != null) && (this.rank16.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank16, promoPercent: parseFloat(this.promoPercent16), lockedPercent: parseFloat(this.lockedPercent16), depositPercent: parseFloat(this.depositPercent16), withdrawalPercent: parseFloat(this.withdrawalPercent16) });
    } else if ((this.rank16 == "") && (this.promoPercent16 == "") && (this.lockedPercent16 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 16  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank17 != "" && this.rank17 != null) && (this.promoPercent17 != "" && this.promoPercent17 != null) && (this.lockedPercent17 != "" && this.lockedPercent17 != null)
      && (this.depositPercent17 != "" && this.withdrawalPercent17 != null) && (this.rank17.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank17, promoPercent: parseFloat(this.promoPercent17), lockedPercent: parseFloat(this.lockedPercent17), depositPercent: parseFloat(this.depositPercent17), withdrawalPercent: parseFloat(this.withdrawalPercent17) });
    } else if ((this.rank17 == "") && (this.promoPercent17 == "") && (this.lockedPercent17 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 17  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank18 != "" && this.rank18 != null) && (this.promoPercent18 != "" && this.promoPercent18 != null) && (this.lockedPercent18 != "" && this.lockedPercent18 != null)
      && (this.depositPercent18 != "" && this.withdrawalPercent18 != null) && (this.rank18.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank18, promoPercent: parseFloat(this.promoPercent18), lockedPercent: parseFloat(this.lockedPercent18), depositPercent: parseFloat(this.depositPercent18), withdrawalPercent: parseFloat(this.withdrawalPercent18) });
    } else if ((this.rank18 == "") && (this.promoPercent18 == "") && (this.lockedPercent18 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 18  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank19 != "" && this.rank19 != null) && (this.promoPercent19 != "" && this.promoPercent19 != null) && (this.lockedPercent19 != "" && this.lockedPercent19 != null)
      && (this.depositPercent19 != "" && this.withdrawalPercent19 != null) && (this.rank19.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank19, promoPercent: parseFloat(this.promoPercent19), lockedPercent: parseFloat(this.lockedPercent19), depositPercent: parseFloat(this.depositPercent19), withdrawalPercent: parseFloat(this.withdrawalPercent19) });
    } else if ((this.rank19 == "") && (this.promoPercent19 == "") && (this.lockedPercent19 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 19  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank20 != "" && this.rank20 != null) && (this.promoPercent20 != "" && this.promoPercent20 != null) && (this.lockedPercent20 != "" && this.lockedPercent20 != null)
      && (this.depositPercent20 != "" && this.withdrawalPercent20 != null) && (this.rank20.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank20, promoPercent: parseFloat(this.promoPercent20), lockedPercent: parseFloat(this.lockedPercent20), depositPercent: parseFloat(this.depositPercent20), withdrawalPercent: parseFloat(this.withdrawalPercent20) });
    } else if ((this.rank20 == "") && (this.promoPercent20 == "") && (this.lockedPercent20 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 20  & enter in (1-1 or 1-10) format');

      return
    }

    if ((this.rank21 != "" && this.rank21 != null) && (this.promoPercent21 != "" && this.promoPercent21 != null) && (this.lockedPercent21 != "" && this.lockedPercent21 != null)
      && (this.depositPercent21 != "" && this.withdrawalPercent2 != null) && (this.rank21.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank21, promoPercent: parseFloat(this.promoPercent21), lockedPercent: parseFloat(this.lockedPercent21), depositPercent: parseFloat(this.depositPercent21), withdrawalPercent: parseFloat(this.withdrawalPercent21) });

    } else if ((this.rank21 == "") && (this.promoPercent21 == "") && (this.lockedPercent21 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 21  & enter in (1-1 or 1-10) format');
      return
    }


    if ((this.rank22 != "" && this.rank22 != null) && (this.promoPercent22 != "" && this.promoPercent22 != null) && (this.lockedPercent22 != "" && this.lockedPercent22 != null)
      && (this.depositPercent22 != "" && this.withdrawalPercent22 != null) && (this.rank22.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank22, promoPercent: parseFloat(this.promoPercent22), lockedPercent: parseFloat(this.lockedPercent22), depositPercent: parseFloat(this.depositPercent22), withdrawalPercent: parseFloat(this.withdrawalPercent22) });
    } else if ((this.rank22 == "") && (this.promoPercent22 == "") && (this.lockedPercent22 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 22  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank23 != "" && this.rank23 != null) && (this.promoPercent23 != "" && this.promoPercent23 != null) && (this.lockedPercent23 != "" && this.lockedPercent23 != null)
      && (this.depositPercent23 != "" && this.withdrawalPercent23 != null) && (this.rank23.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank23, promoPercent: parseFloat(this.promoPercent23), lockedPercent: parseFloat(this.lockedPercent23), depositPercent: parseFloat(this.depositPercent23), withdrawalPercent: parseFloat(this.withdrawalPercent23) });
    } else if ((this.rank23 == "") && (this.promoPercent23 == "") && (this.lockedPercent23 == "")) {
      this.showAlertBox('Enter all the fields for rank 23  & enter in (1-1 or 1-10) format');

    } else {
      return
    }
    if ((this.rank24 != "" && this.rank24 != null) && (this.promoPercent24 != "" && this.promoPercent24 != null) && (this.lockedPercent24 != "" && this.lockedPercent24 != null)
      && (this.depositPercent24 != "" && this.withdrawalPercent24 != null) && (this.rank24.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank24, promoPercent: parseFloat(this.promoPercent24rank24), lockedPercent: parseFloat(this.lockedPercent24), depositPercent: parseFloat(this.depositPercent24), withdrawalPercent: parseFloat(this.withdrawalPercent24) });
    } else if ((this.rank24 == "") && (this.promoPercent24 == "") && (this.lockedPercent24 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank24  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank25 != "" && this.rank25 != null) && (this.promoPercent25 != "" && this.promoPercent25 != null) && (this.lockedPercent25 != "" && this.lockedPercent25 != null)
      && (this.depositPercent25 != "" && this.withdrawalPercent25 != null) && (this.rank25.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank25, promoPercent: parseFloat(this.promoPercent25), lockedPercent: parseFloat(this.lockedPercent25), depositPercent: parseFloat(this.depositPercent25), withdrawalPercent: parseFloat(this.withdrawalPercent25) });
    } else if ((this.rank25 == "") && (this.promoPercent25 == "") && (this.lockedPercent25 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 25  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank26 != "" && this.rank26 != null) && (this.promoPercent26 != "" && this.promoPercent26 != null) && (this.lockedPercent26 != "" && this.lockedPercent26 != null)
      && (this.depositPercent26 != "" && this.withdrawalPercent26 != null) && (this.rank26.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank26, promoPercent: parseFloat(this.promoPercent26), lockedPercent: parseFloat(this.lockedPercent26), depositPercent: parseFloat(this.depositPercent26), withdrawalPercent: parseFloat(this.withdrawalPercent26) });
    } else if ((this.rank26 == "") && (this.promoPercent26 == "") && (this.lockedPercent26 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 26  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank27 != "" && this.rank27 != null) && (this.promoPercent27 != "" && this.promoPercent27 != null) && (this.lockedPercent27 != "" && this.lockedPercent27 != null)
      && (this.depositPercent27 != "" && this.withdrawalPercent27 != null) && (this.rank27.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank27, promoPercent: parseFloat(this.promoPercent27), lockedPercent: parseFloat(this.lockedPercent27), depositPercent: parseFloat(this.depositPercent27), withdrawalPercent: parseFloat(this.withdrawalPercent27) });
    } else if ((this.rank27 == "") && (this.promoPercent27 == "") && (this.lockedPercent27 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 27  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank28 != "" && this.rank28 != null) && (this.promoPercent28 != "" && this.promoPercent28 != null) && (this.lockedPercent28 != "" && this.lockedPercent28 != null)
      && (this.depositPercent28 != "" && this.withdrawalPercent28 != null) && (this.rank28.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank28, promoPercent: parseFloat(this.promoPercent28), lockedPercent: parseFloat(this.lockedPercent28), depositPercent: parseFloat(this.depositPercent28), withdrawalPercent: parseFloat(this.withdrawalPercent28) });
    } else if ((this.rank28 == "") && (this.promoPercent28 == "") && (this.lockedPercent28 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 28  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank29 != "" && this.rank29 != null) && (this.promoPercent29 != "" && this.promoPercent29 != null) && (this.lockedPercent29 != "" && this.lockedPercent29 != null)
      && (this.depositPercent29 != "" && this.withdrawalPercent29 != null) && (this.rank29.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank29, promoPercent: parseFloat(this.promoPercent29), lockedPercent: parseFloat(this.lockedPercent29), depositPercent: parseFloat(this.depositPercent29), withdrawalPercent: parseFloat(this.withdrawalPercent29) });
    } else if ((this.rank29 == "") && (this.promoPercent29 == "") && (this.lockedPercent29 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 29  & enter in (1-1 or 1-10) format');

      return
    }
    if ((this.rank30 != "" && this.rank30 != null) && (this.promoPercent30 != "" && this.promoPercent30 != null) && (this.lockedPercent30 != "" && this.lockedPercent30 != null)
      && (this.depositPercent30 != "" && this.withdrawalPercent30 != null) && (this.rank30.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank30, promoPercent: parseFloat(this.promoPercent30), lockedPercent: parseFloat(this.lockedPercent30), depositPercent: parseFloat(this.depositPercent30), withdrawalPercent: parseFloat(this.withdrawalPercent30) });
    } else if ((this.rank30 == "") && (this.promoPercent30 == "") && (this.lockedPercent30 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 30  & enter in (1-1 or 1-10) format');

      return
    }

    /**Validation end here for array */

    if (this.leaderboardRuleType == LeaderboardRuleType.HIGHEST_SCORE) {

      if (this.checkedGamesList.length == this.worklooperGameLength) {
        this.requestParameters['games'] = [this.all];
      } else {
        this.requestParameters['games'] = this.checkedGamesList;
      }
    } else {
      if (this.checkedGamesList.length == this.allGameLength) {
        this.requestParameters['games'] = [this.all];
      } else {
        this.requestParameters['games'] = this.checkedGamesList;
      }
    }
    this.requestParameters['prizeDetails'] = this.prizeDetailsData;
    this.requestParameters['users'] = this.usersData;
  }

  createLeaderboardNetworkCall() {
    this.createRequestBodyandValidations();
    if (this.validateLeaderboard()) {

      this.spinnerService.show();
      this.leaderboardService.createLeaderboard(UrlConstant.createLeaderboardUrl, '', this.requestParameters, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          if (resData['result'] == Responses.SUCCESS) {
            this.closeCreateLeaderboard();
            this.showAlert("Leaderboard created successfully.");
            this.getLeaderboardDetails();
            this.initializeModelVariables();
          }
          else if (resData['result'] == Responses.LEADERBOARD_SERVICE_UNREACHABLE) {
            this.showAlert("LEADERBOARD_SERVICE_UNREACHABLE");
          }
          else if (resData['result'] == Responses.INVALID_REQUEST) {
            this.showAlert("Invalid Request");
          } else if (resData['result'] == Responses.DB_ERROR) {
            this.showAlert(ResponsesDescription.DB_ERROR);
          }
          else if (resData['result'] == Responses.INTERNAL_SERVER_ERROR) {
            this.showAlert(ResponsesDescription.INTERNAL_SERVER_ERROR)
          }
        },
          error => {
            this.showAlert("Bad Request, Check all missing field")
            this.spinnerService.hide();
          }
        );
    }
  }

  clonecreateLeaderboardNetworkCall() {
    this.clonecreateRequestBodyandValidations();
    if (this.validateLeaderboard()) {
      if (this.checkedGamesList.length > 0) {
        this.spinnerService.show();
        this.leaderboardService.createLeaderboard(UrlConstant.createLeaderboardUrl, '', this.requestParameters, this.ipAddress, this.userName, '' + Date.now())
          .subscribe(resData => {
            this.spinnerService.hide();
            if (resData['result'] == Responses.SUCCESS) {

              this.closeCloneLeaderboardDetails();
              this.showAlertBoxClone("Leaderboard created successfully.");
              this.getLeaderboardDetails();
              this.initializeModelVariables();
            } else if (resData['result'] == Responses.LEADERBOARD_SERVICE_UNREACHABLE) {
              this.showAlert("LEADERBOARD_SERVICE_UNREACHABLE");
            }
            else if (resData['result'] == Responses.INVALID_REQUEST) {
              this.showAlert("Invalid Request");
            } else if (resData['result'] == Responses.DB_ERROR) {
              this.showAlert(ResponsesDescription.DB_ERROR);
            }
            else if (resData['result'] == Responses.INTERNAL_SERVER_ERROR) {
              this.showAlert(ResponsesDescription.INTERNAL_SERVER_ERROR)
            }
          },
            error => {
              this.showAlert("Bad Request, Check all missing field")
              this.spinnerService.hide();
            }
          );
      }
      else {
        this.showAlert("Please select games")
      }
    }

  }

  clonecreateRequestBodyandValidations() {

    this.requestParameters['name'] = this.name;
    this.requestParameters['stakeWise'] = this.stakeWise;
    this.requestParameters['ruleType'] = this.leaderboardRuleType;
    this.requestParameters['type'] = this.leaderboardType;
    this.requestParameters['minEntryfee'] = parseFloat(this.minEntryfee);
    this.requestParameters['maxEntryFee'] = parseFloat(this.maxEntryFee);
    this.requestParameters['minValue'] = parseFloat(this.minValue);
    this.requestParameters['lockedPrizePool'] = parseFloat(this.lockedPrizePool);
    this.requestParameters['promoPrizePool'] = parseFloat(this.promoPrizePool);
    this.requestParameters['depositPrizePool'] = parseFloat(this.depositPrizePool);
    this.requestParameters['withdrawalPrizePool'] = parseFloat(this.withdrawalPrizePool);
    this.requestParameters['termsAndConditions'] = this.termsAndConditions;
    this.requestParameters['aboutLeaderboard'] = this.aboutLeaderboard;


    if (this.leaderboardType == LeaderboardType.HOURLY) {
      this.showTime = true;
      this.requestParameters['startTime'] = AppConstants.getTimestamp(this.startDate.toString() + " " + this.startTime.toString());
      this.requestParameters['endTime'] = AppConstants.getTimestamp(this.endDate.toString() + " " + this.endTime.toString());
    } else {
      this.showTime = false;
      this.startTime = AppConstants.DEFAULT_BASE_TIME;
      this.endTime = AppConstants.DEFAULT_BASE_TIME;
      this.requestParameters['startTime'] = AppConstants.getTimestamp(this.startDate.toString() + " " + this.startTime.toString());
      this.requestParameters['endTime'] = AppConstants.getTimestamp(this.endDate.toString() + " " + this.endTime.toString());
    }



    if ((this.userId1 != "" && this.userId1 != null) && (this.score1 != null) && (this.scheduledPoints1 != null)
      && (this.username1 != null) && (this.avatar1 != null)) {
      this.usersData.push({ userId: this.userId1.toString(), score: parseFloat(this.score1), scheduledPoints: parseFloat(this.scheduledPoints1), username: this.username1, avatar: this.avatar1 });
    } else if ((this.userId1 == "") && (this.score1 == "") && (this.scheduledPoints1 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 1');
      return
    }

    if ((this.userId2 != "" && this.userId2 != null) && (this.score2 != null) && (this.scheduledPoints2 != null)
      && (this.username2 != null) && (this.avatar2 != null)) {
      this.usersData.push({ userId: this.userId2, score: parseFloat(this.score2), scheduledPoints: parseFloat(this.scheduledPoints2), username: this.username2, avatar: this.avatar2 });
    } else if ((this.userId2 == "") && (this.score2 == "") && (this.scheduledPoints2 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 2');
      return
    }

    if ((this.userId3 != "" && this.userId3 != null) && (this.score3 != null) && (this.scheduledPoints3 != null)
      && (this.username3 != null) && (this.avatar3 != null)) {
      this.usersData.push({ userId: this.userId3, score: parseFloat(this.score3), scheduledPoints: parseFloat(this.scheduledPoints3), username: this.username3, avatar: this.avatar3 });
    } else if ((this.userId3 == "") && (this.score3 == "") && (this.scheduledPoints3 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 3');
      return
    }

    if ((this.userId4 != "" && this.userId4 != null) && (this.score4 != null) && (this.scheduledPoints4 != null)
      && (this.username4 != null) && (this.avatar4 != null)) {
      this.usersData.push({ userId: this.userId4, score: parseFloat(this.score4), scheduledPoints: parseFloat(this.scheduledPoints4), username: this.username4, avatar: this.avatar4 });
    } else if ((this.userId4 == "") && (this.score4 == "") && (this.scheduledPoints4 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 4');
      return
    }
    if ((this.userId5 != "" && this.userId5 != null) && (this.score5 != null) && (this.scheduledPoints5 != null)
      && (this.username5 != null) && (this.avatar5 != null)) {
      this.usersData.push({ userId: this.userId5, score: parseFloat(this.score5), scheduledPoints: parseFloat(this.scheduledPoints5), username: this.username5, avatar: this.avatar5 });
    } else if ((this.userId5 == "") && (this.score5 == "") && (this.scheduledPoints5 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 5');
      return
    }

    if ((this.userId6 != "" && this.userId6 != null) && (this.score6 != null) && (this.scheduledPoints6 != null)
      && (this.username6 != null) && (this.avatar6 != null)) {
      this.usersData.push({ userId: this.userId6.toString(), score: parseFloat(this.score6), scheduledPoints: parseFloat(this.scheduledPoints6), username: this.username6, avatar: this.avatar6 });
    } else if ((this.userId6 == "") && (this.score6 == "") && (this.scheduledPoints6 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 6');
      return
    }

    if ((this.userId7 != "" && this.userId7 != null) && (this.score7 != null) && (this.scheduledPoints7 != null)
      && (this.username7 != null) && (this.avatar7 != null)) {
      this.usersData.push({ userId: this.userId7, score: parseFloat(this.score7), scheduledPoints: parseFloat(this.scheduledPoints7), username: this.username7, avatar: this.avatar7 });
    } else if ((this.userId7 == "") && (this.score7 == "") && (this.scheduledPoints7 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 7');
      return
    }

    if ((this.userId8 != "" && this.userId8 != null) && (this.score8 != null) && (this.scheduledPoints8 != null)
      && (this.username8 != null) && (this.avatar8 != null)) {
      this.usersData.push({ userId: this.userId8, score: parseFloat(this.score8), scheduledPoints: parseFloat(this.scheduledPoints8), username: this.username8, avatar: this.avatar8 });
    } else if ((this.userId8 == "") && (this.score8 == "") && (this.scheduledPoints8 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 8');
      return
    }

    if ((this.userId9 != "" && this.userId9 != null) && (this.score9 != null) && (this.scheduledPoints9 != null)
      && (this.username9 != null) && (this.avatar9 != null)) {
      this.usersData.push({ userId: this.userId9, score: parseFloat(this.score9), scheduledPoints: parseFloat(this.scheduledPoints9), username: this.username9, avatar: this.avatar9 });
    } else if ((this.userId9 == "") && (this.score9 == "") && (this.scheduledPoints9 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 9');
      return
    }

    if ((this.userId10 != "" && this.userId10 != null) && (this.score10 != null) && (this.scheduledPoints10 != null)
      && (this.username10 != null) && (this.avatar10 != null)) {
      this.usersData.push({ userId: this.userId10, score: parseFloat(this.score10), scheduledPoints: parseFloat(this.scheduledPoints10), username: this.username10, avatar: this.avatar10 });
    } else if ((this.userId10 == "") && (this.score10 == "") && (this.scheduledPoints10 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 10');
      return
    }

    if ((this.userId11 != "" && this.userId11 != null) && (this.score11 != null) && (this.scheduledPoints11 != null)
      && (this.username11 != null) && (this.avatar11 != null)) {
      this.usersData.push({ userId: this.userId11.toString(), score: parseFloat(this.score11), scheduledPoints: parseFloat(this.scheduledPoints11), username: this.username11, avatar: this.avatar11 });
    } else if ((this.userId11 == "") && (this.score11 == "") && (this.scheduledPoints11 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 11');
      return
    }

    if ((this.userId12 != "" && this.userId12 != null) && (this.score12 != null) && (this.scheduledPoints12 != null)
      && (this.username12 != null) && (this.avatar12 != null)) {
      this.usersData.push({ userId: this.userId12, score: parseFloat(this.score12), scheduledPoints: parseFloat(this.scheduledPoints12), username: this.username12, avatar: this.avatar12 });
    } else if ((this.userId12 == "") && (this.score12 == "") && (this.scheduledPoints12 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 12');
      return
    }

    if ((this.userId13 != "" && this.userId13 != null) && (this.score13 != null) && (this.scheduledPoints13 != null)
      && (this.username13 != null) && (this.avatar13 != null)) {
      this.usersData.push({ userId: this.userId13, score: parseFloat(this.score13), scheduledPoints: parseFloat(this.scheduledPoints13), username: this.username13, avatar: this.avatar13 });
    } else if ((this.userId13 == "") && (this.score13 == "") && (this.scheduledPoints13 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 13');
      return
    }

    if ((this.userId14 != "" && this.userId14 != null) && (this.score14 != null) && (this.scheduledPoints14 != null)
      && (this.username14 != null) && (this.avatar14 != null)) {
      this.usersData.push({ userId: this.userId14, score: parseFloat(this.score14), scheduledPoints: parseFloat(this.scheduledPoints14), username: this.username14, avatar: this.avatar14 });
    } else if ((this.userId14 == "") && (this.score14 == "") && (this.scheduledPoints14 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 14');
      return
    }

    if ((this.userId15 != "" && this.userId15 != null) && (this.score15 != null) && (this.scheduledPoints15 != null)
      && (this.username15 != null) && (this.avatar15 != null)) {
      this.usersData.push({ userId: this.userId15, score: parseFloat(this.score15), scheduledPoints: parseFloat(this.scheduledPoints15), username: this.username15, avatar: this.avatar15 });
    } else if ((this.userId15 == "") && (this.score15 == "") && (this.scheduledPoints15 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 15');
      return
    }

    if ((this.userId16 != "" && this.userId16 != null) && (this.score16 != null) && (this.scheduledPoints16 != null)
      && (this.username16 != null) && (this.avatar16 != null)) {
      this.usersData.push({ userId: this.userId16.toString(), score: parseFloat(this.score16), scheduledPoints: parseFloat(this.scheduledPoints16), username: this.username16, avatar: this.avatar16 });
    } else if ((this.userId16 == "") && (this.score16 == "") && (this.scheduledPoints16 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 16');
      return
    }

    if ((this.userId17 != "" && this.userId17 != null) && (this.score17 != null) && (this.scheduledPoints17 != null)
      && (this.username17 != null) && (this.avatar17 != null)) {
      this.usersData.push({ userId: this.userId17, score: parseFloat(this.score17), scheduledPoints: parseFloat(this.scheduledPoints17), username: this.username17, avatar: this.avatar17 });
    } else if ((this.userId17 == "") && (this.score17 == "") && (this.scheduledPoints17 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 17');
      return
    }

    if ((this.userId18 != "" && this.userId18 != null) && (this.score18 != null) && (this.scheduledPoints18 != null)
      && (this.username18 != null) && (this.avatar18 != null)) {
      this.usersData.push({ userId: this.userId18, score: parseFloat(this.score18), scheduledPoints: parseFloat(this.scheduledPoints18), username: this.username18, avatar: this.avatar18 });
    } else if ((this.userId18 == "") && (this.score18 == "") && (this.scheduledPoints18 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 18');
      return
    }

    if ((this.userId19 != "" && this.userId19 != null) && (this.score19 != null) && (this.scheduledPoints19 != null)
      && (this.username19 != null) && (this.avatar19 != null)) {
      this.usersData.push({ userId: this.userId19, score: parseFloat(this.score19), scheduledPoints: parseFloat(this.scheduledPoints19), username: this.username19, avatar: this.avatar19 });
    } else if ((this.userId19 == "") && (this.score19 == "") && (this.scheduledPoints19 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 19');
      return
    }
    if ((this.userId20 != "" && this.userId20 != null) && (this.score20 != null) && (this.scheduledPoints20 != null)
      && (this.username20 != null) && (this.avatar20 != null)) {
      this.usersData.push({ userId: this.userId20, score: parseFloat(this.score20), scheduledPoints: parseFloat(this.scheduledPoints20), username: this.username20, avatar: this.avatar20 });
    } else if ((this.userId20 == "") && (this.score20 == "") && (this.scheduledPoints20 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this UserID 20');
      return
    }

    var numbers = /^\d+(-\d+)/;


    if ((this.rank1 != "" && this.rank1 != null) && (this.promoPercent1 != null) && (this.lockedPercent1 != null)
      && (this.withdrawalPercent1 != null) && (this.rank1.match(numbers))) {

      this.prizeDetailsData.push({ rank: this.rank1, promoPercent: parseFloat(this.promoPercent1), lockedPercent: parseFloat(this.lockedPercent1), depositPercent: parseFloat(this.depositPercent1), withdrawalPercent: parseFloat(this.withdrawalPercent1) });
    }
    else if ((this.rank1 != "" && this.rank1 != null) && (this.promoPercent1 != null) && (this.lockedPercent1 != null)
      && (this.withdrawalPercent1 != null)) {

      this.prizeDetailsData.push({ rank: this.rank1 + "-" + this.rank1, promoPercent: parseFloat(this.promoPercent1), lockedPercent: parseFloat(this.lockedPercent1), depositPercent: parseFloat(this.depositPercent1), withdrawalPercent: parseFloat(this.withdrawalPercent1) });
    }
    else if ((this.rank1 == "") && (this.promoPercent1 == "") && (this.lockedPercent1 == "")) {

    } else {
      this.showAlertBox('Enter all the fields for rank 1  & enter in (1-1 or 1-10) format');
      return
    }

    if ((this.rank2 != "" && this.rank2 != null) && (this.promoPercent2 != null) && (this.lockedPercent2 != null)
      && (this.withdrawalPercent2 != null) && (this.rank2.match(numbers))) {

      this.prizeDetailsData.push({ rank: this.rank2, promoPercent: parseFloat(this.promoPercent2), lockedPercent: parseFloat(this.lockedPercent2), depositPercent: parseFloat(this.depositPercent2), withdrawalPercent: parseFloat(this.withdrawalPercent2) });
    }
    else if ((this.rank2 != "" && this.rank2 != null) && (this.promoPercent2 != null) && (this.lockedPercent2 != null)
      && (this.withdrawalPercent2 != null)) {

      this.prizeDetailsData.push({ rank: this.rank2 + "-" + this.rank2, promoPercent: parseFloat(this.promoPercent2), lockedPercent: parseFloat(this.lockedPercent2), depositPercent: parseFloat(this.depositPercent2), withdrawalPercent: parseFloat(this.withdrawalPercent2) });
    }
    else if ((this.rank2 == "") && (this.promoPercent2 == "") && (this.lockedPercent2 == "")) {

    } else {
      this.showAlertBox('Enter all the fields for rank 2  & enter in (1-1 or 1-10) format');
      return
    }


    if ((this.rank3 != "" && this.rank3 != null) && (this.promoPercent3 != null) && (this.lockedPercent3 != null)
      && (this.withdrawalPercent3 != null) && (this.rank3.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank3, promoPercent: parseFloat(this.promoPercent3), lockedPercent: parseFloat(this.lockedPercent3), depositPercent: parseFloat(this.depositPercent3), withdrawalPercent: parseFloat(this.withdrawalPercent3) });
    }
    else if ((this.rank3 != "" && this.rank3 != null) && (this.promoPercent3 != null) && (this.lockedPercent3 != null)
      && (this.withdrawalPercent3 != null)) {

      this.prizeDetailsData.push({ rank: this.rank3 + "-" + this.rank3, promoPercent: parseFloat(this.promoPercent3), lockedPercent: parseFloat(this.lockedPercent3), depositPercent: parseFloat(this.depositPercent3), withdrawalPercent: parseFloat(this.withdrawalPercent3) });
    } else if ((this.rank3 == "") && (this.promoPercent3 == "") && (this.lockedPercent3 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 3  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank4 != "" && this.rank4 != null) && (this.promoPercent4 != null) && (this.lockedPercent4 != null)
      && (this.withdrawalPercent4 != null) && (this.rank4.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank4, promoPercent: parseFloat(this.promoPercent4), lockedPercent: parseFloat(this.lockedPercent4), depositPercent: parseFloat(this.depositPercent4), withdrawalPercent: parseFloat(this.withdrawalPercent4) });
    }
    else if ((this.rank4 != "" && this.rank4 != null) && (this.promoPercent4 != null) && (this.lockedPercent4 != null)
      && (this.withdrawalPercent4 != null)) {

      this.prizeDetailsData.push({ rank: this.rank4 + "-" + this.rank4, promoPercent: parseFloat(this.promoPercent4), lockedPercent: parseFloat(this.lockedPercent4), depositPercent: parseFloat(this.depositPercent4), withdrawalPercent: parseFloat(this.withdrawalPercent4) });
    } else if ((this.rank4 == "") && (this.promoPercent4 == "") && (this.lockedPercent4 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 4  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank5 != "" && this.rank5 != null) && (this.promoPercent5 != null) && (this.lockedPercent5 != null)
      && (this.withdrawalPercent5 != null) && (this.rank5.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank5, promoPercent: parseFloat(this.promoPercent5), lockedPercent: parseFloat(this.lockedPercent5), depositPercent: parseFloat(this.depositPercent5), withdrawalPercent: parseFloat(this.withdrawalPercent5) });
    } else if ((this.rank5 != "" && this.rank5 != null) && (this.promoPercent5 != null) && (this.lockedPercent5 != null)
      && (this.withdrawalPercent5 != null)) {

      this.prizeDetailsData.push({ rank: this.rank5 + "-" + this.rank5, promoPercent: parseFloat(this.promoPercent5), lockedPercent: parseFloat(this.lockedPercent5), depositPercent: parseFloat(this.depositPercent5), withdrawalPercent: parseFloat(this.withdrawalPercent5) });
    } else if ((this.rank5 == "") && (this.promoPercent5 == "") && (this.lockedPercent5 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 5  & enter in (1-1 or 1-10) format');
      return
    }

    if ((this.rank6 != "" && this.rank6 != null) && (this.promoPercent6 != null) && (this.lockedPercent6 != null)
      && (this.withdrawalPercent6 != null) && (this.rank6.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank6, promoPercent: parseFloat(this.promoPercent6), lockedPercent: parseFloat(this.lockedPercent6), depositPercent: parseFloat(this.depositPercent6), withdrawalPercent: parseFloat(this.withdrawalPercent6) });
    }
    else if ((this.rank6 != "" && this.rank6 != null) && (this.promoPercent6 != null) && (this.lockedPercent6 != null)
      && (this.withdrawalPercent6 != null)) {

      this.prizeDetailsData.push({ rank: this.rank6 + "-" + this.rank6, promoPercent: parseFloat(this.promoPercent6), lockedPercent: parseFloat(this.lockedPercent6), depositPercent: parseFloat(this.depositPercent6), withdrawalPercent: parseFloat(this.withdrawalPercent6) });
    } else if ((this.rank6 == "") && (this.promoPercent6 == "") && (this.lockedPercent6 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 6  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank7 != "" && this.rank7 != null) && (this.promoPercent7 != null) && (this.lockedPercent7 != null)
      && (this.withdrawalPercent7 != null) && (this.rank7.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank7, promoPercent: parseFloat(this.promoPercent7), lockedPercent: parseFloat(this.lockedPercent7), depositPercent: parseFloat(this.depositPercent7), withdrawalPercent: parseFloat(this.withdrawalPercent7) });
    }
    else if ((this.rank7 != "" && this.rank7 != null) && (this.promoPercent7 != null) && (this.lockedPercent7 != null)
      && (this.withdrawalPercent7 != null)) {

      this.prizeDetailsData.push({ rank: this.rank7 + "-" + this.rank7, promoPercent: parseFloat(this.promoPercent7), lockedPercent: parseFloat(this.lockedPercent7), depositPercent: parseFloat(this.depositPercent7), withdrawalPercent: parseFloat(this.withdrawalPercent7) });
    } else if ((this.rank7 == "") && (this.promoPercent7 == "") && (this.lockedPercent7 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 7  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank8 != "" && this.rank8 != null) && (this.promoPercent8 != null) && (this.lockedPercent8 != null)
      && (this.withdrawalPercent8 != null) && (this.rank8.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank8, promoPercent: parseFloat(this.promoPercent8), lockedPercent: parseFloat(this.lockedPercent8), depositPercent: parseFloat(this.depositPercent8), withdrawalPercent: parseFloat(this.withdrawalPercent8) });
    } else if ((this.rank8 != "" && this.rank8 != null) && (this.promoPercent8 != null) && (this.lockedPercent8 != null)
      && (this.withdrawalPercent8 != null)) {

      this.prizeDetailsData.push({ rank: this.rank8 + "-" + this.rank8, promoPercent: parseFloat(this.promoPercent8), lockedPercent: parseFloat(this.lockedPercent8), depositPercent: parseFloat(this.depositPercent8), withdrawalPercent: parseFloat(this.withdrawalPercent8) });
    } else if ((this.rank8 == "") && (this.promoPercent8 == "") && (this.lockedPercent8 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 8  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank9 != "" && this.rank9 != null) && (this.promoPercent9 != null) && (this.lockedPercent9 != null)
      && (this.withdrawalPercent9 != null) && (this.rank9.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank9, promoPercent: parseFloat(this.promoPercent9), lockedPercent: parseFloat(this.lockedPercent9), depositPercent: parseFloat(this.depositPercent9), withdrawalPercent: parseFloat(this.withdrawalPercent9) });
    }
    else if ((this.rank9 != "" && this.rank9 != null) && (this.promoPercent9 != null) && (this.lockedPercent9 != null)
      && (this.withdrawalPercent9 != null)) {

      this.prizeDetailsData.push({ rank: this.rank9 + "-" + this.rank9, promoPercent: parseFloat(this.promoPercent9), lockedPercent: parseFloat(this.lockedPercent9), depositPercent: parseFloat(this.depositPercent9), withdrawalPercent: parseFloat(this.withdrawalPercent9) });
    } else if ((this.rank9 == "") && (this.promoPercent9 == "") && (this.lockedPercent9 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 9  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank10 != "" && this.rank10 != null) && (this.promoPercent10 != null) && (this.lockedPercent10 != null)
      && (this.depositPercent10 != null) && (this.rank10.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank10, promoPercent: parseFloat(this.promoPercent10), lockedPercent: parseFloat(this.lockedPercent10), depositPercent: parseFloat(this.depositPercent10), withdrawalPercent: parseFloat(this.withdrawalPercent10) });
    }
    else if ((this.rank10 != "" && this.rank10 != null) && (this.promoPercent10 != null) && (this.lockedPercent10 != null)
      && (this.withdrawalPercent10 != null)) {

      this.prizeDetailsData.push({ rank: this.rank10 + "-" + this.rank10, promoPercent: parseFloat(this.promoPercent10), lockedPercent: parseFloat(this.lockedPercent10), depositPercent: parseFloat(this.depositPercent10), withdrawalPercent: parseFloat(this.withdrawalPercent10) });
    } else if ((this.rank10 == "") && (this.promoPercent10 == "") && (this.lockedPercent10 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 10  & enter in (1-1 or 1-10) format');
      return
    }

    if ((this.rank11 != "" && this.rank11 != null) && (this.promoPercent11 != null) && (this.lockedPercent11 != null)
      && (this.withdrawalPercent11 != null) && (this.rank11.match(numbers))) {

      this.prizeDetailsData.push({ rank: this.rank11, promoPercent: parseFloat(this.promoPercent11), lockedPercent: parseFloat(this.lockedPercent11), depositPercent: parseFloat(this.depositPercent11), withdrawalPercent: parseFloat(this.withdrawalPercent11) });
    }
    else if ((this.rank11 != "" && this.rank11 != null) && (this.promoPercent11 != null) && (this.lockedPercent11 != null)
      && (this.withdrawalPercent11 != null)) {

      this.prizeDetailsData.push({ rank: this.rank11 + "-" + this.rank11, promoPercent: parseFloat(this.promoPercent11), lockedPercent: parseFloat(this.lockedPercent11), depositPercent: parseFloat(this.depositPercent11), withdrawalPercent: parseFloat(this.withdrawalPercent11) });
    } else if ((this.rank11 == "") && (this.promoPercent11 == "") && (this.lockedPercent11 == "")) {

    } else {
      this.showAlertBox('Enter all the fields for rank 11  & enter in (1-1 or 1-10) format');
      return
    }

    if ((this.rank12 != "" && this.rank12 != null) && (this.promoPercent12 != null) && (this.lockedPercent12 != null)
      && (this.withdrawalPercent12 != null) && (this.rank12.match(numbers))) {

      this.prizeDetailsData.push({ rank: this.rank12, promoPercent: parseFloat(this.promoPercent12), lockedPercent: parseFloat(this.lockedPercent12), depositPercent: parseFloat(this.depositPercent12), withdrawalPercent: parseFloat(this.withdrawalPercent12) });
    }
    else if ((this.rank12 != "" && this.rank12 != null) && (this.promoPercent12 != null) && (this.lockedPercent12 != null)
      && (this.withdrawalPercent12 != null)) {

      this.prizeDetailsData.push({ rank: this.rank12 + "-" + this.rank12, promoPercent: parseFloat(this.promoPercent12), lockedPercent: parseFloat(this.lockedPercent12), depositPercent: parseFloat(this.depositPercent12), withdrawalPercent: parseFloat(this.withdrawalPercent12) });
    } else if ((this.rank12 == "") && (this.promoPercent12 == "") && (this.lockedPercent12 == "")) {

    } else {
      this.showAlertBox('Enter all the fields for rank 12  & enter in (1-1 or 1-10) format');
      return
    }


    if ((this.rank13 != "" && this.rank13 != null) && (this.promoPercent13 != null) && (this.lockedPercent13 != null)
      && (this.withdrawalPercent13 != null) && (this.rank13.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank13, promoPercent: parseFloat(this.promoPercent13), lockedPercent: parseFloat(this.lockedPercent13), depositPercent: parseFloat(this.depositPercent13), withdrawalPercent: parseFloat(this.withdrawalPercent13) });
    }
    else if ((this.rank13 != "" && this.rank13 != null) && (this.promoPercent13 != null) && (this.lockedPercent13 != null)
      && (this.withdrawalPercent13 != null)) {

      this.prizeDetailsData.push({ rank: this.rank13 + "-" + this.rank13, promoPercent: parseFloat(this.promoPercent13), lockedPercent: parseFloat(this.lockedPercent13), depositPercent: parseFloat(this.depositPercent13), withdrawalPercent: parseFloat(this.withdrawalPercent13) });
    } else if ((this.rank13 == "") && (this.promoPercent13 == "") && (this.lockedPercent13 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 13  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank14 != "" && this.rank14 != null) && (this.promoPercent14 != null) && (this.lockedPercent14 != null)
      && (this.withdrawalPercent14 != null) && (this.rank14.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank14, promoPercent: parseFloat(this.promoPercent14), lockedPercent: parseFloat(this.lockedPercent14), depositPercent: parseFloat(this.depositPercent14), withdrawalPercent: parseFloat(this.withdrawalPercent14) });
    }
    else if ((this.rank14 != "" && this.rank14 != null) && (this.promoPercent14 != null) && (this.lockedPercent14 != null)
      && (this.withdrawalPercent14 != null)) {

      this.prizeDetailsData.push({ rank: this.rank14 + "-" + this.rank14, promoPercent: parseFloat(this.promoPercent14), lockedPercent: parseFloat(this.lockedPercent14), depositPercent: parseFloat(this.depositPercent14), withdrawalPercent: parseFloat(this.withdrawalPercent14) });
    } else if ((this.rank14 == "") && (this.promoPercent14 == "") && (this.lockedPercent14 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 14  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank15 != "" && this.rank15 != null) && (this.promoPercent15 != null) && (this.lockedPercent15 != null)
      && (this.withdrawalPercent15 != null) && (this.rank15.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank15, promoPercent: parseFloat(this.promoPercent15), lockedPercent: parseFloat(this.lockedPercent15), depositPercent: parseFloat(this.depositPercent15), withdrawalPercent: parseFloat(this.withdrawalPercent15) });
    } else if ((this.rank15 != "" && this.rank15 != null) && (this.promoPercent15 != null) && (this.lockedPercent15 != null)
      && (this.withdrawalPercent15 != null)) {

      this.prizeDetailsData.push({ rank: this.rank15 + "-" + this.rank15, promoPercent: parseFloat(this.promoPercent15), lockedPercent: parseFloat(this.lockedPercent15), depositPercent: parseFloat(this.depositPercent15), withdrawalPercent: parseFloat(this.withdrawalPercent15) });
    } else if ((this.rank15 == "") && (this.promoPercent15 == "") && (this.lockedPercent15 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 15  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank16 != "" && this.rank16 != null) && (this.promoPercent16 != null) && (this.lockedPercent16 != null)
      && (this.withdrawalPercent16 != null) && (this.rank16.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank16, promoPercent: parseFloat(this.promoPercent16), lockedPercent: parseFloat(this.lockedPercent16), depositPercent: parseFloat(this.depositPercent16), withdrawalPercent: parseFloat(this.withdrawalPercent16) });
    }
    else if ((this.rank16 != "" && this.rank16 != null) && (this.promoPercent16 != null) && (this.lockedPercent16 != null)
      && (this.withdrawalPercent16 != null)) {

      this.prizeDetailsData.push({ rank: this.rank16 + "-" + this.rank16, promoPercent: parseFloat(this.promoPercent16), lockedPercent: parseFloat(this.lockedPercent16), depositPercent: parseFloat(this.depositPercent16), withdrawalPercent: parseFloat(this.withdrawalPercent16) });
    } else if ((this.rank16 == "") && (this.promoPercent16 == "") && (this.lockedPercent16 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 16  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank17 != "" && this.rank17 != null) && (this.promoPercent17 != null) && (this.lockedPercent17 != null)
      && (this.withdrawalPercent17 != null) && (this.rank17.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank17, promoPercent: parseFloat(this.promoPercent17), lockedPercent: parseFloat(this.lockedPercent17), depositPercent: parseFloat(this.depositPercent17), withdrawalPercent: parseFloat(this.withdrawalPercent17) });
    }
    else if ((this.rank17 != "" && this.rank17 != null) && (this.promoPercent17 != null) && (this.lockedPercent17 != null)
      && (this.withdrawalPercent17 != null)) {

      this.prizeDetailsData.push({ rank: this.rank17 + "-" + this.rank17, promoPercent: parseFloat(this.promoPercent17), lockedPercent: parseFloat(this.lockedPercent17), depositPercent: parseFloat(this.depositPercent17), withdrawalPercent: parseFloat(this.withdrawalPercent17) });
    } else if ((this.rank17 == "") && (this.promoPercent17 == "") && (this.lockedPercent17 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 17  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank18 != "" && this.rank18 != null) && (this.promoPercent18 != null) && (this.lockedPercent18 != null)
      && (this.withdrawalPercent18 != null) && (this.rank18.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank18, promoPercent: parseFloat(this.promoPercent18), lockedPercent: parseFloat(this.lockedPercent18), depositPercent: parseFloat(this.depositPercent18), withdrawalPercent: parseFloat(this.withdrawalPercent18) });
    }
    else if ((this.rank18 != "" && this.rank18 != null) && (this.promoPercent18 != null) && (this.lockedPercent18 != null)
      && (this.withdrawalPercent18 != null)) {

      this.prizeDetailsData.push({ rank: this.rank18 + "-" + this.rank18, promoPercent: parseFloat(this.promoPercent18), lockedPercent: parseFloat(this.lockedPercent18), depositPercent: parseFloat(this.depositPercent18), withdrawalPercent: parseFloat(this.withdrawalPercent18) });
    } else if ((this.rank18 == "") && (this.promoPercent18 == "") && (this.lockedPercent18 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 18  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank19 != "" && this.rank19 != null) && (this.promoPercent19 != null) && (this.lockedPercent19 != null)
      && (this.withdrawalPercent19 != null) && (this.rank19.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank19, promoPercent: parseFloat(this.promoPercent19), lockedPercent: parseFloat(this.lockedPercent19), depositPercent: parseFloat(this.depositPercent19), withdrawalPercent: parseFloat(this.withdrawalPercent19) });
    }
    else if ((this.rank19 != "" && this.rank19 != null) && (this.promoPercent19 != null) && (this.lockedPercent19 != null)
      && (this.withdrawalPercent19 != null)) {

      this.prizeDetailsData.push({ rank: this.rank19 + "-" + this.rank19, promoPercent: parseFloat(this.promoPercent19), lockedPercent: parseFloat(this.lockedPercent19), depositPercent: parseFloat(this.depositPercent19), withdrawalPercent: parseFloat(this.withdrawalPercent19) });
    } else if ((this.rank19 == "") && (this.promoPercent19 == "") && (this.lockedPercent19 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 19  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank20 != "" && this.rank20 != null) && (this.promoPercent20 != null) && (this.lockedPercent20 != null)
      && (this.depositPercent20 != null) && (this.rank20.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank20, promoPercent: parseFloat(this.promoPercent20), lockedPercent: parseFloat(this.lockedPercent20), depositPercent: parseFloat(this.depositPercent20), withdrawalPercent: parseFloat(this.withdrawalPercent20) });
    }
    else if ((this.rank20 != "" && this.rank20 != null) && (this.promoPercent20 != null) && (this.lockedPercent20 != null)
      && (this.withdrawalPercent20 != null)) {

      this.prizeDetailsData.push({ rank: this.rank20 + "-" + this.rank20, promoPercent: parseFloat(this.promoPercent20), lockedPercent: parseFloat(this.lockedPercent20), depositPercent: parseFloat(this.depositPercent20), withdrawalPercent: parseFloat(this.withdrawalPercent20) });
    } else if ((this.rank20 == "") && (this.promoPercent20 == "") && (this.lockedPercent20 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 20  & enter in (1-1 or 1-10) format');
      return
    }

    if ((this.rank21 != "" && this.rank21 != null) && (this.promoPercent21 != null) && (this.lockedPercent21 != null)
      && (this.withdrawalPercent21 != null) && (this.rank21.match(numbers))) {

      this.prizeDetailsData.push({ rank: this.rank21, promoPercent: parseFloat(this.promoPercent21), lockedPercent: parseFloat(this.lockedPercent21), depositPercent: parseFloat(this.depositPercent21), withdrawalPercent: parseFloat(this.withdrawalPercent21) });
    }
    else if ((this.rank21 != "" && this.rank21 != null) && (this.promoPercent21 != null) && (this.lockedPercent21 != null)
      && (this.withdrawalPercent21 != null)) {

      this.prizeDetailsData.push({ rank: this.rank21 + "-" + this.rank21, promoPercent: parseFloat(this.promoPercent21), lockedPercent: parseFloat(this.lockedPercent21), depositPercent: parseFloat(this.depositPercent21), withdrawalPercent: parseFloat(this.withdrawalPercent21) });
    } else if ((this.rank21 == "") && (this.promoPercent21 == "") && (this.lockedPercent21 == "")) {

    } else {
      this.showAlertBox('Enter all the fields for rank 21  & enter in (1-1 or 1-10) format');
      return
    }

    if ((this.rank22 != "" && this.rank22 != null) && (this.promoPercent22 != null) && (this.lockedPercent22 != null)
      && (this.withdrawalPercent22 != null) && (this.rank22.match(numbers))) {

      this.prizeDetailsData.push({ rank: this.rank22, promoPercent: parseFloat(this.promoPercent22), lockedPercent: parseFloat(this.lockedPercent22), depositPercent: parseFloat(this.depositPercent22), withdrawalPercent: parseFloat(this.withdrawalPercent22) });
    }
    else if ((this.rank22 != "" && this.rank22 != null) && (this.promoPercent22 != null) && (this.lockedPercent22 != null)
      && (this.withdrawalPercent22 != null)) {

      this.prizeDetailsData.push({ rank: this.rank22 + "-" + this.rank22, promoPercent: parseFloat(this.promoPercent22), lockedPercent: parseFloat(this.lockedPercent22), depositPercent: parseFloat(this.depositPercent22), withdrawalPercent: parseFloat(this.withdrawalPercent22) });
    } else if ((this.rank22 == "") && (this.promoPercent22 == "") && (this.lockedPercent22 == "")) {

    } else {
      this.showAlertBox('Enter all the fields for rank 22  & enter in (1-1 or 1-10) format');
      return
    }


    if ((this.rank23 != "" && this.rank23 != null) && (this.promoPercent23 != null) && (this.lockedPercent23 != null)
      && (this.withdrawalPercent23 != null) && (this.rank23.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank23, promoPercent: parseFloat(this.promoPercent23), lockedPercent: parseFloat(this.lockedPercent23), depositPercent: parseFloat(this.depositPercent23), withdrawalPercent: parseFloat(this.withdrawalPercent23) });
    }
    else if ((this.rank23 != "" && this.rank23 != null) && (this.promoPercent23 != null) && (this.lockedPercent23 != null)
      && (this.withdrawalPercent23 != null)) {

      this.prizeDetailsData.push({ rank: this.rank23 + "-" + this.rank23, promoPercent: parseFloat(this.promoPercent23), lockedPercent: parseFloat(this.lockedPercent23), depositPercent: parseFloat(this.depositPercent23), withdrawalPercent: parseFloat(this.withdrawalPercent23) });
    } else if ((this.rank23 == "") && (this.promoPercent23 == "") && (this.lockedPercent23 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 23  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank24 != "" && this.rank24 != null) && (this.promoPercent24 != null) && (this.lockedPercent24 != null)
      && (this.withdrawalPercent24 != null) && (this.rank24.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank24, promoPercent: parseFloat(this.promoPercent24), lockedPercent: parseFloat(this.lockedPercent24), depositPercent: parseFloat(this.depositPercent24), withdrawalPercent: parseFloat(this.withdrawalPercent24) });
    } else if ((this.rank24 != "" && this.rank24 != null) && (this.promoPercent24 != null) && (this.lockedPercent24 != null)
      && (this.withdrawalPercent24 != null)) {

      this.prizeDetailsData.push({ rank: this.rank24 + "-" + this.rank24, promoPercent: parseFloat(this.promoPercent24), lockedPercent: parseFloat(this.lockedPercent24), depositPercent: parseFloat(this.depositPercent24), withdrawalPercent: parseFloat(this.withdrawalPercent24) });
    } else if ((this.rank24 == "") && (this.promoPercent24 == "") && (this.lockedPercent24 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 24  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank25 != "" && this.rank25 != null) && (this.promoPercent25 != null) && (this.lockedPercent25 != null)
      && (this.withdrawalPercent25 != null) && (this.rank25.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank25, promoPercent: parseFloat(this.promoPercent25), lockedPercent: parseFloat(this.lockedPercent25), depositPercent: parseFloat(this.depositPercent25), withdrawalPercent: parseFloat(this.withdrawalPercent25) });
    }
    else if ((this.rank25 != "" && this.rank25 != null) && (this.promoPercent25 != null) && (this.lockedPercent25 != null)
      && (this.withdrawalPercent25 != null)) {

      this.prizeDetailsData.push({ rank: this.rank25 + "-" + this.rank25, promoPercent: parseFloat(this.promoPercent25), lockedPercent: parseFloat(this.lockedPercent25), depositPercent: parseFloat(this.depositPercent25), withdrawalPercent: parseFloat(this.withdrawalPercent25) });
    } else if ((this.rank25 == "") && (this.promoPercent25 == "") && (this.lockedPercent25 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 25  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank26 != "" && this.rank26 != null) && (this.promoPercent26 != null) && (this.lockedPercent26 != null)
      && (this.withdrawalPercent26 != null) && (this.rank26.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank26, promoPercent: parseFloat(this.promoPercent26), lockedPercent: parseFloat(this.lockedPercent26), depositPercent: parseFloat(this.depositPercent26), withdrawalPercent: parseFloat(this.withdrawalPercent26) });
    }
    else if ((this.rank26 != "" && this.rank26 != null) && (this.promoPercent26 != null) && (this.lockedPercent26 != null)
      && (this.withdrawalPercent26 != null)) {

      this.prizeDetailsData.push({ rank: this.rank26 + "-" + this.rank26, promoPercent: parseFloat(this.promoPercent26), lockedPercent: parseFloat(this.lockedPercent26), depositPercent: parseFloat(this.depositPercent26), withdrawalPercent: parseFloat(this.withdrawalPercent26) });
    } else if ((this.rank26 == "") && (this.promoPercent26 == "") && (this.lockedPercent26 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 26  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank27 != "" && this.rank27 != null) && (this.promoPercent27 != null) && (this.lockedPercent27 != null)
      && (this.withdrawalPercent27 != null) && (this.rank27.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank27, promoPercent: parseFloat(this.promoPercent27), lockedPercent: parseFloat(this.lockedPercent27), depositPercent: parseFloat(this.depositPercent27), withdrawalPercent: parseFloat(this.withdrawalPercent27) });
    }
    else if ((this.rank27 != "" && this.rank27 != null) && (this.promoPercent27 != null) && (this.lockedPercent27 != null)
      && (this.withdrawalPercent27 != null)) {

      this.prizeDetailsData.push({ rank: this.rank27 + "-" + this.rank27, promoPercent: parseFloat(this.promoPercent27), lockedPercent: parseFloat(this.lockedPercent27), depositPercent: parseFloat(this.depositPercent27), withdrawalPercent: parseFloat(this.withdrawalPercent27) });
    } else if ((this.rank27 == "") && (this.promoPercent27 == "") && (this.lockedPercent27 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 27  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank28 != "" && this.rank28 != null) && (this.promoPercent28 != null) && (this.lockedPercent28 != null)
      && (this.withdrawalPercent28 != null) && (this.rank28.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank28, promoPercent: parseFloat(this.promoPercent28), lockedPercent: parseFloat(this.lockedPercent28), depositPercent: parseFloat(this.depositPercent28), withdrawalPercent: parseFloat(this.withdrawalPercent28) });
    }
    else if ((this.rank28 != "" && this.rank28 != null) && (this.promoPercent28 != null) && (this.lockedPercent28 != null)
      && (this.withdrawalPercent28 != null)) {

      this.prizeDetailsData.push({ rank: this.rank28 + "-" + this.rank28, promoPercent: parseFloat(this.promoPercent28), lockedPercent: parseFloat(this.lockedPercent28), depositPercent: parseFloat(this.depositPercent28), withdrawalPercent: parseFloat(this.withdrawalPercent28) });
    } else if ((this.rank28 == "") && (this.promoPercent28 == "") && (this.lockedPercent28 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 28  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank29 != "" && this.rank29 != null) && (this.promoPercent29 != null) && (this.lockedPercent29 != null)
      && (this.withdrawalPercent29 != null) && (this.rank29.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank29, promoPercent: parseFloat(this.promoPercent29), lockedPercent: parseFloat(this.lockedPercent29), depositPercent: parseFloat(this.depositPercent29), withdrawalPercent: parseFloat(this.withdrawalPercent29) });
    }
    else if ((this.rank29 != "" && this.rank29 != null) && (this.promoPercent29 != null) && (this.lockedPercent29 != null)
      && (this.withdrawalPercent29 != null)) {

      this.prizeDetailsData.push({ rank: this.rank29 + "-" + this.rank29, promoPercent: parseFloat(this.promoPercent29), lockedPercent: parseFloat(this.lockedPercent29), depositPercent: parseFloat(this.depositPercent29), withdrawalPercent: parseFloat(this.withdrawalPercent29) });
    } else if ((this.rank29 == "") && (this.promoPercent29 == "") && (this.lockedPercent29 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 29  & enter in (1-1 or 1-10) format');
      return
    }
    if ((this.rank30 != "" && this.rank30 != null) && (this.promoPercent30 != null) && (this.lockedPercent30 != null)
      && (this.depositPercent30 != null) && (this.rank30.match(numbers))) {
      this.prizeDetailsData.push({ rank: this.rank30, promoPercent: parseFloat(this.promoPercent30), lockedPercent: parseFloat(this.lockedPercent30), depositPercent: parseFloat(this.depositPercent30), withdrawalPercent: parseFloat(this.withdrawalPercent30) });
    }
    else if ((this.rank30 != "" && this.rank30 != null) && (this.promoPercent30 != null) && (this.lockedPercent30 != null)
      && (this.withdrawalPercent30 != null)) {

      this.prizeDetailsData.push({ rank: this.rank30 + "-" + this.rank30, promoPercent: parseFloat(this.promoPercent30), lockedPercent: parseFloat(this.lockedPercent30), depositPercent: parseFloat(this.depositPercent30), withdrawalPercent: parseFloat(this.withdrawalPercent30) });
    } else if ((this.rank30 == "") && (this.promoPercent30 == "") && (this.lockedPercent30 == "")) {
    } else {
      this.showAlertBox('Enter all the fields for rank 30  & enter in (1-1 or 1-10) format');
      return
    }

    if (this.leaderboardRuleType == LeaderboardRuleType.HIGHEST_SCORE) {

      if (this.checkedGamesList.length == this.worklooperGameLength) {
        this.requestParameters['games'] = [this.all];
      } else {
        this.requestParameters['games'] = this.checkedGamesList;
      }
    } else {
      if (this.checkedGamesList.length == this.allGameLength) {
        this.requestParameters['games'] = [this.all];
      } else {
        this.requestParameters['games'] = this.checkedGamesList;
      }
    }
    this.requestParameters['prizeDetails'] = this.prizeDetailsData;
    this.requestParameters['users'] = this.usersData;
  }

  validateLeaderboard() {
    this.isValid = true;
    let startTimestamp = AppConstants.getTimestamp(this.startDate.toString() + " " + this.startTime.toString());
    let endTimeStamp = AppConstants.getTimestamp(this.endDate.toString() + " " + this.endTime.toString());
    let endAndStartDateTimeDifferenceInHours: number = AppConstants.getDifferenceInHours(startTimestamp, endTimeStamp);

    if ((startTimestamp < AppConstants.getTimestamp(this.currentDate.toISOString()))) {
      this.showAlert(" The difference between the start/time  should be more than current time ");
      this.isValid = false;
    }
    if ((endTimeStamp < AppConstants.getTimestamp(this.currentDate.toISOString()))) {
      this.showAlert(" The difference between the  end date/time should be more than current time ");
      this.isValid = false;
    }

    if (this.leaderboardType == LeaderboardType.HOURLY) {
      if ((endAndStartDateTimeDifferenceInHours > 5) || (endAndStartDateTimeDifferenceInHours <= 0)) {
        this.showAlert("The difference between the start and end date should be less than or equal to 5 hours");
        this.isValid = false;
      }
    } else if (this.leaderboardType == LeaderboardType.DAILY) {
      if ((endAndStartDateTimeDifferenceInHours < 24) || (endAndStartDateTimeDifferenceInHours > 144)) { // 24*6 = 144 hours
        this.showAlert("For daily leaderboard time difference should be between 1 and 6 days only");
        this.isValid = false;
      }
    } else if (this.leaderboardType == LeaderboardType.WEEKLY) {
      if ((endAndStartDateTimeDifferenceInHours != 168)) { // 24*7 = 168 hours
        this.showAlert("For weekly leaderboard time difference should be 1 week only");
        this.isValid = false;
      }
    } else if (this.leaderboardType == LeaderboardType.MONTHLY) {
      if ((AppConstants.getDifferenceInDays(startTimestamp, endTimeStamp) > 31) && (AppConstants.getDifferenceInHours(startTimestamp, endTimeStamp) < 48)) {
        this.showAlert("For monthly leaderboard time difference should be 1 month only");
        this.isValid = false;
      }
    }
    if (this.stakeWise == "true") {
      if (parseFloat(this.minEntryfee) > 0 && parseFloat(this.maxEntryFee) > 0 && (this.minEntryfee <= this.maxEntryFee)) {
        if (this.leaderboardRuleType == LeaderboardRuleType.HIGHEST_SCORE) {
          if (this.checkedGamesList.length == this.worklooperGameLength) {
            this.showAlert("You cannot select all Games if stakewise is true");
            this.isValid = false;
          }
        } else {
          if (this.checkedGamesList.length == this.allGameLength) {
            this.showAlert("You cannot select all Games if stakewise is true");
            this.isValid = false;
          }
        }
      }
    }
    return this.isValid
  }

  initializeModelVariables() {
    this.startTime = '';
    this.endTime = '';
    this.startDate = '';
    this.endDate = '';
    this.name = '';
    this.stakeWise = '';
    this.leaderboardRuleType = '';
    this.leaderboardType = '';
    this.minValue = '';
    this.minEntryfee = '';
    this.maxEntryFee = '';
    this.promoPrizePool = '';
    this.lockedPrizePool = '';
    this.depositPrizePool = '';
    this.withdrawalPrizePool = '';
    this.leaderboardIdupdate = "";
    this.scheduledPointsByUserId = {};
    this.clear1(); this.clear2(); this.clear3(); this.clear4(); this.clear5(); this.clear6(); this.clear7(); this.clear8(); this.clear9(); this.clear10();
    this.clear11(); this.clear12(); this.clear13(); this.clear14(); this.clear15(); this.clear16(); this.clear17(); this.clear18(); this.clear19(); this.clear20();
    this.clear21(); this.clear22(); this.clear23(); this.clear24(); this.clear25(); this.clear26(); this.clear27(); this.clear28(); this.clear29(); this.clear30();
    this.clearuserId1(); this.clearuserId2(); this.clearuserId3(); this.clearuserId4(); this.clearuserId5(); this.clearuserId6(); this.clearuserId7(); this.clearuserId8(); this.clearuserId9(); this.clearuserId10();
    this.clearuserId11(); this.clearuserId12(); this.clearuserId13(); this.clearuserId14(); this.clearuserId15(); this.clearuserId16(); this.clearuserId17(); this.clearuserId18(); this.clearuserId19(); this.clearuserId20();
  }

  public showAlert(message: string) {
    this.closeAlertModal();
    this.showAlertBox(message);
  }



  updatesedule() {
    this.scheduledPointsByUserId = Object.assign(
      { [this.userId1]: parseFloat(this.scheduledPoints1) })
    if (parseFloat(this.scheduledPoints2) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId2]: parseFloat(this.scheduledPoints2) }) }
    if (parseFloat(this.scheduledPoints3) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId3]: parseFloat(this.scheduledPoints3) }) }
    if (parseFloat(this.scheduledPoints4) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId4]: parseFloat(this.scheduledPoints4) }) }
    if (parseFloat(this.scheduledPoints5) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId5]: parseFloat(this.scheduledPoints5) }) }
    if (parseFloat(this.scheduledPoints6) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId6]: parseFloat(this.scheduledPoints6) }) }
    if (parseFloat(this.scheduledPoints7) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId7]: parseFloat(this.scheduledPoints7) }) }
    if (parseFloat(this.scheduledPoints8) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId8]: parseFloat(this.scheduledPoints8) }) }
    if (parseFloat(this.scheduledPoints9) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId9]: parseFloat(this.scheduledPoints9) }) }
    if (parseFloat(this.scheduledPoints10) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId10]: parseFloat(this.scheduledPoints10) }) }
    if (parseFloat(this.scheduledPoints11) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId11]: parseFloat(this.scheduledPoints11) }) }
    if (parseFloat(this.scheduledPoints12) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId12]: parseFloat(this.scheduledPoints12) }) }
    if (parseFloat(this.scheduledPoints13) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId13]: parseFloat(this.scheduledPoints13) }) }
    if (parseFloat(this.scheduledPoints14) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId14]: parseFloat(this.scheduledPoints14) }) }
    if (parseFloat(this.scheduledPoints15) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId15]: parseFloat(this.scheduledPoints15) }) }
    if (parseFloat(this.scheduledPoints16) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId16]: parseFloat(this.scheduledPoints16) }) }
    if (parseFloat(this.scheduledPoints17) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId17]: parseFloat(this.scheduledPoints17) }) }
    if (parseFloat(this.scheduledPoints18) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId18]: parseFloat(this.scheduledPoints18) }) }
    if (parseFloat(this.scheduledPoints19) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId19]: parseFloat(this.scheduledPoints19) }) }
    if (parseFloat(this.scheduledPoints20) > 0) { this.scheduledPointsByUserId = Object.assign(this.scheduledPointsByUserId, { [this.userId20]: parseFloat(this.scheduledPoints20) }) }
    this.requestParameters["leaderboardId"] = this.leaderboardIdupdate;
    this.requestParameters["scheduledPointsByUserId"] = this.scheduledPointsByUserId;

    console.log(this.requestParameters)
    this.spinnerService.show();
    this.leaderboardService.seduleupdate(UrlConstant.updateSedulePointLeaderboardUrl, '', this.requestParameters, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        this.spinnerService.hide();
        if (resData['result'] == Responses.SUCCESS) {
          this.closeLeaderboardDetails()
          this.showAlertBoxClone("Schedule Points updated  successfully.");
          this.getLeaderboardDetails();
          this.initializeModelVariables();
        } else if (resData['result'] == Responses.INVALID_REQUEST) {
          this.showAlert("Invalid Request");
          this.initializeModelVariables();
        } else if (resData['result'] == Responses.DB_ERROR) {
          this.showAlert(ResponsesDescription.DB_ERROR);
          this.initializeModelVariables();
        }
        else if (resData['result'] == Responses.INTERNAL_SERVER_ERROR) {
          this.showAlert(ResponsesDescription.INTERNAL_SERVER_ERROR)
          this.initializeModelVariables();
        }
      },
        error => {
          this.showAlert("Bad Request, Dont fill sedule point without userid")
          this.spinnerService.hide();
          this.initializeModelVariables();
        }
      );
  }


}


