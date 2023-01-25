import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { OverviewReportDataModel } from '../../../models/reports/overview/OverviewReportDataModel';
import { PermissionNames } from '../../../constant/PermissionNames';
import { AppConstants } from '../../../constant/AppConstants';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';



@Component({
  templateUrl: 'overviewReport.component.html',
  styleUrls: ['overviewReport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class OverviewReportComponent implements OnInit {
  private title = 'OverView Report';
  private excel = [];
  private showDownloadButton = false;
  private todayDate: Date = new Date();
  //general page loading
 
  private dataSource: MatTableDataSource<any>;
  private allData: OverviewReportDataModel[];
  private columns: string[] = [
    'date', 'uniqueLogins', 'registrations', 'newDepositors', 'totalDeposits', 'totalWithdrawals', 'totalRake', 'Details'
  ]
  private searchParamsForm = null
  private showModal = false
  modalData:OverviewReportDataModel;
  private paginator: MatPaginator;
  private sort: MatSort;
  private ipAddress = '';

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

  access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {


    const accessPermission = HelperService.getModulePermissions(PermissionNames.OVERVIEW_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          fromTime: '',
          toTime: ''
        });
    
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }
  alert = "";
  showAlertModal = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }

  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length;
    if (paramLength === 0) {

      return false
    } else if (paramLength === 1) {
      this.closeAlertModal();
      this.showAlertBox(ResponsesDescription.ENTER_BOTH_FROM_TO_DATE);

      return false
    } else if (paramLength === 2) {
      if ((param.fromTime !== '' && param.toTime !== '')) {
        if (param.fromTime > param.toTime) {
          this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
          return false
        } else {
          return true
        }
      }
    }
  }


  get search() { return this.searchParamsForm.controls; }



  getOverViewReportDetails = () => {
    let userName = JSON.parse(sessionStorage.user).user_name;
    let fromTime;
    let toTime;

    if (this.searchParamsForm.get("fromTime").value !== '') {
      fromTime = `${this.searchParamsForm.get("fromTime").value} 00:00:00`;
      this.searchParamsForm.value['fromTime'] = AppConstants.getTimestamp(fromTime).toString();
    } else {
      this.searchParamsForm.value['fromTime'] = ''
      fromTime = ''
    }

    if (this.searchParamsForm.get("toTime").value !== '') {
      toTime = `${this.searchParamsForm.get("toTime").value} 23:59:59`;
      this.searchParamsForm.value['toTime'] = AppConstants.getTimestamp(toTime).toString();
    } else {
      this.searchParamsForm.value['toTime'] = ''
      toTime = ''
    }

    let isValid = this.validateSearchFilter(this.searchParamsForm.value)
    if (isValid) {
      this.SpinnerService.show();
      this.excel = [];

      this.showDownloadButton = false;

      this.reportService.getOverviewReportInfo(UrlConstant.getOverviewReportUrl, AppConstants.NO_URL_PARAM, this.searchParamsForm.value, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.SpinnerService.hide();
          console.log(resData)
          if (resData.result === Responses.SUCCESS) {
            this.allData = resData.reports;
            if (resData.reports != null) {


              if (resData.reports.length != 0) {
                resData.reports.forEach(row => {
                  this.excel.push(row);
                });
                this.showDownloadButton = true;
              }else{
                this.closeAlertModal();
                this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER)
              }
              this.dataSource = new MatTableDataSource(this.allData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;

            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER)

            }
          } else if (resData.result === Responses.DB_ERROR) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);
          }

        },
          error => {
            this.SpinnerService.hide();
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
          })
    }


  }

  closeModal = () => {
    this.showModal = false;
  }

  onBtnClick = (row) => {
    this.showModal = true;
    this.modalData = row;
  }

}

