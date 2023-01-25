import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { DepositReportSerachParameters } from '../../../searchParam/reports/deposits/DepositReportSearchParameters';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { AppConstants } from '../../../constant/AppConstants';
import { DepositReportDataModel } from '../../../models/reports/deposit/DepositReportDataModel';
import { PermissionNames } from '../../../constant/PermissionNames';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserService } from '../../../services/UserService';



@Component({
  templateUrl: 'depositReport.component.html',
  styleUrls: ['depositReport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DepositReportComponent implements OnInit {
  findUser: boolean = false;
  public clear = false;
  public datacome = false ;
  private userID: string = '';
  private downloadUrl: string = '';
  private ipAddress: string = '';
  private title: string = 'Deposit Report';
  private excel: any = [];
  private showDownloadButton: boolean = false;
  private dataSource: MatTableDataSource<any>;
  private allData: DepositReportDataModel[];
  showUserModal: boolean = false
  private userModal: UserModal;
  private searchParamsForm: any = null
  private searchParamUserForm: any = null
  private showModal: boolean = false
  private modalData;
  private paginator: MatPaginator;
  private sort: MatSort;

  private columns: string[] = ['internalReferenceNumber', 'userId', 'userName', 'paymentTransactionAmount', 'transactionStatusDescription', 'pgName',
    'paymentMethod', 'promoCodeUsed', 'time'];

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
    public reportService: ReportService,
    private excelService: ExcelService,
    private userService: UserService,
    private SpinnerService: NgxSpinnerService) {}
    
  access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.DEPOSIT_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          id: [''],
          userId: [''],
          userName: [''],
          amount: [''],
          txStatus: [''],
          fromTime: ['',Validators.required],
          toTime: ['',Validators.required]
        });

      this.searchParamUserForm = this.formBuilder.group(
        {
          search_type: '',
          value: ''
        })

    }
  

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }
  alert = "";
  showAlertModal = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true;
  }
  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = "";
  }

  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  validateSearchFilter = (param) => {
  let errorMsg = 'Enter\n     * Both  FromDate and ToDate      \n     * Only ID      \n     * User ID with FromDate and ToDate    \n     * Username with FromDate and ToDate    \n     * Amount with FromDate and ToDate      ';
    if ((param.fromTime !== '' && param.toTime !== '')) {
      if (param.fromTime > param.toTime) {
        this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);
        return false;
      }
        else {
        return true;
      }

    } else if ((param.fromTime !== '' && param.toTime === '') || (param.fromTime === '' && param.toTime !== '')) {
      this.showAlertBox(errorMsg);
      return false;
    }else  if(AppConstants.getTimestamp(param.fromTime.toString() )<AppConstants.getTimestamp(param.toTime.toString())){
      this.showAlertBox(errorMsg);
      return false;
    }
     else {
      this.showAlertBox(errorMsg);
      return false;
    }
  }



  getUserDetail(from: string, userId: string) {
    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId);

    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(userData => {
        if (userData.result == Responses.SUCCESS) {
          this.userModal = userData;
          this.showUserModal = true;
          if (from == 'userID')
            this.showUserModal = true;
          else if (from == 'link') {
            this.showUserModal = false;
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

    if ($event) {
      this.showUserModal = false;
    }
  }
  get searchParameters() { return this.searchParamsForm.controls; }

  getDepositReportDetails = () => {
    let errorMsg = 'Enter the following combination \n     * Both  FromDate and ToDate      \n     * Only ID      \n     * User ID with FromDate and ToDate     \n     * User ID with Status, FromDate and ToDate     \n     * Username with FromDate and ToDate    \n     * Amount with FromDate and ToDate    \n     * Status with FromDate and ToDate    \n     * Date range should be less than 93 days, and Form Date should be less than To Date';

    let userName = JSON.parse(sessionStorage.user).user_name;

    let params: URLSearchParams = new URLSearchParams();
    let param = new DepositReportSerachParameters()

    var fromTime;
    var toTime;

    if (this.searchParameters.fromTime.value !== undefined && this.searchParameters.fromTime.value.trim() !== '') {
      fromTime = `${this.searchParameters.fromTime.value} 00:00:00`;
      param.fromTime = AppConstants.getTimestamp(fromTime).toString();
      params.set('fromTime', param.fromTime);
    }

    if (this.searchParameters.toTime.value !== undefined && this.searchParameters.toTime.value.trim() !== '') {
      toTime = `${this.searchParameters.toTime.value} 23:59:59`;
      param.toTime = AppConstants.getTimestamp(toTime).toString();
      params.set('toTime', param.toTime);
    }


    if ((this.searchParameters.id.value !== undefined) && (this.searchParameters.id.value !== '')) {
      param.id = this.searchParameters.id.value;
      params.set('id', param.id.trim());

    }

    if ((this.searchParameters.userId.value !== undefined) && (this.searchParameters.userId.value !== '')) {
      param.userId = this.searchParameters.userId.value;
      params.set('userId', param.userId.trim());

    }

    if ((this.searchParameters.userName.value !== undefined) && (this.searchParameters.userName.value !== '')) {
      param.userName = this.searchParameters.userName.value;
      params.set('userName', param.userName.trim());
    }

    if ((this.searchParameters.amount.value !== undefined) && (this.searchParameters.amount.value !== '')) {
      param.amount = this.searchParameters.amount.value;
      params.set('amount', param.amount.toString());
    }

    if ((this.searchParameters.txStatus.value !== undefined) && (this.searchParameters.txStatus.value !== '')) {
      param.txStatus = this.searchParameters.txStatus.value;
      params.set('txStatus', param.txStatus);
    }

    let isValid = this.validateSearchFilter(param);
    if (isValid) {
      this.SpinnerService.show();
      this.excel = [];
      this.showDownloadButton = false;
      this.reportService.getDepositReport(UrlConstant.getDepositReportUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.SpinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.allData = resData.reports;
            this.datacome=true;
            this.clear = false;
            if (resData.reports != null) {
              if (resData.reports.length != 0) {
                resData.reports.forEach(row => {
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
              this.clear = true;
            this.datacome=false;
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
            }
          } else if (resData.result === Responses.DB_ERROR) {
            this.closeAlertModal();
            this.clear = true;
            this.datacome=false;
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          }
          else if (resData.result === Responses.INVALID_USERNAME) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_USERNAME);
            this.clear = true;
            this.datacome=false;
          }

           else if (resData.result === Responses.QUERY_PARAMS_MISSING) {
            this.closeAlertModal();
            this.showAlertBox(errorMsg);
            this.clear = true;
            this.datacome=false;
        } else if (resData.result === Responses.INVALID_DATE_RANGE) {
          this.closeAlertModal();
          this.showAlertBox("Date range should be less than 93 days, and Form Date should be less than To Date");
          this.clear = true;
            this.datacome=false;
        }
          

        },
          error => {
            this.SpinnerService.hide();
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);

          })
    } else {
      this.closeAlertModal();
      this.showAlertBox(errorMsg);
    }
  }

  closeModal = () => {
    this.showUserModal = false;
    this.showModal = false;
  }

  onBtnClick = (row) => {
    this.showModal = true;
    this.modalData = row;

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

