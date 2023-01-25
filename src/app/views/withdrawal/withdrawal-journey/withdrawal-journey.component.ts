import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from '../../../constant/AppConstants';
import { PermissionNames } from '../../../constant/PermissionNames';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UrlConstant } from '../../../constant/UrlConstant';
import { WithdrawalJourneyModal } from '../../../models/withdrawal/WithdrawalJourneyModal';
import { HelperService } from '../../../services/HelperService';
import { WithdrawalService } from '../../../services/WithdrawalService';


@Component({
  templateUrl: 'withdrawal-journey.component.html',
  styleUrls: ['withdrawal-journey.component.css']
})
export class WithdrawalJourneyComponent implements OnInit {


  private dataSource: MatTableDataSource<any>;
  private allData: WithdrawalJourneyModal[];
  private columns: string[] = ['status', 'created_at'];
  private searchParamsForm: any = null;
  private userName: string = '';


  private paginator: MatPaginator;
  private sort: MatSort;
  private ipAddress: string = '';

  access_permission_read: boolean = false;
  access_permission_write: boolean = false
  alert: string = ""
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
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }

  constructor(
    private formBuilder: FormBuilder,
    private withdrawalService: WithdrawalService,
    private spinnerService: NgxSpinnerService) { }



  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.WITHDRAWAL_JOURNEY);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];

      this.withdrawalService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          w_id: [''],
        }
      )

  }




  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  get search() { return this.searchParamsForm.controls; }


  getWithdrawalJourney = (w_id:string) => {
    this.userName = JSON.parse(sessionStorage.user).user_name;
    this.spinnerService.show();
    if (w_id != null) {
      this.withdrawalService.getWithdrawalJourney(UrlConstant.getWithdrawalJourneyUrl, w_id.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(data => {
          this.spinnerService.hide();
          if (data.result == Responses.SUCCESS) {
            this.allData = data.details
          } else if (data.result == Responses.NO_WITHDRAWALS_EXIST) {
            console.log(data.result);
            this.allData = [];

            this.showAlertBox(ResponsesDescription.NO_WITHDRAWAL_EXIST_MSG);
          }
          this.dataSource = new MatTableDataSource(this.allData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }, error => {
          this.spinnerService.hide();
          if (error === Responses.NO_WITHDRAWALS_EXIST) {
            this.showAlertBox(ResponsesDescription.NO_WITHDRAWAL_EXIST_MSG);
          }
          this.showAlertBox(ResponsesDescription.NOT_A_VALID_WID);
        })
    } else {
      this.showAlertBox(ResponsesDescription.ENTER_WITHDRAWAL_ID);
    }
  }
}
