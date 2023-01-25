import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { HandsPlayedTogetherSearchParam } from '../../../searchParam/collusion/HandsPlayedTogetherSearchParam';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { AppConstants } from '../../../constant/AppConstants';
import { HandsPlayedTogetherReportDataModel } from '../../../models/reports/handsPlayedTogether/handsPlayedTogetherReportDataModel';
import { ReportService } from '../../../services/ReportService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { UserService } from '../../../services/UserService';
import { PermissionNames } from '../../../constant/PermissionNames';


@Component({
  templateUrl: 'handsPlayedTogetherReport.component.html',
  styleUrls: ['handsPlayedTogetherReport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HandsPlayedTogetherReportComponent implements OnInit {
  
  private ipAddress :string= '';
  private title :string= 'Hands Played Together Report';
  private excel:any= [];
  private result:boolean=false;
  private showDownloadButton:boolean = false;
  private dataSource: MatTableDataSource<any>;
  private allData: HandsPlayedTogetherReportDataModel[];
  private columns: string[] = ['userId1','gamesPlayedByUserId1','userId2',  'gamesPlayedByUserId2', 'gamesPlayedTogether']
  private searchParamsForm:any = null;
  private showModal:boolean = false;

  showUserModal:boolean= false
 
  private userModal: UserModal
  //page specific
  
  private searchParamUserForm:any;
  private paginator: MatPaginator;
  private sort: MatSort;

  private userId1:string="";
  private gamesPlayedByUserId1:string="";
  private userId2:string="";
  private gamesPlayedByUserId2:string="";
  private gamesPlayedTogether:string="";

  private userID:string;
  findUser:boolean=false;

  alert = "";
  showAlertModal = false;

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
    private SpinnerService: NgxSpinnerService,
    private userService:UserService) { }

  access_permission_read=false
  access_permission_write=false

  ngOnInit() {

  
  const accessPermission=HelperService.getModulePermissions(PermissionNames.HANDS_PLAYED_TOGETHER_REPORT);
  this.access_permission_read=accessPermission[HelperService.READ];
  this.access_permission_write=accessPermission[HelperService.WRITE];
    this.reportService.getIP().subscribe((res: any) => {
      this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
    });
    this.searchParamsForm = this.formBuilder.group(
      {
        userId1: [''],
        userId2: [''],
        game:[''],
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
    this.showAlertModal = true;
  }

  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = "";
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
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId);
    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
       .subscribe(userData => {
        console.log(userData)
        if (userData.result == Responses.SUCCESS) {
          this.userModal = userData;
          this.showUserModal = true;
          if (from == 'userID')
            this.showUserModal = true;
          else if (from == 'link') {
            this.showUserModal = false;
          }
        } else {
          this.showAlertBox(ResponsesDescription.ERROR_FINDING_DETAILS);
        }
 },
        error => {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.ERROR_FINDING_DETAILS);
        });
  }

  receiveCloseModalMessage($event){
     
    if( $event){
      this.showUserModal=false;
    }
  }
  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length
     const errorMsg= 'All fields are mandatory';
  
  if ((param.game !== undefined &&param.fromTime !== undefined && param.toTime !== undefined && param.userId1 !== undefined && param.userId2 !== undefined)||
  (param.game !== undefined &&param.fromTime !== '' && param.toTime !== '' && param.userId1 !== '' && param.userId2 !== '')) {

      if(param.fromTime>param.toTime){
        this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG)
        return false
      }else {
        return true
    }

  } else {
    this.showAlertBox(errorMsg);
  }
}

  get search() { return this.searchParamsForm.controls; }

  getHandPlayedTogetherReport = () => {
    this.result=false
    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new HandsPlayedTogetherSearchParam()

    if (this.search.userId1.value !== undefined && this.search.userId1.value.trim() !== '') {
      param.userId1 = this.search.userId1.value
      params.set('userId1', param.userId1.trim())
    }
    if (this.search.userId2.value !== undefined && this.search.userId2.value.trim() !== '') {
      param.userId2 = this.search.userId2.value
      params.set('userId2', param.userId2.trim())
    }
    if (this.search.game.value !== undefined && this.search.game.value.trim() !== '') {
      param.game = this.search.game.value
      params.set('game', param.game.trim())
    }


    let fromTime;
    let toTime;
    if (this.search.fromTime.value !== undefined && this.search.fromTime.value.trim() !== '') {
      fromTime = `${this.search.fromTime.value} 00:00:00`;
      param.fromTime =   AppConstants.getTimestamp(fromTime).toString();
      params.set('fromTime', param.fromTime);
    }

    if (this.search.toTime.value !== undefined && this.search.toTime.value.trim() !== '') {
      toTime = `${this.search.toTime.value} 23:59:59`;
      param.toTime =  AppConstants.getTimestamp(toTime).toString();
      params.set('toTime', param.toTime);
  }
    let isValid = this.validateSearchFilter(param)
    if (isValid) {
      this.SpinnerService.show();
      this.excel = [];
      this.allData = [];
      this.showDownloadButton = false;
      this.reportService.getHandsPlayedTogetherReport(UrlConstant.getHandsPlayedTogetherReportUrl,params.toString(), AppConstants.NO_QUERY_PARAM,this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          this.SpinnerService.hide();
          if (resData.result === Responses.SUCCESS) {
            this.result=true;
       
            this.userId1=(resData.userId1!=undefined)?resData.userId1:"";
            this.gamesPlayedByUserId1=(resData.gamesPlayedByUserId1!=undefined)?resData.gamesPlayedByUserId1:"";
            this.userId2=(resData.userId2!=undefined)?resData.userId2:"";
            this.gamesPlayedByUserId2=(resData.gamesPlayedByUserId2!=undefined)?(resData.gamesPlayedByUserId2):"";
            this.gamesPlayedTogether=(resData.gamesPlayedTogether!=undefined)?resData.gamesPlayedTogether:"";

          } else if (resData.result === Responses.DB_ERROR) {
            this.result=false
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (resData.result === Responses.INCORRECT_TIME_INTERVAL) {
            this.result=false
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.FROM_DATE_TO_DATE_MSG);

          }else if (resData.result === Responses.INVALID_DATE_RANGE) {
            this.result=false
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);

          }else if (resData.result === Responses.NOT_FOUND) {
            this.result=false
            this.closeAlertModal();
            this.showAlertBox("Data "+ResponsesDescription.NOT_FOUND);

          }else if (resData.result === Responses.GAME_NOT_FOUND) {
            this.result=false
            this.closeAlertModal();
            this.showAlertBox("Game "+ResponsesDescription.NOT_FOUND);

          }
        },
          error => {
            this.result=false
            this.SpinnerService.hide();
            console.log("ERROR    ", error)
            if (error === 'OK') {
              this.closeAlertModal();
              this.showAlertBox("BAD REQUEST");

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
    this.showUserModal = false
    this.showModal = false;
      this.userID='';
  }
  closeFindUserIDModal = () => {
    this.searchParamUserForm.reset();
    this.findUser = false;
  }
  findUserModal() {
    this.userID='';
    this.findUser = true;
  }

  validateFindUserIDSearchFilter = (params) => {

    if (this.searchParamUserForm.get("search_type").value === '') {
      this.showAlertBox(AppConstants.FIND_USERID_HEADER)
      return false;
    } else if (this.searchParamUserForm.get("search_type").value ===  AppConstants.MOBILE) {
      if ((this.searchParamUserForm.get("value").value === '') || (this.searchParamUserForm.get("value").value === null) ||
        (this.searchParamUserForm.get("value").value == undefined)||(this.searchParamUserForm.get("value").value.length != 10)){

        this.showAlertBox(AppConstants.MOBILE_MSG)
        return false;
      } else {
          params.set('mobile', this.searchParamUserForm.get("value").value)
        return true;
      }
    } else if (this.searchParamUserForm.get("search_type").value === AppConstants.EMAIL) {
      if ((this.searchParamUserForm.get("value").value === '') || (this.searchParamUserForm.get("value").value === null) ||
        (this.searchParamUserForm.get("value").value == undefined)) {
        this.showAlertBox(AppConstants.EMAIL_MSG)
        return false;
      } else {
         params.set('email', this.searchParamUserForm.get("value").value)
        return true;
      }

    }else if (this.searchParamUserForm.get("search_type").value === AppConstants.DANGAL_USER) {
      if ((this.searchParamUserForm.get("value").value === '') || (this.searchParamUserForm.get("value").value === null) ||
        (this.searchParamUserForm.get("value").value == undefined)) {
        this.showAlertBox(AppConstants.DANGAL_USER_MSG)
        return false;
      } else {
         params.set('dangalUser', this.searchParamUserForm.get("value").value)
        return true;
      }

    } else {
      return false;
    }
  }
  getFindUserIDDetails() {

    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();

    let isValid = this.validateFindUserIDSearchFilter(params)
    if (isValid) {
      this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
    .subscribe(resData => {
          if (resData['result'] == Responses.SUCCESS) {
            this.userID = resData['userId']
   
          } else if (resData['result'] == Responses.USER_NOT_FOUND) {
            this.closeAlertModal()
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);

            this.userID = '';
            this.closeFindUserIDModal();

          } else if (resData['result'] == Responses.INTERNAL_SERVER_ERROR) {
            this.userID = '';
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR);

            this.closeFindUserIDModal();
          }else if (resData['result'] == Responses.DB_ERROR) {
            this.userID = '';
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR);

            this.closeModal();
          } else {
            this.userID = '';
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.UNABLE_TO_RETRIEVE_DATA);

          }
        },
        error => {
          this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.ERROR_FINDING_DETAILS);
        });
    }
  }
}
