import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { HelperService } from '../../../services/HelperService';
import { WithdrawlSearchParam } from '../../../searchParam/withdrawal/WithdrawlSearchParam';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { UrlConstant } from '../../../constant/UrlConstant';
import { WithdrawalService } from '../../../services/WithdrawalService';
import { UserService } from '../../../services/UserService';
import { WithdrawalModal } from '../../../models/withdrawal/WithdrawalModal';
import { NgxSpinnerService } from 'ngx-spinner';
import { WithdrawalStatus } from '../../../enums/reports/WithdrawalStatus';




@Component({
  templateUrl: 'withdrawal.component.html',
  styleUrls: ['withdrawal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WithdrawalComponent implements OnInit {

  public withdrawalStatuses = Object.values(WithdrawalStatus); 
 
  private ipAddress: string = '';
  private userName: string = ''
  private userID: string = ""; 
  private transactionStatusDescription: string = '';
  private title: string = 'Withdrawal';
  private excel: any = [];
  private showDownloadButton: boolean = false;

  private dataSource: MatTableDataSource<any>;
  private allData: WithdrawalModal[];
  private columns: string[] = [
    'id', 'user_id', 'payment_mode', 'amount',
    'status', 'withdrawalType', 'reason', 'nameMismatch', 'isSuspicious', 'updated_at', 'created_at', 'fulfilled_time', 'Actions'];
  private searchParamsForm: any = null;
  private searchParamUserForm: any = null;
  private showModal: boolean = false;

  private userModal: UserModal;

  //page specific
  private selectedWithdrawlStatus: string;

  modalData = WithdrawalModal;
  alert: string = "";
  showAlertModal: boolean = false;
  findUser: boolean = false;
  showUserModal: boolean = false;
  access_permission_read: boolean = false;
  access_permission_write: boolean = false;
  
  private paginator: MatPaginator;
  private sort: MatSort;



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
    private withdrawalService: WithdrawalService,
    private excelService: ExcelService,
    private userService: UserService,
    private spinnerService: NgxSpinnerService) { }



  ngOnInit() {


    const accessPermission = HelperService.getModulePermissions(PermissionNames.WITHDRAWAL);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];

      this.withdrawalService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          id: [''],
          user_id: [''],
          status: [''],
          withdrawalType: [''],
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
  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length
    const errorMsg = 'Enter one of valid combinations:    \n\n     *Id\n     * FromDate and ToDate      \n     * Status with FromDate and ToDate    \n     * User ID with FromDate and ToDate    \n     * Withdrawal Type with FromDate and ToDate      ';
    if (paramLength === 1) {
      if (param.id !== undefined)
        return true
      else
        this.showAlertBox(errorMsg);

    } else if (paramLength === 2) {
      if (param.fromTime !== undefined && param.toTime !== undefined)
        return true
      else
        this.showAlertBox(errorMsg);
    } else if (paramLength === 3) {
      if (param.fromTime !== undefined && param.toTime !== undefined && param.status !== undefined) {
        return true;
      } else if (param.fromTime !== undefined && param.toTime !== undefined && param.user_id !== undefined) {
        return true;
      } else if (param.fromTime !== undefined && param.toTime !== undefined && param.withdrawalType !== undefined) {
        return true;
      } else {
        this.showAlertBox(errorMsg);
      }
    } else if (paramLength === 4) {
      if (param.fromTime !== undefined && param.toTime !== undefined)
        return true
      else
        this.showAlertBox(errorMsg);
    } else if (paramLength === 5) {
      if (param.fromTime !== undefined && param.toTime !== undefined)
        return true
      else
        this.showAlertBox(errorMsg);

    } else {
      this.closeAlertModal();
      this.showAlertBox(errorMsg);
      return false
    }
  }

  get search() { return this.searchParamsForm.controls; }


  getWithdrawlDetails = () => {
    let userName = JSON.parse(sessionStorage.user).user_name; // pls declare closer to usage

    let params: URLSearchParams = new URLSearchParams();
    let param = new WithdrawlSearchParam();

    if (this.search.id.value !== undefined && this.search.id.value.trim() !== '') {
      param.id = this.search.id.value
      params.set('id', param.id)
    }
    if (this.search.user_id.value !== undefined && this.search.user_id.value.trim() !== '') {
      param.user_id = this.search.user_id.value
      params.set('userId', param.user_id)
    }
    if (this.search.status.value !== undefined && this.search.status.value.trim() !== '') {
      param.status = this.search.status.value
      params.set('status', param.status)
    }
    if (this.search.withdrawalType.value !== undefined && this.search.withdrawalType.value.trim() !== '') {
      param.withdrawalType = this.search.withdrawalType.value
      params.set('withdrawalType', param.withdrawalType)
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
    console.log(param);
    let isValid = this.validateSearchFilter(param)
    if (isValid) {
      this.spinnerService.show();
      this.excel = [];
      this.allData = [];
      this.showDownloadButton = false;
      this.withdrawalService.getWithdrawals(UrlConstant.getWithdrawalUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            if (resData.reports == null) {
              this.allData = [];
              this.dataSource = new MatTableDataSource(this.allData);
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER)
            } else {
              this.allData = resData.reports;
              if (resData.reports.length != 0) {
                resData.reports.forEach(row => {
                  this.excel.push(row);
                });
                this.showDownloadButton = true;
              }

              this.dataSource = new MatTableDataSource(this.allData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }

          } else if (resData.result === Responses.INTERNAL_SERVER_ERROR) {
            this.allData = [];
            this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR);
          } else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.allData = [];
            this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);
          } else if (resData.result === Responses.NO_WITHDRAWALS_EXIST) {
            this.allData = [];
            this.showAlertBox(ResponsesDescription.NO_WITHDRAWAL_EXIST_MSG);
          } else if (resData.result === Responses.QUERY_PARAMS_MISSING) {
            this.allData = [];
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.QUERY_PARAM_MISSING_MSG);
          } else if (resData.result === Responses.WITHDRAWAL_NOT_DECLINED) {
            this.allData = [];
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.WITHDRAWAL_NOT_DECLINED_MSG)
          } else if (resData.result === Responses.DB_ERROR) {
            this.allData = [];
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          }
        },
          error => {
            this.spinnerService.hide();
            console.log("ERROR    ", error)
            if (error === 'OK') {
              this.closeAlertModal();
              this.showAlertBox("BAD REQUEST");
            } else if (error === Responses.INCORRECT_TIME_INTERVAL) {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);
            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.ERROR_FINDING_WITHDRAWAL);
            }
          });
    }
  }
  getWithdrawalType(is_withdrawal_instant) {
    if (is_withdrawal_instant == 'true') {
      return AppConstants.INSTANT;
    } else return AppConstants.MANUAL;
  }

  processWithdrawl = (userId: string, withdrawlID: number, reason: string) => { 

    this.userName = JSON.parse(sessionStorage.user).user_name;
    let msg: string = "Select status before saving";
    if (this.access_permission_write) {
      let bodyParams = {
        user_id: userId,
        withdrawal_id: withdrawlID,
        action: this.transactionStatusDescription,
        reason: reason
      }
      if (this.transactionStatusDescription.trim() === "") {
        this.showAlert(msg);
      }
      else {
        this.withdrawalService.processWithdrawal(UrlConstant.processWithdrawalUrl, AppConstants.NO_URL_PARAM, bodyParams, this.ipAddress, this.userName, '' + Date.now())
          .subscribe(resData => {
            if (resData.result === Responses.SUCCESS) {
              this.showModal = false;
              this.showAlert(ResponsesDescription.PROCESS_WITHDRAWAL_SUCCESS);
              this.getWithdrawlDetails()
            } else if (resData.result === Responses.INVALID_STATUS) {
              this.showAlertBox(ResponsesDescription.INVALID_STATUS_MSG);
            } else if (resData.result === Responses.WITHDRAWAL_DOES_NOT_EXIST) {
              this.showAlert(ResponsesDescription.WITHDRAWAL_DOES_NOT_EXIST_MSG);
            } else if (resData.result === Responses.WITHDRAWAL_NOT_DECLINED) {
              this.showAlert(ResponsesDescription.WITHDRAWAL_NOT_DECLINED_MSG)
            } else if (resData.result === Responses.DB_ERROR) {
              this.showAlert(ResponsesDescription.DB_ERROR);
            }
          });
      }
    } else {
      this.showAlert(ResponsesDescription.PERMISSION_TO_PROCESS_MSG);
    }
  }

  onBtnClick = (withdrawl) => {
    this.showModal = true;
    this.modalData = withdrawl;
    this.selectedWithdrawlStatus = withdrawl.transactionStatusDescription
  }

  closeModal = () => {
    this.showUserModal = false;
    this.showModal = false;
    this.findUser=false;
  }



  
  private showAlert(message: string) {
    this.closeAlertModal();
    this.showAlertBox(message);
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
