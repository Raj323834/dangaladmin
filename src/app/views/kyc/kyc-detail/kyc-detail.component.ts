import { Component, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { KycSearchParam } from '../../../searchParam/kyc/KycSearchParam';
import { ExcelService } from '../../../services/ExcelService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UserModal } from '../../../models/user/UserModal';
import { AppConstants } from '../../../constant/AppConstants';
import { PermissionNames } from '../../../constant/PermissionNames';
import { UserService } from '../../../services/UserService';
import { UrlConstant } from '../../../constant/UrlConstant';
import { KycService } from '../../../services/KycService';
import { KycModal } from '../../../models/kyc/KycModal';


@Component({
  templateUrl: 'kyc-detail.component.html',
  styleUrls: ['kyc-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KycDetailComponent implements OnInit {

  private ipAddress :string= '';
  private idResult:string='';
  private title :string= 'KYC';
   findUser:boolean = false
  private excel:any = [];
  private userID:string = '';
  private showDownloadButton:boolean = false;
  private alertBox:boolean = true;
  //general page loading

  private dataSource: MatTableDataSource<any>;
  private allData: KycModal[];
  private columns: string[] = ['userId', 'panNumber', 'idReason', 'addressProofNumber', 'addressProofType', 'addressReason', 'kycStatus', 'createdAt', 'updatedAt'
  ];

  private userId:string = '';
  private searchParamsForm = null;
  private showModal :boolean= false;

  //user modal details
   showUserModal:boolean = false;

  public userModal: UserModal;

  //page specific
  private rotationAmount = 0;
   biggerImage:boolean = false;
  private ReasonAvailable:boolean = false;
  private noReasonFilled:boolean = false;
  private  documentType :string= '';
  private documentNumber:string = '';
  private idReason:string = '';
  private Reason:string='';
  private docApproved:boolean = false;
  private addressApproved :boolean= false;
  private BigPhotUrl:string = '';
  private searchFilter:string = "";
  private photoUrlFront:string = '';
  private photoUrlBack:string = '';
  private searchParamUserForm: any = null;

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
    public userService: UserService,
    private kycService: KycService,
    private renderer: Renderer2,
    private excelService: ExcelService,
    private SpinnerService: NgxSpinnerService) {}

  access_permission_read:boolean=false
  access_permission_write :boolean=false

  ngOnInit() {
    const accessPermission = HelperService.getModulePermissions(PermissionNames.KYC);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
    this.searchParamsForm = this.formBuilder.group(
      {
        user_id: [''],
        pan_num: [''],
        pan_status: [''],
        add_num: [''],
        add_status: [''],
        kyc_status: [''],
        fromTime: [''],
        toTime: ['']
      }
    )

    this.searchParamUserForm = this.formBuilder.group(
      {
        search_type: '',
        value: ''
      })
    if (this.access_permission_read) {
      this.kycService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
   
    }
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

  receiveCloseModalMessage($event){

    if( $event){
      this.showUserModal=false;
    }
  }

  receiveFindUserIDCloseModalMessage($event) {
    if ($event != "") {
      this.findUser = false;
      this.userID = $event;
    } else {
      this.findUser = false;
    }
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

  validateSearchFilter = (param) => {
    let paramLength = Object.keys(param).length;
    let alertMsg = 'Enter one of valid combinations:    \n\n     * Only UserID OR Pan Number OR Address Proof Number      \n     * From Date and To Date    \n     * Pan Status with From Date and To Date         \n      *Address Status with From Date and To Date         \n      *KYC Status with From Date and To Date';

    if (paramLength === 1) {
      if (param.userId !== undefined || param.panNumber !== undefined || param.addressProofNumber !== undefined)
        return true

    }
    if (paramLength === 2) {
      if (param.fromTime !== undefined && param.toTime !== undefined)
        return true
    }
    if (paramLength === 3) {
      if ((
        (param.fromTime !== undefined && param.toTime !== undefined && param.addressStatus !== undefined) ||
        (param.fromTime !== undefined && param.toTime !== undefined && param.panStatus !== undefined) ||
        (param.fromTime !== undefined && param.toTime !== undefined && param.kycStatus !== undefined) ||
        (param.fromTime !== undefined && param.toTime !== undefined)
      ))
        return true
    }
    if (paramLength === 4) {
      if (param.fromTime !== undefined && param.toTime !== undefined && param.addressStatus !== undefined && param.panStatus !== undefined)
        return true
    }
    if (paramLength === 5) {
      if (param.fromTime !== undefined && param.toTime !== undefined && param.addressStatus !== undefined && param.panStatus)
        return true
    }
    if (paramLength === 6) {
      if (param.fromTime !== undefined && param.toTime !== undefined)
        return true
    }
    if (paramLength === 7) {
      if (param.fromTime !== undefined && param.toTime !== undefined)
        return true
    }
    this.closeAlertModal();
    this.showAlertBox(alertMsg);

    return false;

  }

  get search() { return this.searchParamsForm.controls; }


  getKYCDetails = () => {
    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    let param = new KycSearchParam();
    let alertMsg = 'Enter one of valid combinations:    \n\n     * Only UserID OR Pan Number OR Address Proof Number      \n     * From Date and To Date    \n     * Pan Status with From Date and To Date         \n      *Address Status with From Date and To Date';


    if (this.search.user_id.value !== undefined && this.search.user_id.value.trim() !== '') {
      param.userId = this.search.user_id.value
      params.set('userId', param.userId)

    }
    if (this.search.pan_num.value !== undefined && this.search.pan_num.value.trim() !== '') {
      param.panNumber = this.search.pan_num.value
      params.set('panNumber', param.panNumber)
    }
    if (this.search.pan_status.value !== undefined && this.search.pan_status.value.trim() !== '') {
      param.panStatus = this.search.pan_status.value
      params.set('panStatus', param.panStatus)
    }
    if (this.search.add_num.value !== undefined && this.search.add_num.value.trim() !== '') {
      param.addressProofNumber = this.search.add_num.value
      params.set('addressProofNumber', param.addressProofNumber)
    }

    if (this.search.add_status.value !== undefined && this.search.add_status.value.trim() !== '') {
      param.addressStatus = this.search.add_status.value
      params.set('addressStatus', param.addressStatus)
    }
    if (this.search.kyc_status.value !== undefined && this.search.kyc_status.value.trim() !== '') {
      param.kycStatus = this.search.kyc_status.value
      params.set('kycStatus', param.kycStatus)
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
      this.showDownloadButton = false;
      this.kycService.getKycDetails(UrlConstant.getKycDetailsUrl, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
        .subscribe(x => {
          this.SpinnerService.hide();
          if (x.result == Responses.SUCCESS) {

            this.allData = x.documents;
            if (x.documents.length != 0) {
              x.documents.forEach(row => {
                this.excel.push(row);
              });
              this.showDownloadButton = true;

            } else {
              this.showAlertBox(ResponsesDescription.NO_DATA_AVAILABLE_FOR_FILTER);
            }

            this.dataSource = new MatTableDataSource(this.allData);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          } else if (x.result == Responses.DOCUMENT_NOT_FOUND) {
            this.showAlertBox(ResponsesDescription.DOCUMENT_NOT_FOUND_MSG);
          } else if (x.result == Responses.INVALID_DATE_RANGE) {
            this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);
          } else if (x.result == Responses.INVALID_REQUEST) {
            this.showAlertBox(ResponsesDescription.INVALID_REQUEST);
          } else {
            this.showAlertBox(ResponsesDescription.SOMETHING_WENT_WRONG);
          }

        },
          error => {
            this.SpinnerService.hide();
            this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);

          })
    } else
      this.showAlertBox(alertMsg);
  }

  closeModal = () => {
    this.showUserModal = false
    this.Reason = ''
    this.showModal = false
  }

  closeModalBig = () => {
    this.biggerImage = false
  }

  isApproved(idStatus) {
    return idStatus === 'APPROVED' ? true : false;
  }

  approveDocument = (userId) => {
    let userName = JSON.parse(sessionStorage.user).user_name;
    if (this.Reason == "") {
      this.noReasonFilled = true;
    } else {
      const bodyParams = {
        user_id: userId,
        reason: this.Reason,
        document_type: this.documentType,
        document_number: this.documentNumber
      }
      this.kycService.approveDocument(UrlConstant.approveDocumentUrl, AppConstants.NO_URL_PARAM, bodyParams, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          if (resData['result'] == Responses.SUCCESS) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DOCUMENT_APPROVED_SUCCESSFULLY_MSG)
            this.getKYCDetails();
          } else if (resData['result'] == Responses.USER_NOT_FOUND) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND)
          } else if (resData['result'] == Responses.DB_ERROR) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR)
          } else if (resData['result'] == Responses.KYC_SERVICE_NOT_REACHABLE) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.KYC_SERVICE_NOT_REACHABLE_MSG)
          }
        })
      this.closeModal();
      this.noReasonFilled = false
      this.idResult = ''
    }
  }

  declineDocument = (userId) => {
    let userName = JSON.parse(sessionStorage.user).user_name;
    if (this.Reason == "") {
      this.noReasonFilled = true
    } else {
      const bodyParams = {
        user_id: userId,
        reason: this.Reason,
        document_type: this.documentType,
        document_number: this.documentNumber
      }
      this.kycService.declineDocument(UrlConstant.declineDocumentUrl, AppConstants.NO_URL_PARAM, bodyParams, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          if (resData['result'] == Responses.SUCCESS) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DOCUMENT_DECLINED_SUCCESSFULLY_MSG);

            this.getKYCDetails();
          } else if (resData['result'] == Responses.USER_NOT_FOUND) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND)
          } else if (resData['result'] == Responses.DB_ERROR) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR)
          } else if (resData['result'] == Responses.KYC_SERVICE_NOT_REACHABLE) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.KYC_SERVICE_NOT_REACHABLE_MSG);
          }

        })
      this.closeModal();
      this.noReasonFilled = false
      this.idResult = ''
    }
  }

  onPanLinkClick = (userId: string, panLink: string, docType: string, docNumber: string, idResult: string, idReason: string) => {
    this.noReasonFilled = false
    this.rotationAmount = 0;
    this.userId = userId
    this.showModal = true

    this.getUserDetail('link', userId)
    this.photoUrlFront = panLink
    this.photoUrlBack = ''
    this.documentType = docType
    this.documentNumber = docNumber
    this.idResult = idResult

    if (idReason === 'undefined' || idReason === null || idReason === 'null' || idReason === '') {
      this.Reason = ''
      this.ReasonAvailable = false;
    } else {
      this.Reason = idReason
      this.ReasonAvailable = true;
    }
    if (idResult !== 'APPROVED') {
      this.docApproved = false
    } else {
      this.docApproved = true
    }
  }

  onAddressLinkClick = (userId:string, addFront:string, addBack:string,docType:string, docNumber:string, addressResult:string, addressReason:string,) => {
   this.noReasonFilled=false
    this.rotationAmount = 0;
    this.userId = userId
    this.showModal = true
    this.getUserDetail('link', userId)
    this.photoUrlFront = addFront
    this.photoUrlBack = addBack
    this.documentType = docType
    this.documentNumber = docNumber
    this.idResult=addressResult;
    if (addressReason === 'undefined' || addressReason === null || addressReason === 'null'||addressReason==='') {
      this.Reason=''
      this.ReasonAvailable = false;
    } else {
      this.Reason=addressReason
      this.ReasonAvailable = true;
    }
    if (addressResult !== 'APPROVED') {
      this.docApproved = false
    } else {
      this.docApproved = true
    }

  }
  closeFindUserIDModal = () => {

    this.findUser = false
  }
  findUserModal() {
    this.findUser = true;
  }
 
  rotateFrontImage(direction) {
    this.rotationAmount += direction == 'left' ? -90 : 90;
    const image = document.getElementById('frontimage');
    this.renderer.setStyle(
      image,
      'transform',
      `rotate(${this.rotationAmount}deg)`
    )
  }

  rotateBackImage(direction) {
    this.rotationAmount += direction == 'left' ? -90 : 90;
    const image = document.getElementById('backimage');
    this.renderer.setStyle(
      image,
      'transform',
      `rotate(${this.rotationAmount}deg)`
    )
  }

  rotateBigImage(direction) {
    this.rotationAmount += direction == 'left' ? -90 : 90;
    const image = document.getElementById('bigimage');
    this.renderer.setStyle(
      image,
      'transform',
      `rotate(${this.rotationAmount}deg)`
    )
  }
  
  imageClicked(photUrl) {
    this.biggerImage = true;
    this.BigPhotUrl = photUrl;
  }

}