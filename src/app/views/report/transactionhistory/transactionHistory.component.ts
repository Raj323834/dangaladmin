import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { TransactionHistorySearchParam } from '../../../searchParam/reports/transactionhistory/TransactionHistorySearchParam';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { TransactionHistoryReportDataModel } from '../../../models/reports/transactionHistoryReport/TransactionHistoryReportDataModel';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { TransactionHistoryAllGames } from '../../../enums/reports/TransactionHistoryAllGames';
import { UserService } from '../../../services/UserService';


@Component({
  templateUrl: 'transactionHistory.component.html',
  styleUrls: ['transactionHistory.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TransactionHistoryComponent implements OnInit {

  public transactionHistoryAllGamesList = Object.values(TransactionHistoryAllGames);
  private searchParamUserForm: any = null;
  public findUser: boolean = false;
  private downloadUrl: string = "";
  private showDownloadFromUrlButton: boolean = false
  private ipAddress: string = '';
  private userID: string = ""
  private title: string = 'Transaction History';
  private excel: any = [];
  private showDownloadButton: boolean = false;
  private nodata: boolean = true
  private dataSource: MatTableDataSource<any>;
  private allData: TransactionHistoryReportDataModel[];
  private columns: string[] = ['id', 'user_id', 'gameName', 'wallet_name', 'type', 'amount','description', 'transaction_time']
  private searchParamsForm:any = null
  private showModal:boolean = false

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
    private SpinnerService: NgxSpinnerService,
    private reportService:ReportService,
    private userService:UserService) {}

  access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.TRANSACTION_HISTORY_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });

      this.searchParamsForm = this.formBuilder.group(
        {
          user_id: [''],
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

  receiveCloseModalMessage($event) {
     
    if ( $event) {
      this.showUserModal = false;
    }
  }

  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length
    const alerMsg = 'Difference between From Date and To Date should be 30 days.';
    if(paramLength>=2){
      if (param.fromTime !== undefined && param.toTime !== undefined ) {
        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
          return false;
        } else if (AppConstants.getDifferenceInDays(param.fromTime, param.toTime) > 30) {
          this.showAlertBox(alerMsg)
          return false
        }
        else {
          return true;
        }
      }
     
    }

  }

  get search() { return this.searchParamsForm.controls; }

  getTransactionDetails = () => {
    let userName: string = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new TransactionHistorySearchParam()

    if (this.search.user_id.value !== undefined && this.search.user_id.value.trim() !== '') {
      param.user_id = this.search.user_id.value;
      params.set('user_id', param.user_id.trim())
    }
    if (this.search.game_name.value !== undefined && this.search.game_name.value.trim() !== '') {
      param.game_name = this.search.game_name.value;
      params.set('game_name', param.game_name.trim())
    }

    if (this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') {
      let fromTime = `${this.search.fromTime.value} 00:00:00`;
      param.fromTime = AppConstants.getTimestamp(fromTime).toString();
      params.set('from_time', param.fromTime);
    }

    if (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '') {
      let toTime = `${this.search.toTime.value} 23:59:59`;
      param.toTime = AppConstants.getTimestamp(toTime).toString();
      params.set('to_time', param.toTime);
    }
   
    let isValid = this.validateSearchFilter(param);
    if (isValid) {
      this.SpinnerService.show();
      this.excel = [];
      this.allData = [];

      this.showDownloadFromUrlButton = false;
      
      this.reportService.getTransactionHistoryReport(UrlConstant.getTransactionHistoryReportUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.SpinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.allData = resData.transactions;
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

          } else if (resData.result === Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.INCORRECT_TIME_INTERVAL) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INCORRECT_TIME_INTERVAL);

          } else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);

          } else if (resData.result === Responses.INVALID_USER_ID) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_USER_ID);

          }  else if (resData.result === Responses.REPORT_UPLOAD_FAILED) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.REPORT_UPLOAD_FAILED);

          }
        },
          error => {
            this.SpinnerService.hide();
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

  closeModal = () => {
    this.showUserModal = false;
    this.findUser = false;
    this.showModal = false;
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
