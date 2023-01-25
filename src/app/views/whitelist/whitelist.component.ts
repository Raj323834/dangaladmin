import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppConstants } from '../../constant/AppConstants';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { UrlConstant } from '../../constant/UrlConstant';
import { Responses } from '../../constant/Responses';
import { HelperService } from '../../services/HelperService';
import { GeoRestrictionService } from '../../services/GeoRestrictionService';
import { PermissionNames } from '../../constant/PermissionNames';
import { GeoRestrictionAllGames } from '../../enums/geoRestriction/GeoRestrictionAllGames';
import { GeoRestrictionActivityType } from '../../enums/geoRestriction/GeoRestrictionActivityType';
import { WhitelistParam } from '../../searchParam/whitelist/WhitelistParam';
import { UserService } from '../../services/UserService';
import { UserModal } from '../../models/user/UserModal';
import { WhiteListUsersModal } from '../../models/WhiteListUsers/WhiteListUsersModal';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../../services/ExcelService';


@Component({
  templateUrl: 'whitelist.component.html',
  styleUrls: ['whitelist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WhitelistComponent implements OnInit {
  public geoRestrictionActivityTypes = Object.values(GeoRestrictionActivityType);
  public allGamesList = Object.values(GeoRestrictionAllGames);

  private ipAddress: string = '';
  private checkedGamesList = [];
  private activityTypeList = [];
  private userName: string = "";
  private searchParamsForm: any = null;
  private all: string = "ALL";
  private allData: WhiteListUsersModal[];
  private userModal: UserModal;
  showUserModal: boolean = false;
  private columns: string[] = [
    'userId', 'activityType', 'game', 'createdAt', 'updatedAt'];

  private allGamesChecked: boolean = false;
  private unselect: boolean = false;
  showGameList: boolean = false


  private paginator: MatPaginator;
  private sort: MatSort;

  private showDownloadButton:boolean=false;

  private dataSource: MatTableDataSource<any>;

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
    private geoRestrictionService: GeoRestrictionService,
    private excelService: ExcelService,
    private spinnerService: NgxSpinnerService) { }

  public access_permission_read: boolean = false;
  public access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.WHITELIST);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.userName = JSON.parse(sessionStorage.user).user_name;
      this.geoRestrictionService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
        this.getAllWhiteListedUser();
      });

      this.searchParamsForm = this.formBuilder.group(
        {
          userId: [''],
          activityType: [''],
          game: [''],
        }
      )
  }

  public alert: string = ""
  public showAlertModal: boolean = false;
  private title: string = 'WhiteList Report';
  private  excel = [];
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }

  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }
  findUser: boolean = false;
  userID: string = '';
  findUserModal() {
    this.findUser = true;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }

  receiveFindUserIDCloseModalMessage($event) {

    if ($event != "") {
      this.findUser = false;
      this.userID = $event;
    } else {
      this.findUser = false;
    }
  }


  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length

    if (paramLength === 3) {
      if (param.state !== undefined || this.activityTypeList.length >= 1 || this.checkedGamesList.length >= 1 ||
        param.state !== "")
        return true;
    } else {
      this.closeAlertModal();
      this.showAlertBox('Enter all the fields');
      return false;
    }
  }



  get search() { return this.searchParamsForm.controls; }


  getAllWhiteListedUser() {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    this.spinnerService.show();

    this.geoRestrictionService.getAllWhiteListUsers(UrlConstant.getAllWhiteListUserUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(resData => {
        this.spinnerService.hide();
        if (resData.result === Responses.SUCCESS) {
          if (resData.users == null) {
            this.showDownloadButton = false;
            this.allData = [];
            this.dataSource = new MatTableDataSource(this.allData);
            this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER)
          } else {
            this.allData = resData.users;

            resData.users.forEach(row => {
              this.excel.push(row);
            });
            this.showDownloadButton = true;
            this.dataSource = new MatTableDataSource(this.allData);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }

        }  else if (resData.result === Responses.GEO_RESTRICTION_SERVICE_NOT_REACHABLE) {
          this.showDownloadButton = false;
          this.allData = [];
          this.closeAlertModal();
          this.showAlertBox("Service not available");
        } else if (resData.result === Responses.DB_ERROR) {
          this.showDownloadButton = false;
          this.allData = [];
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.DB_ERROR);
        }
      },
        error => {
          this.spinnerService.hide();
          this.showDownloadButton = false;
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
          
        });
  }

  whitelistUser = () => {

    let param = new WhitelistParam();
    if (this.search.userId.value !== undefined && this.search.userId.value.trim() !== '') {
      param.userId = this.search.userId.value;
    }
    if (this.activityTypeList.length >= 1) {
      param.activityTypes = this.activityTypeList;
    }
    if (this.showGameList) {
      if (this.checkedGamesList.length >= 1) {
        param.games = this.checkedGamesList;
      }
    } else {
      param.games = this.checkedGamesList;
    }


    let isValid = this.validateSearchFilter(param);
    if (isValid) {
      this.geoRestrictionService.whitelist(UrlConstant.getWhitelistUrl, AppConstants.NO_URL_PARAM, param, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(
          resData => {
            if (resData.result == Responses.SUCCESS) {
              this.showAlertBox('User Whitelisted successfully');
              this.getAllWhiteListedUser();
              this.userID='';

            } else if (resData.result == Responses.FAILURE) {
              this.showAlertBox('User Whitelisting failed');
            } else if (resData.result == Responses.DB_ERROR) {
              this.showAlertBox(ResponsesDescription.DB_ERROR);
            } else if (resData.result == Responses.GEO_RESTRICTION_SERVICE_NOT_REACHABLE) {
              this.showAlertBox('Whitelist service isn’t reachable');
            }
          },
          error => {
            this.showAlertBox(ResponsesDescription.SERVER_ERROR_MSG)
          }
        )
    }
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

  onActivityTypeCheckboxChange(option: string, event: { checked: any; }) {
    if (event.checked) {
      this.activityTypeList.push(option);
      if (option == 'GAME_PLAY_CASH') {
        this.showGameList = true;
      }
    } else {
      this.unselect = false;

      for (var i = 0; i < this.activityTypeList.length; i++) {
        if (this.activityTypeList[i] == option) {
          this.activityTypeList.splice(i, 1);
        }
      }
      if (option == 'GAME_PLAY_CASH') {
        this.showGameList = false;
      }
    }
  }
}
