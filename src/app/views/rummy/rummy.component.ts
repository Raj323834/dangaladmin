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
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { TableConfigService } from '../../services/TableConfigService';
import { TableConfiguration } from '../../models/tableConfiguration/TableConfiguration';

@Component({
  templateUrl: 'rummy.component.html',
  styleUrls: ['rummy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RummyComponent implements OnInit {
 
  private dataSource: MatTableDataSource<any>;
  private allData: TableConfiguration[];
  private columns: string[] = ['id', 'name', 'gameVariant', 'cardsPerPlayer','cashGame','botsAllowed', 'minimumPlayers','entryFee','decks', 'seats', 'createdAt', 'updatedAt', 'Actions'
  ]
  private showConfirmBox = false;
  private ipAddress = AppConstants.DEFAULT_IP;
  private requestParameters = {};
  private deleteTableConfigID: string;

  private modalData: any;
  private showModal: boolean = false;
  private alert = "";
  private showAlertModal = false;
  private showCreateModal: boolean = false;


  private name: string = '';
  private gameVariant: string = '';
  private pointValue: number;
  private dealsType: number;
  private poolVariant: number;
  private cardsPerPlayer: number = 13;
  private decks: number;
  private seats: number;
  private entryFee: number;
  private minimumPlayers: number;
  private rakePercent: number;
  private firstDropScore: number;
  private middleDropScore: number;
  private maxDropScore: number;
  private maxTableCount: number;
  private botsAllowed: boolean;
  private cashGame: boolean;
  private createdAt: number;
  private updatedAt: number;


  private userName: string = '';
  private paginator: MatPaginator;
  private sort: MatSort;

   access_permission_write: boolean = false;
   access_permission_read: boolean = false;


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
    private tableConfigService: TableConfigService,
    private spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.RUMMY);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.userName = JSON.parse(sessionStorage.user).user_name;
      this.tableConfigService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
        this.getTableConfigs();
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

  getTableConfigs = () => {
    this.allData = [];

    this.tableConfigService.getAllTableConfig(UrlConstant.getAllTableConfigUrl, AppConstants.NO_QUERY_PARAM, AppConstants.NO_URL_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        if (resData.result === Responses.SUCCESS) {
          if (resData.configs == null) {
            this.allData = [];
            this.showAlertBox('No data available')
          } else {
            this.allData = resData.configs;
          }
        } else if (resData.result === Responses.INTERNAL_SERVER_ERROR) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR);
        } else if (resData.result === Responses.DB_ERROR) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.DB_ERROR);
        }

        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
        error => {

        });
  }

  deleteTableConfig = (tableConfigId: string) => {
    if (this.access_permission_write) {
      if (tableConfigId == "" || tableConfigId == undefined) {
        this.showAlertBox("Invalid Table Config");
      } else {
        this.tableConfigService.deleteTableConfig(UrlConstant.deleteTableConfigUrl, tableConfigId, '', this.ipAddress, this.userName, '' + Date.now())
          .subscribe(resData => {
            this.showConfirmBox = false;
            if (resData.result === Responses.SUCCESS) {
              this.showAlert(" Table Configuration deleted successfully.");
              this.getTableConfigs();
              this.closeTableConfigDetails();
            } else if (resData.result === Responses.NOT_FOUND) {
              this.showAlert(ResponsesDescription.TABLE_CONFIG_NOT_FOUND);
            } else if (resData.result === Responses.DB_ERROR) {
              this.showAlert(ResponsesDescription.DB_ERROR);
            }else if (resData.result === Responses.NOT_FOUND) {
              this.showAlert("Table "+ResponsesDescription.NOT_FOUND);
            }
          });
      }
    } else {
      this.showAlertBox(AppConstants.NO_ACCESS_PERMISSION + "delete Table Configuration")
    }
  }

  showConfirmationBox = (tableConfigID) => {
    this.showConfirmBox = true
    this.deleteTableConfigID = tableConfigID;
  }
  closeConfirmationBox = () => {

    this.showConfirmBox = false
    this.deleteTableConfigID = '';
  }
  viewTableConfigDetails = (tableConfig) => {

    tableConfig.createdAt = AppConstants.getDatefromTimestamp(tableConfig.createdAt)
    tableConfig.updatedAt = AppConstants.getDatefromTimestamp(tableConfig.updatedAt);
    this.modalData = tableConfig;
    this.showModal = true;

  }
  closeTableConfigDetails = () => {
    this.showModal = false;
  }
  showCreateTableConfig() {
    this.showCreateModal = true
  }
  closeCreateTableConfig() {
    this.showCreateModal = false
  }

  createTableConfig() {
    if (this.access_permission_write) {

      if (this.name == '' ||
        this.gameVariant == '') {
        this.showAlert("Enter name and game variant");
        return;
      }
      if (this.name.length < 3 || this.name.length > 50) { 
        this.showAlert("Enter characters between 3-50 in Name.");
        return;
      }
      if (this.pointValue < 0 || this.pointValue > 10000) {
        this.showAlert("Enter point between 0-10000");
        return;
      }
      if (this.entryFee < 1 || this.entryFee > 20000) {
        this.showAlert("Enter EntryFee between 1-20000");
        return;
      }
      if (this.minimumPlayers < 2 || this.minimumPlayers > 6) {
        this.showAlert("Enter minimumPlayers between 2-6");
        return;
      }
      if (this.rakePercent < 1 || this.rakePercent > 100) {
        this.showAlert("Enter rakePercent between 1-100");
        return;
      } 
      if (this.firstDropScore < 1 || this.firstDropScore > 100) {
        this.showAlert("Enter First DropScore between 1-100");
        return;
      }
      if (this.middleDropScore < 1 || this.middleDropScore > 100) {
        this.showAlert("Enter Middle DropScore between 1-100");
        return;
      }
      if (this.maxDropScore < 1 || this.maxDropScore > 100) {
        this.showAlert("Enter Max DropScore between 1-100");
        return;
      }
      if (this.maxTableCount < 100 || this.maxTableCount > 200) {
        this.showAlert("Enter Max Table Count between 100-200");
        return;
      }
      else {
        this.createTableConfigNetworkCall();
      }

    } else {
      this.showAlertBox(AppConstants.NO_ACCESS_PERMISSION + " Table Config")
    }
  }



  createRequestBodyandValidations() {
    this.requestParameters['name'] = this.name;
    this.requestParameters['gameVariant'] = this.gameVariant;
    this.requestParameters['pointValue'] = this.pointValue;
    this.requestParameters['dealsType'] = this.dealsType;
    this.requestParameters['poolVariant'] = this.poolVariant;
    this.requestParameters['cardsPerPlayer'] = this.cardsPerPlayer;
    this.requestParameters['decks'] = this.decks;
    this.requestParameters['seats'] = this.seats;
    this.requestParameters['entryFee'] = this.entryFee;
    this.requestParameters['minimumPlayers'] = this.minimumPlayers;
    this.requestParameters['rakePercent'] = (this.rakePercent);
    this.requestParameters['firstDropScore'] = (this.firstDropScore);
    this.requestParameters['middleDropScore'] = (this.middleDropScore);
    this.requestParameters['maxDropScore'] = (this.maxDropScore);
    this.requestParameters['maxTableCount'] = this.maxTableCount;
    this.requestParameters['botsAllowed'] = this.botsAllowed;
    this.requestParameters['cashGame'] = this.cashGame;

  }

  createTableConfigNetworkCall() {
    this.createRequestBodyandValidations();

    this.spinnerService.show();
    this.tableConfigService.createTableConfig(UrlConstant.createTableConfigUrl, '', this.requestParameters, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        this.spinnerService.hide();
        if (resData['result'] == Responses.SUCCESS) {
          this.closeCreateTableConfig();
          this.showAlert("Table Configuration created successfully.");
          this.getTableConfigs();

          this.initializeModelVariables();
        } else if (resData['result'] == Responses.INVALID_REQUEST) {
          this.showAlert("Invalid Request");
        } else if (resData['result'] == Responses.DB_ERROR) {
          this.showAlert(ResponsesDescription.DB_ERROR);
        }
        else if (resData['result'] == Responses.INTERNAL_SERVER_ERROR) {
          this.showAlert(ResponsesDescription.INTERNAL_SERVER_ERROR)
        }
      },
        error => {
          this.spinnerService.hide();
        }
      );

  }


  initializeModelVariables() {
    this.name = '';
    this.gameVariant = '';
    this.pointValue = 0;
    this.dealsType = 0;
    this.poolVariant = 0;
    this.cardsPerPlayer =13 ;
    this.decks = 0;
    this.seats = 0;
    this.entryFee = 0;
    this.minimumPlayers = 0;
    this.rakePercent = 0;
    this.firstDropScore = 0;
    this.middleDropScore = 0;
    this.maxDropScore = 0;
    this.maxTableCount = 0;
    this.botsAllowed = false;
    this.cashGame = false;
    this.createdAt = 0;
    this.updatedAt = 0;
  }

  private showAlert(message: string) {
    this.closeAlertModal();
    this.showAlertBox(message);
  }

}