import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { AppConstants } from '../../../constant/AppConstants';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { AdminActivityReportDataModel } from '../../../models/reports/adminActivity/AdminActivityReportDataModel';
import { Responses } from '../../../constant/Responses';
import { AdminActivitySearchParam } from '../../../searchParam/reports/adminActivity/AdminActivitySearchParam';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { PermissionNames } from '../../../constant/PermissionNames';


@Component({
  templateUrl: 'adminActivityReport.component.html',
  styleUrls: ['adminActivityReport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminActivityReportComponent implements OnInit {
  
  //Excel Download
  private title = 'Admin Activity Report';
  private excel:any[] = [];
  private showDownloadButton:boolean = false;
  

  private userName:string=""
  
  private nodata = true
  private dataSource: MatTableDataSource<any>;
  private allData: AdminActivityReportDataModel[];
  private columns: string[] = ['userName', 'ipAddress', 'timestamp', 'action', 'data' ]
  public activityTypes :any[] = [];

  private searchParamsForm :any= null


  private ipAddress = "0.0.0.0"


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
    private reportService: ReportService,
    private excelService: ExcelService,
    private SpinnerService: NgxSpinnerService
  ) {

  }

  permissions = []
  access_permission_read: boolean = false;
  access_permission_write: boolean = false;
  
  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.ADMIN_ACTIVITY_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
    this.getAdminActivityType();
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          activityType: [''],
          fromTime: [''],
          toTime: ['']
        }
      )
  }

  public alert :string= ""
  public showAlertModal:boolean = false;
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
    const errorMsg = 'Enter all the fields.';
    const alerMsg = 'Difference between From Date and To Date should not be greater than 93 days.';
    if (paramLength === 3) {
      if (param.activityType !== undefined && param.fromTime !== undefined && param.toTime !== undefined) {
        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
          return false
        } else if (AppConstants.getDifferenceInDays(param.fromTime, param.toTime) > 93) {
          this.showAlertBox(alerMsg)
          return false;
        } else {
          return true;
        }
      } else {
        this.showAlertBox(errorMsg);
      }
    } else {
      this.closeAlertModal();
      this.showAlertBox(errorMsg);
      return false;
    }
  }

  get search() { return this.searchParamsForm.controls; }

  getAdminActivityReport = () => {
    let storageUserData = JSON.parse(sessionStorage.user);
    this.userName = storageUserData.user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new AdminActivitySearchParam()

    if (this.search.activityType.value !== undefined && this.search.activityType.value.trim() !== '') {
      param.activityType = this.search.activityType.value
      params.set('activityType', param.activityType.trim())
    }

    if (this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') {
      let fromTime = `${this.search.fromTime.value} 00:00:00`
      param.fromTime = AppConstants.getTimestamp(fromTime).toString();
      params.set('fromTime', param.fromTime);
    }

    if (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '') {
      let toTime = `${this.search.toTime.value} 23:59:59`
      param.toTime = AppConstants.getTimestamp(toTime).toString();
      params.set('toTime', param.toTime);

    }
    let isValid = this.validateSearchFilter(param)
    if (isValid) {
      this.SpinnerService.show();
      this.excel = [];
      this.allData = [];
      this.showDownloadButton = false;
      this.reportService.getAdminActivityReport(UrlConstant.getAllAdminActivityUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(resData => {
          this.SpinnerService.hide();
          this.allData = []
          this.closeAlertModal();
          if (resData.result === Responses.SUCCESS) {
            this.allData = resData.reports;
            if (this.allData != null && this.allData.length > 0) {
              this.allData.forEach(row => {
                this.excel.push(row);
              });
              this.showDownloadButton = true;

              this.nodata = false;
              this.dataSource = new MatTableDataSource(this.allData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }

          } else if (resData.result === Responses.NOT_FOUND) {
            this.showAlertBox("No data available ");
          } else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.showAlertBox("Invalid Date Range");
          } else if (resData.result === Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          }

          this.nodata = false;
          this.dataSource = new MatTableDataSource(this.allData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
          error => {
            this.SpinnerService.hide();
            this.showDownloadButton = false;

            this.closeAlertModal();
            this.showAlertBox("There was an error finding the report");
          });
    }
  } 

  activityTypeskeyValue = (input) => Object.entries(input).forEach(([key, value]) => {
    this.activityTypes.push({ key: key, value: value, });
  })
  getAdminActivityType = () => {
    let storageUserData = JSON.parse(sessionStorage.user);
    this.userName = storageUserData.user_name;
    this.reportService.getAdminActivityTypes(UrlConstant.getAdminActivityUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(resData => {
          this.activityTypeskeyValue(resData.activities);
        });
    }
  }

