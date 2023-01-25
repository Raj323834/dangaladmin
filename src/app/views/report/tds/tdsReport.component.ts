import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from '../../../constant/AppConstants';
import { Responses } from '../../../constant/Responses';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserModal } from '../../../models/user/UserModal';
import { HelperService } from '../../../services/HelperService';
import { ReportService } from '../../../services/ReportService';
import { UserService } from '../../../services/UserService';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { PermissionNames } from '../../../constant/PermissionNames';
import { PokerDgTransferReportDataModel } from '../../../models/reports/dgPokerTransfer/pokerDgTransferReportDataModel';
import { ExcelService } from '../../../services/ExcelService';


@Component({
  templateUrl: 'tdsReport.component.html',
  styleUrls: ['tdsReport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TdsReportComponent {

  private ipAddress: string = '0.0.0.0';

  //general page loading
  dataSource: MatTableDataSource<any>;
  allData: PokerDgTransferReportDataModel[];
  columns: string[] = ['userId', 'tds', 'game','pokerToDgAmount', 'date'];
  public showUserModal: boolean = false;
  private searchParamsForm: any = null;
  private searchParamUserForm: any = null;
  private paginator: MatPaginator;
  private sort: MatSort;
  private userID: string = "";//ngModel
  public alert: string = "";
  public showAlertModal: boolean = false;
  private userModal: UserModal;
  private message:boolean=false;
  private showDownloadButton:boolean=false;
  private title: string = 'TDS Report';
  private excel: any = [];
  access_permission_read: boolean = false;
  private access_permission_write: boolean = false;
  findUser: boolean = false;

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
    private spinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private excelService:ExcelService) {}



  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.TDS_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          userId: '',
          fromTime: '',
          toTime: ''
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

  exportAsXLSX(){
    this.excelService.exportAsExcelFile(this.excel, this.title);
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

  getTdsReportDetails = () => {

    let fromTime;
    let toTime;
    if (this.searchParamsForm.get("userId").value !== '') {
      this.searchParamsForm.value['userId'] = `${this.searchParamsForm.get("userId").value}`;
    } else {
      this.searchParamsForm.value['userId'] = '';
      fromTime = '';
    }

    if (this.searchParamsForm.get("fromTime").value !== '') {
      fromTime = `${this.searchParamsForm.get("fromTime").value} 00:00:00`;
      this.searchParamsForm.value['fromTime'] = AppConstants.getTimestamp(fromTime).toString();
    } else {
      this.searchParamsForm.value['fromTime'] = '';
      fromTime = '';
    }

    if (this.searchParamsForm.get("toTime").value !== '') {
      toTime = `${this.searchParamsForm.get("toTime").value} 23:59:59`;
      this.searchParamsForm.value['toTime'] = AppConstants.getTimestamp(toTime).toString();
    } else {
      this.searchParamsForm.value['toTime'] = '';
      toTime = '';
    }

    let isValid = this.validateSearchFilter(this.searchParamsForm.value)
    if (isValid) {
      let userName: string = JSON.parse(sessionStorage.user).user_name;
      this.spinnerService.show();
      this.reportService.getPokerToDgReport(UrlConstant.getTdsReportUrl, AppConstants.NO_URL_PARAM, this.searchParamsForm.value, this.ipAddress, userName, '' + Date.now())
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
            this.dataSource.paginator = this.paginator;


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

