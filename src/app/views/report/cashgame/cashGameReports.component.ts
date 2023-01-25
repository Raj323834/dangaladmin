import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { GameSearchParam } from '../../../searchParam/reports/game/GameSearchParam';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { AppConstants } from '../../../constant/AppConstants';
import { UserModal } from '../../../models/user/UserModal';
import { PermissionNames } from '../../../constant/PermissionNames';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserService } from '../../../services/UserService';




@Component({
  templateUrl: 'cashGameReports.component.html',
  styleUrls: ['cashGameReports.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CashGameReportsComponent implements OnInit {

  private title:string = 'CashGame Report';
  private excel :any= [];
  private showDownloadButton:boolean = false;
  //general page loading
  private dataSource: MatTableDataSource<any>;
  private columns: string[] = [
    'id', 'user_id', 'wallet_name', 'type', 'amount', 'description', 'transaction_time'];

  private userID: string = '';

  private searchParamsForm:any = null;
  private searchParamUserForm :any= null;

  //user modal details
  private showUserModal:boolean = false;

  private ipAddress :string= '';
  //page specific

  private paginator: MatPaginator;
  private sort: MatSort;

  findUser: boolean = false;
  alert: string = "";
  showAlertModal: boolean = false;


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
    public userService: UserService,
    private reportService: ReportService,
    private excelService: ExcelService,
    private spinnerService: NgxSpinnerService
  ) {

  }

  public access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.CASH_GAME_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          player_id: [''],
          game_name: [''],
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


  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length;
    let errorMsg = "Enter atleast  Game Name , From Date and To Date";
    if (param.game_name !== undefined && param.game_name !== '') {
      if (param.fromTime !== undefined && param.fromTome != '') {
        if (param.toTime !== undefined && param.toTime != '') {
          if (param.fromTime > param.toTime) {
            this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);
            return false
          } else {

            return true
          }
        } else {
          this.closeAlertModal();
          this.showAlertBox(errorMsg);
          return false
        }
      } else {
        this.closeAlertModal();
        this.showAlertBox(errorMsg);
        return false
      }
    } else {
      this.closeAlertModal();
      this.showAlertBox(errorMsg);
      return false
    }



  }


  get search() { return this.searchParamsForm.controls; }


  getCashGameReports = () => {

    let userName = JSON.parse(sessionStorage.user).user_name;

    let param = new GameSearchParam();
    if (this.search.player_id.value == undefined || this.search.player_id.value.trim() == '') {

      param.player_id = '';
      this.searchParamsForm.value['player_id'] = '';
    }
    else {
      param.player_id = this.search.player_id.value;
      this.searchParamsForm.value['player_id'] = param.player_id.trim();

    }

    if (this.search.game_name.value == undefined && this.search.game_name.value.trim() == '') {
      param.game_name = '';

      this.searchParamsForm.value['game_name'] = '';

    } else {
      param.game_name = this.search.game_name.value;

      this.searchParamsForm.value['game_name'] = param.game_name.trim();
    }


    if (this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') {
      let fromTime = `${this.search.fromTime.value} 00:00:00`;
      param.fromTime = AppConstants.getTimestamp(fromTime).toString();
      this.searchParamsForm.value['fromTime'] = AppConstants.getTimestamp(fromTime);
    }

    if (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '') {
      let toTime = `${this.search.toTime.value} 23:59:59`;
      param.toTime = AppConstants.getTimestamp(toTime).toString();
      this.searchParamsForm.value['toTime'] = AppConstants.getTimestamp(toTime);

    }
    let isValid = this.validateSearchFilter(param);
    if (isValid) {
      this.spinnerService.show();
      this.excel = [];
      this.showDownloadButton = false;
      this.reportService.getCashReport(UrlConstant.getCashReportUrl, AppConstants.NO_URL_PARAM, param, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.title = param.game_name + '_Cash_';
            if (resData.stats != null) {
              if (resData.stats.length != 0) {
                resData.stats.forEach(row => {
                  this.excel.push(row);
                });
                this.showDownloadButton = true;
              } else {
                this.closeAlertModal();
                this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
              }
            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
            }

          } else if (resData.result === Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.INCORRECT_TIME_INTERVAL) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INCORRECT_TIME_INTERVAL);

          }
        },
          error => {
            this.spinnerService.hide();
            if (error === Responses.INCORRECT_TIME_INTERVAL) {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.INCORRECT_TIME_INTERVAL);
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


  closeModal = () => {
    this.showUserModal = false;
  }


  closeFindUserIDModal = () => {

    this.findUser = false
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
