import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { IPReportSearchParam } from '../../../searchParam/collusion/IpReportSearchParam';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { AppConstants } from '../../../constant/AppConstants';
import { UrlConstant } from '../../../constant/UrlConstant';
import { ReportService } from '../../../services/ReportService';
import { IpReportDataModel } from '../../../models/reports/ip/ipReportDataModel';
import { UserService } from '../../../services/UserService';
import { PermissionNames } from '../../../constant/PermissionNames';




@Component({
  templateUrl: 'ipReport.component.html',
  styleUrls: ['ipReport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IPReportComponent implements OnInit {
  private ipAddress: string = '';
  private title: string = 'IP Report';
  private excel: any = [];
  private showDownloadButton: boolean = false;
  //general page loading
  private nodata: boolean = true
  private dataSource: MatTableDataSource<any>;
  private allData: IpReportDataModel[];
  private columns: string[] = [
    'userId', 'userName', 'ipAddress', 'activityType', 'date'
  ]
  private userId: string = '';
  private  modalUserData: UserModal ;
  private userID:string='';
  private searchParamsForm: any = null;
  private searchParamUserForm: any = null;
  private showModal: boolean = false

  //user modal details
   showUserModal: boolean = false
   findUser:boolean=false;
  private userModal: UserModal
  //page specific
  private modalData;
  private status: string = ""
  private selectedWithdrawlStatus: string = "";

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
    public iconSet: IconSetService,
    private userService: UserService,
    private reportService: ReportService,
    private excelService: ExcelService,
    private SpinnerService: NgxSpinnerService
  ) {}

  access_permission_read = false
  access_permission_write = false

  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.IP_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          userId: [''],
          ipAddress: [''],
          activityType: [''],
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
  
  alert = ""
  showAlertModal = false;
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
    let userName = JSON.parse(sessionStorage.user).user_name;
    console.log(userId)
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId)
    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(userData => {
        console.log(userData)
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

        console.log(this.modalUserData)
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
    
    if (param.fromTime !== undefined && param.toTime !== undefined) {
      if (param.fromTime > param.toTime) {
        this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
        return false
      } else return true;
    }
    this.closeAlertModal();
    this.showAlertBox("From Date and To Date are mandatory")
    return false;

  }

  get search() { return this.searchParamsForm.controls; }

  getIPReport = () => {
    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new IPReportSearchParam();

    if (this.search.userId.value !== undefined && this.search.userId.value.trim() !== '') {
      param.userId = this.search.userId.value;
      params.set('userId', param.userId.trim());
    }
    if (this.search.activityType.value !== undefined && this.search.activityType.value.trim() !== '') {
      param.activityType = this.search.activityType.value
      params.set('activityType', param.activityType.trim())
    }
    if (this.search.ipAddress.value !== undefined && this.search.ipAddress.value.trim() !== '') {
      param.ipAddress = this.search.ipAddress.value
      params.set('ipAddress', param.ipAddress.trim())
    }

    let fromTime
    let toTime
    if (this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') {
      fromTime = `${this.search.fromTime.value} 00:00:00`;
      param.fromTime = AppConstants.getTimestamp(fromTime).toString();
      params.set('fromTime', param.fromTime)
  }

    if (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '') {
      toTime = `${this.search.toTime.value} 23:59:59`;
      param.toTime = AppConstants.getTimestamp(toTime).toString();
      params.set('toTime', param.toTime)
    }
    let isValid = this.validateSearchFilter(param)
    if (isValid) {
      this.SpinnerService.show();
      this.excel = [];
      this.allData = [];
      this.showDownloadButton = false;
      this.reportService.getIPReport(UrlConstant.getIPReportUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.SpinnerService.hide();
          if (resData.result === Responses.SUCCESS) {

            this.allData = resData.reports;
            if (resData.reports != null) {
              if (resData.reports.length != 0) {
                resData.reports.forEach(row => {
                  this.excel.push(row);
                });
                this.showDownloadButton = true;
              } else {
                this.closeAlertModal();
                this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
              }
              this.nodata = false;
              this.dataSource = new MatTableDataSource(this.allData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
            }
            console.log(this.dataSource);
          } else if (resData.result === Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);

          } else if (resData.result === Responses.INVALID_USER_ID) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_USER_ID);

          } else if (resData.result === Responses.USER_ID_MISSING) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.USER_ID_MISSING_MSG);
          }
        },
          error => {
            this.SpinnerService.hide();
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.ERROR_FINDING_REPORT);
          });
    }
  }

  closeModal = () => {
    this.showUserModal = false
    this.showModal = false
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
