import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { OpponentPlayedTogetherSearchParam } from '../../../searchParam/reports/opponentPlayedTogether/OpponentPlayedTogetherSearchParam';
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
  selector: 'app-opponentplayedtogetherreport',
  templateUrl: './opponentplayedtogetherreport.component.html',
  styleUrls: ['./opponentplayedtogetherreport.component.scss']
})
export class OpponentplayedtogetherreportComponent implements OnInit {

  private title:string = 'Opponent Played Together Report';
  private excel :any= [];
  private showDownloadButton:boolean = false;
  //general page loading
  private dataSource: MatTableDataSource<any>;
  private columns: string[] = [];

  public userID: string = '';
  private userModal: UserModal;
  public GameIds:any;
  public OpponentUserIds:any;

  private searchParamsForm:any = null;
  private searchParamUserForm :any= null;

  //user modal details
  public showUserModal:boolean = false;
  private message:boolean=false;
  public showReportModal:boolean = false;

  private ipAddress :string= '';
  //page specific

  public responseData  = []

  private paginator: MatPaginator;
  private sort: MatSort;

  findUser: boolean = false;
  alert: string = "";
  showAlertModal: boolean = false;
  showGameIds: boolean = false


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
    const accessPermission = HelperService.getModulePermissions(PermissionNames.OPPONENT_PLAYED_TOGETHER_REPORT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.reportService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          userId: ['',Validators.required],
          game_name: ['',Validators.required],
          fromTime: ['',Validators.required],
          toTime: ['',Validators.required]
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
    this.showAlertModal = true;
  }
  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = "";
    this.showGameIds = false;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, this.title);
  }


  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewGameIds(gameIds,opponentUserId){
    this.showGameIds= true;
    this.OpponentUserIds=opponentUserId;
    this.GameIds = Object.assign([], gameIds);
    console.log(gameIds)
  }

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

  get search() { return this.searchParamsForm.controls; }

  resDatakeyValue = (input) => Object.entries(input).forEach(([key, value]) => {
    this.responseData.push({ key: key, value: value, });
  })

  getOpponentPlayedTogetherReports = () => {

    let userName = JSON.parse(sessionStorage.user).user_name;

    let param = new OpponentPlayedTogetherSearchParam();
    if (this.search.userId.value == undefined || this.search.userId.value.trim() == '') {

      param.userId = '';
      this.searchParamsForm.value['userId'] = '';
    }
    else {
      param.userId = this.search.userId.value;
      this.searchParamsForm.value['userId'] = param.userId.trim();

    }

    if (this.search.game_name.value == undefined && this.search.game_name.value.trim() == '') {
      param.game = '';

      this.searchParamsForm.value['game'] = '';

    } else {
      param.game = this.search.game_name.value;

      this.searchParamsForm.value['game'] = param.game.trim();
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
   
      this.spinnerService.show();
      this.excel = [];
      this.responseData = [];
      this.showDownloadButton = false;
      this.reportService.getOpponentTogetherPlayedReport(UrlConstant.opponentPlayedTogetherUrl, AppConstants.NO_URL_PARAM, param, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.spinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.resDatakeyValue(resData.opponentDetails)
            this.showReportModal = true;
          } else if (resData.result === Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.NOT_FOUND) {
            this.closeAlertModal();
            this.showAlertBox("No records found");
          }
          else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.closeAlertModal();
            this.showAlertBox("Please enter date within 93 days");
          }
        },
          error => {
            this.spinnerService.hide();
            if (error === Responses.DB_ERROR) {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.DB_ERROR);
            }
            else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);
            }
            

          });
    
  }


  closeModal = () => {
    this.showUserModal = false;
  }

  receiveCloseModalMessage($event) {
    this.message = $event;
    if (this.message) {
      this.showUserModal = false;
    }
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
