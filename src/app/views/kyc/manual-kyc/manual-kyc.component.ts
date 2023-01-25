import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { AppConstants } from '../../../constant/AppConstants';
import { PermissionNames } from '../../../constant/PermissionNames';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UrlConstant } from '../../../constant/UrlConstant';
import { HelperService } from '../../../services/HelperService';
import { KycService } from '../../../services/KycService';

@Component({
  templateUrl: 'manual-kyc.component.html'
})
export class ManualKycComponent {
  
  private ipAddress:string= '';
  private fileToUpload: File | null = null;
  private fileFrontImage: File | null = null;
  private showModal :boolean= false
  private searchParamsForm:any = null
  private searchParamsUserIDForm:any = null
  private searchParamUserForm :any= null


  private userID:string = ''

  private addFormat :any= null
  private panFormat :any= null
  findUSer :boolean= false
  private addFrontByte = []
  private addBackByte = []
  private panByte = []

  constructor(private formBuilder: FormBuilder,
    private kycService: KycService,
    private spinnerService: NgxSpinnerService) { }

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
  permissions = []
  access_permission_read:boolean=false
  access_permission_write :boolean=false
  
  ngOnInit() {

  
  const accessPermission=HelperService.getModulePermissions(PermissionNames.MANUAL_KYC);
  this.access_permission_read=accessPermission[HelperService.READ];
  this.access_permission_write=accessPermission[HelperService.WRITE];
      this.kycService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
    this.searchParamsForm = this.formBuilder.group(
      {

        address_proof_type: '',
        address_proof_number: '',
        address_front_data: null,
        address_back_data: null,
        address_file_format: this.addFormat,
        pan_number: '',
        pan_file_Format: this.panFormat,
        pan_data: null

      }),
      this.searchParamUserForm = this.formBuilder.group(
        {
          search_type: '',
          value: ''
        })
    this.searchParamsUserIDForm = this.formBuilder.group(
      {
        user_id: '',
      })
}
  readFile(file: File): Observable<string> {
    const sub = new Subject<string>();
    var reader = new FileReader();
    var arr
    reader.onload = () => {
      arr = new Uint8Array(reader.result as ArrayBuffer)
      //  const content: string = reader.result as string;
      sub.next(arr);
      sub.complete();
    };

    reader.readAsArrayBuffer(file);
    return sub.asObservable();
  }

 
  handleFileInput(files: FileList) {
    const file = files.item(0);
    console.log(file.size);

    if ((file.type == 'image/jpeg') || (file.type == 'image/jpg') || (file.type == 'image/png') || (file.type == 'application/pdf')) {
      if (file.type == 'image/jpeg') {
        this.addFormat = "JPEG"
      } else if (file.type == 'image/jpg') {
        this.addFormat = "JPEG"
      } else if (file.type == 'image/png') {
        this.addFormat = "PNG"
      } else if (file.type == 'application/pdf') {
        this.addFormat = "PDF"
      }
      if (file.size > 6300000) {
        this.closeAlertModal();
        this.showAlertBox("File Size needs to be less than 6 MB");
      } else {
        this.readFile(file).subscribe((output) => {
          var i = 0;
          for (var i = 0; i < output.length; i++) {
            this.addFrontByte.push(output[i]);
          }
          console.log(this.addFrontByte);
        })
      }
    } else {

      this.closeAlertModal();
      this.showAlertBox("Not a valid File Format");

    }

    console.log('type', file.type);
  }
  handleFileBackInput(files: FileList) {
    const file = files.item(0);
    if ((file.type == 'image/jpeg') || (file.type == 'image/jpg') || (file.type == 'image/png') || (file.type == 'application/pdf')) {
      if (file.type == 'image/jpeg') {
        this.addFormat = "JPEG"
      } else if (file.type == 'image/jpg') {
        this.addFormat = "JPEG"
      } else if (file.type == 'image/png') {
        this.addFormat = "PNG"
      } else if (file.type == 'application/pdf') {
        this.addFormat = "PDF"
      }
      if (file.size > 6300000) {

        this.closeAlertModal();
        this.showAlertBox("File Size needs to be less than 6 MB");

      } else {

        this.readFile(file).subscribe((output) => {
          var i = 0;
          for (var i = 0; i < output.length; i++) {
            this.addBackByte.push(output[i]);
          }
          console.log(this.addBackByte);
        })

      }
    } else {
      this.closeAlertModal();
      this.showAlertBox("Not a valid File Format");

    }

  }
  uploadPAN(files: FileList) {
    const file = files.item(0);
    if ((file.type == 'image/jpeg') || (file.type == 'image/jpg') || (file.type == 'image/png') || (file.type == 'application/pdf')) {
      if (file.type == 'image/jpeg') {
        this.panFormat = "JPEG"
      } else if (file.type == 'image/jpg') {
        this.panFormat = "JPEG"
      } else if (file.type == 'image/png') {
        this.panFormat = "PNG"
      } else if (file.type == 'application/pdf') {
        this.panFormat = "PDF"
      }
      if (file.size > 6300000) {
        this.closeAlertModal();
        this.showAlertBox("File Size needs to be less than 6 MB");

      } else {
        this.readFile(file).subscribe((output) => {
          var i = 0;
          for (var i = 0; i < output.length; i++) {
            this.panByte.push(output[i]);
          }
          console.log(this.panByte);
        })

      }
    } else {
      this.closeAlertModal();
      this.showAlertBox("Not a valid File Format");

    }

  }

 
  uploadDoc() {
    let userName = JSON.parse(sessionStorage.user).user_name;
    console.log('uploadDoc',this.ipAddress)
    var userID = this.searchParamsUserIDForm.get("user_id").value
    this.searchParamsForm.value['address_proof_type'] = this.searchParamsForm.get("address_proof_type").value
    this.searchParamsForm.value['address_proof_number'] = this.searchParamsForm.get("address_proof_number").value
    this.searchParamsForm.value['address_file_format'] = this.addFormat
    this.searchParamsForm.value['address_front_data'] = this.addFrontByte
    this.searchParamsForm.value['address_back_data'] = this.addBackByte
    this.searchParamsForm.value['pan_number'] = this.searchParamsForm.get("pan_number").value
    this.searchParamsForm.value['pan_data'] = this.panByte
    this.searchParamsForm.value['pan_file_Format'] = this.panFormat
    if (userID == '') {
      this.closeAlertModal();
      this.showAlertBox("User ID cannot be blank");

    } else if (this.searchParamsForm.value['address_proof_type'] == '') {
      this.closeAlertModal();
      this.showAlertBox("Select Proof type");

    } else if (this.searchParamsForm.value['address_proof_number'] == '') {
      this.closeAlertModal();
      this.showAlertBox("Enter a valid Address Proof Number");
    } else if (this.addFrontByte.length == 0) {
      this.closeAlertModal();
      this.showAlertBox("Choose the Front Image");

    } else if (this.addBackByte.length == 0 && (this.searchParamsForm.value['address_proof_type'] != 'DRIVING_LICENSE')) {
      this.closeAlertModal();
      this.showAlertBox("Choose the Back Image");


    } else if (this.searchParamsForm.value['pan_number'] == '' && (this.searchParamsForm.value['pan_number'].length != 10)) {
      this.closeAlertModal();
      this.showAlertBox("Enter a valid pan card number");

    } else if (this.panByte.length == 0) {
      this.closeAlertModal();
      this.showAlertBox("Choose the Pan Image");

    } else {
      console.log(this.searchParamsForm.value)
      this.spinnerService.show();
      this.kycService.uploadKYCDocument(UrlConstant.uploadKYCUrl,userID,this.searchParamsForm.value, this.ipAddress, userName, '' + Date.now())
     .subscribe(resData => {
          console.log(resData)
          this.spinnerService.hide();
          if (resData['result'] == 'INITIATED') {
            this.closeAlertModal();
            this.showAlertBox("KYC PROCESS IS INITIATED");
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          }  else if (resData['result'] == Responses.SUCCESS) {
            this.closeAlertModal();
            this.showAlertBox("KYC UPLOAD IS SUCCESSFUL");
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          } else if (resData['result'] == Responses.USER_NOT_FOUND) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.USER_NOT_FOUND);
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          }else if (resData['result'] == Responses.DB_ERROR) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR);
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          }else if (resData['result'] == Responses.INVALID_REQUEST) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.INVALID_REQUEST);
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          } else if (resData['result'] == 'INVALID_AGE') {
            this.closeAlertModal();
            this.showAlertBox("INVALID AGE");
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          } else if (resData['result'] == 'INVALID_DOCUMENT') {
            this.closeAlertModal();
            this.showAlertBox("INVALID DOCUMENTS");
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          }else if (resData['result'] == 'DUPLICATE_DOCUMENT') {
            this.closeAlertModal();
            this.showAlertBox("DUPLICATE DOCUMENTS")
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          }else if (resData['result'] == 'APPROVED') {
            this.closeAlertModal();
            this.showAlertBox("KYC IS APPROVED");
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          }  else if (resData['result'] == 'INVALID_IMAGE') {
            this.closeAlertModal();
            this.showAlertBox("INVALID IMAGE");
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          } else if (resData['result'] == 'UPS_NOT_REACHABLE') {
            this.closeAlertModal();
            this.showAlertBox("UPS NOT REACHABLE");
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          }  else if (resData['result'] == 'KYC_SERVICE_NOT_REACHABLE') {
            this.closeAlertModal();
            this.showAlertBox("KYC SERVICE NOT REACHABLE")
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          }  else if (resData['result'] == 'API_FAILURE') {
            this.closeAlertModal();
            this.showAlertBox("API_FAILURE");

          } else if (resData['result'] == 'REJECTED') {
            this.closeAlertModal();
            this.showAlertBox("REJECTED");
            this.searchParamsUserIDForm.reset()
            this.searchParamUserForm.reset()
            this.searchParamsForm.reset()
          } else {
            this.closeAlertModal();
            this.showAlertBox("Server error");
          }
        });
    }


  }
  closeFindUserIDModal = () => {

    this.findUSer = false
  }

  findUSerModal() {
    this.findUSer = true;
  }
  receiveFindUserIDCloseModalMessage($event){

    if( $event!=""){
      this.findUSer = false;
      this.userID=$event;
    }else{
      this.findUSer = false;
    }
  }


}
