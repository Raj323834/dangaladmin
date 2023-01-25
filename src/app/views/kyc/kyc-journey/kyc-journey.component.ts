import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { KycSearchParam } from '../../../searchParam/kyc/KycSearchParam';
import { ExcelService } from '../../../services/ExcelService';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { AppConstants } from '../../../constant/AppConstants';
import { UrlConstant } from '../../../constant/UrlConstant';
import { PermissionNames } from '../../../constant/PermissionNames';
import { KycJourneyModal } from '../../../models/kyc/KycJourneyModal';
import { UserService } from '../../../services/UserService';
import { KycService } from '../../../services/KycService';




@Component({
  templateUrl: 'kyc-journey.component.html',
  styleUrls: ['kyc-journey.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class KycJourneyComponent {

  private ipAddress: string = '';
  private idResult: string = '';
  private title: string = 'KYC journey';
  findUser: boolean = false;
  private excel: any = [];
  private userID: string = '';
  private showDownloadButton: boolean = false;

  //general page loading

  private dataSource: MatTableDataSource<any>;
  private allData: KycJourneyModal[];
  private columns: string[] = ['userId', 'action', 'documentType', 'documentNumber', 'reason', 'createdAt']

  private userId: string = '';
  private searchParamsForm: any = null;
  private showModal: boolean = false;
  private searchParamUserForm: any = null;

  //user modal details
  showUserModal: boolean = false;
  private userModal: UserModal;

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
    private kycService: KycService,
    private excelService: ExcelService,
    private userService: UserService) { }
  access_permission_read: boolean = false
  access_permission_write: boolean = false

  ngOnInit() {


    const accessPermission = HelperService.getModulePermissions(PermissionNames.KYC_JORNEY);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
      this.kycService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.searchParamsForm = this.formBuilder.group(
        {
          user_id: ['']

        }
      )

      this.searchParamUserForm = this.formBuilder.group(
        {
          search_type: '',
          value: ''
        })
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
    params.set('userId', userId)
    this.userService.getUserByUserId(UrlConstant.getUserByUserIdUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(userData => {
        this.userModal = userData
        this.showUserModal = true;
        if (from == 'userID')
          this.showUserModal = true;
        else if (from == 'link') {
          this.showUserModal = false
        }

      });
  }
  receiveCloseModalMessage($event) {

    if ($event) {
      this.showUserModal = false;
    }
  }
  alert = ""
  showAlertModal = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true;
  }
  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = "";
  }

  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length
    if (paramLength === 1) {
      if (param.userId !== undefined || param.panNumber !== undefined || param.addressProofNumber !== undefined)
        return true;

    } else {
      this.closeAlertModal();
      this.showAlertBox('Enter User ID');


      return false;
    }



  }

  get search() { return this.searchParamsForm.controls; }


  getKYCJourneyDetails = () => {
    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new KycSearchParam()

    if (this.search.user_id.value !== undefined && this.search.user_id.value.trim() !== '') {
      param.userId = this.search.user_id.value
      params.set('userId', param.userId)

    }

    let isValid = this.validateSearchFilter(param)
    if (isValid) {
      this.excel = [];
      this.showDownloadButton = false;
      this.kycService.getKycJourneyDetails(UrlConstant.getKycJourneyDetailsUrl, param.userId, AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(x => {
          if (x.result == Responses.SUCCESS) {
            console.log(x.histories)

            this.allData = x.histories;
            if (x.histories != null) {
              if (x.histories.length != 0) {
                x.histories.forEach(row => {
                  this.excel.push(row);
                });
                this.showDownloadButton = true;

              } else {
                this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
              }

              this.dataSource = new MatTableDataSource(this.allData);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            } else {
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.NO_DATA_FOR_THIS_USER);
            }
          } else if (x.result == Responses.DB_ERROR) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else if (x.result == Responses.USER_NOT_FOUND) {
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
          } else {
            this.showAlertBox(ResponsesDescription.SOMETHING_WENT_WRONG);
          }

        },
          error => {
            this.showAlertBox(error);
          })
    } else
      this.showAlertBox('Enter User ID')



  }

  closeModal = () => {
    this.showUserModal = false
    this.showModal = false
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
