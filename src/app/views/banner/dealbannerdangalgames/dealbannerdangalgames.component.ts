import { Component, OnInit, isDevMode } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../../services/HelperService';
import { Responses } from '../../../constant/Responses';
import { AppConstants } from '../../../constant/AppConstants';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UrlConstant } from '../../../constant/UrlConstant';
import { PermissionNames } from '../../../constant/PermissionNames';
import { BannerservicesService } from '../../../services/bannerservice';
import { Observable, Subject } from 'rxjs';
import { Banners } from '../../../models/Banners/Banners'
import { environment } from '../../../../environments/environment';
import { BannerNavigation } from '../../../enums/banner/BannerNavigation';

@Component({
  selector: 'app-dealbannerdangalgames',
  templateUrl: './dealbannerdangalgames.component.html',
  styleUrls: ['./dealbannerdangalgames.component.scss']
})

export class DealbannerdangalgamesComponent implements OnInit {

  private paginator: MatPaginator;
  access_permission_read: boolean = false;
  access_permission_write: boolean = false;
  private ipAddress: string = '';
  private allData: Banners[];
  private sort: MatSort;
  private dataSource: MatTableDataSource<any>;
  alert: string = "";
  showAlertModal: boolean = false;
  private searchParamsForm: any = null;
  private addFormat: any = null;
  private imageByte = [];
  public rankvalidationArray: any[] = [];
  public bannerdatalengthcheck: number;

  public data: any;
  public source = "";
  public bannerType = "DEALS"
  public url: any;
  public msg = "";
  public requestParameters = {};
  public bannersData: any[] = [];
  public isValid = false;
  public urlimageRead1: string = '';
  public urlimageRead2: string = '';
  public urlimageRead3: string = '';
  public urlimageRead4: string = '';
  public urlimageRead5: string = '';
  public urlimageRead6: string = '';
  public urlimageRead7: string = '';
  public urlimageRead8: string = '';
  public urlimageRead9: string = '';
  public urlimageRead10: string = '';
  public BannerNavigation = Object.values(BannerNavigation);

  //declaration of variable 
  public rank1: string = '';
  public benefits1: string = "";
  public termsAndConditions1: string = "";
  public url1: string = "";
  public imageByte1 = [];
  public code1 = "";
  public navigateTo1 = ""


  public rank2: string = '';
  public benefits2: string = "";
  public termsAndConditions2: string = "";
  public url2: string = "";
  public imageByte2 = [];
  public code2 = "";
  public navigateTo2 = ""


  public rank3: string = '';
  public benefits3: string = "";
  public termsAndConditions3: string = "";
  public url3: string = "";
  public imageByte3 = [];
  public code3 = "";
  public navigateTo3 = "";


  public rank4: string = '';
  public benefits4: string = "";
  public termsAndConditions4: string = "";
  public url4: string = "";
  public imageByte4 = [];
  public code4 = "";
  public navigateTo4 = "";


  public rank5: string = '';
  public benefits5: string = "";
  public termsAndConditions5: string = "";
  public url5: string = "";
  public imageByte5 = [];
  public code5 = "";
  public navigateTo5 = "";


  public rank6: string = '';
  public benefits6: string = "";
  public termsAndConditions6: string = "";
  public url6: string = "";
  public imageByte6 = [];
  public code6 = "";
  public navigateTo6 = "";

  public rank7: string = '';
  public benefits7: string = "";
  public termsAndConditions7: string = "";
  public url7: string = "";
  public imageByte7 = [];
  public code7 = "";
  public navigateTo7 = "";


  public rank8: string = '';
  public benefits8: string = "";
  public termsAndConditions8: string = "";
  public url8: string = "";
  public imageByte8 = [];
  public code8 = "";
  public navigateTo8 = "";


  public rank9: string = '';
  public benefits9: string = "";
  public termsAndConditions9: string = "";
  public url9: string = "";
  public imageByte9 = [];
  public code9 = "";
  public navigateTo9 = "";


  public rank10: string = '';
  public benefits10: string = "";
  public termsAndConditions10: string = "";
  public url10: string = "";
  public imageByte10 = [];
  public code10 = "";
  public navigateTo10 = "";
  public apiurltest: string;

  public rankNotZerocheck: any;
  public result: any;
  public permission: boolean;

  /**for swithing different between dev and production */
  ProdOrDevPermission() {
    this.apiurltest = environment.apiKey;
    if (this.apiurltest == 'devKey') {
      this.source = 'DEV'
      this.getBannerDetails();
    }
    else if (this.apiurltest == 'prodKey') {
      this.source = 'PROD'
      this.getBannerDetails();
    }
    else {
      this.showAlertBox('please contact admin or developer')
    }
  }

  handleImage(files: FileList, imageVariable: number) {
    const file = files.item(0);
    const maxFileSize: number = 1100000;
    let jpegImageType: string = 'image/jpeg';
    let jpgImageType: string = 'image/jpg';
    let pngImageType: string = 'image/png';
    let webPImageType: string = 'image/webp';
    if ((file.type == jpegImageType) || (file.type == jpgImageType) || (file.type == pngImageType) || (file.type == webPImageType)) {
      if (file.type == jpegImageType) {
        this.addFormat = "JPEG"
      } else if (file.type == jpgImageType) {
        this.addFormat = "JPEG"
      } else if (file.type == pngImageType) {
        this.addFormat = "PNG"
      } else if (file.type == webPImageType) {
        this.addFormat = "WEBP"
      }
      if (file.size > maxFileSize) {
        this.closeAlertModal();
        this.showAlertBox("File Size needs to be less than 1 MB");
      } else {
        this.readFile(file).subscribe((output) => {
          let x: number = 0;
          for (x = 0; x < output.length; x++) {
            if (imageVariable == 1) { this.imageByte1.push(output[x]); }
            if (imageVariable == 2) { this.imageByte2.push(output[x]); }
            if (imageVariable == 3) { this.imageByte3.push(output[x]); }
            if (imageVariable == 4) { this.imageByte4.push(output[x]); }
            if (imageVariable == 5) { this.imageByte5.push(output[x]); }
            if (imageVariable == 6) { this.imageByte6.push(output[x]); }
            if (imageVariable == 7) { this.imageByte7.push(output[x]); }
            if (imageVariable == 8) { this.imageByte8.push(output[x]); }
            if (imageVariable == 9) { this.imageByte9.push(output[x]); }
            if (imageVariable == 10) { this.imageByte10.push(output[x]); }
          }
        })
      }
    } else {
      this.closeAlertModal();
      this.showAlertBox("Not a Valid Format, Allowed formats are JPG/JPEG/PNG/WEBP");
    }
  }

  selectFile(event: any, imageVariable: number) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'Pls select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;

      if (imageVariable == 1) { this.urlimageRead1 = this.url }
      else if (imageVariable == 2) { this.urlimageRead2 = this.url }
      else if (imageVariable == 3) { this.urlimageRead3 = this.url }
      else if (imageVariable == 4) { this.urlimageRead4 = this.url }
      else if (imageVariable == 5) { this.urlimageRead5 = this.url }
      else if (imageVariable == 6) { this.urlimageRead6 = this.url }
      else if (imageVariable == 7) { this.urlimageRead7 = this.url }
      else if (imageVariable == 8) { this.urlimageRead8 = this.url }
      else if (imageVariable == 9) { this.urlimageRead9 = this.url }
      else if (imageVariable == 10) { this.urlimageRead10 = this.url }
    }
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

  //**GET CODE FROM HERE  */


  constructor(private bannerService: BannerservicesService,
    private spinnerService: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.ProdOrDevPermission();
    const accessPermission = HelperService.getModulePermissions(PermissionNames.BANNER_MANAGEMENT);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];

      this.bannerService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.dataSource.paginator = this.paginator;

  }


  getBannerDetails = () => {
    this.spinnerService.show();
    let userName = JSON.parse(sessionStorage.user).user_name;
    let params: URLSearchParams = new URLSearchParams();
    params.set('source', this.source);
    params.set('type', this.bannerType);
    this.bannerService.gethomebanner(UrlConstant.dealsbanner, params.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(resData => {
        console.log(resData)
        this.spinnerService.hide();
        if (resData['result'] == Responses.SUCCESS) {
          //binding data individual
          this.allData = resData.banners;
          this.rank1 = resData.banners[0].rank;
          this.benefits1 = resData.banners[0].benefits;
          this.url1 = resData.banners[0].url;
          this.termsAndConditions1 = resData.banners[0].terms;
          this.code1 = resData.banners[0].code;
          this.navigateTo1 = resData.banners[0].navigateTo;

          this.rank2 = resData.banners[1].rank;
          this.benefits2 = resData.banners[1].benefits;
          this.url2 = resData.banners[1].url;
          this.termsAndConditions2 = resData.banners[1].terms;
          this.code2 = resData.banners[1].code;
          this.navigateTo2 = resData.banners[1].navigateTo;

          this.rank3 = resData.banners[2].rank;
          this.benefits3 = resData.banners[2].benefits;
          this.url3 = resData.banners[2].url;
          this.termsAndConditions3 = resData.banners[2].terms;
          this.code3 = resData.banners[2].code;
          this.navigateTo3 = resData.banners[2].navigateTo;

          this.rank4 = resData.banners[3].rank;
          this.benefits4 = resData.banners[3].benefits;
          this.url4 = resData.banners[3].url;
          this.termsAndConditions4 = resData.banners[3].terms;
          this.code4 = resData.banners[3].code;
          this.navigateTo4 = resData.banners[3].navigateTo;

          this.rank5 = resData.banners[4].rank;
          this.benefits5 = resData.banners[4].benefits;
          this.url5 = resData.banners[4].url;
          this.termsAndConditions5 = resData.banners[4].terms;
          this.code5 = resData.banners[4].code;
          this.navigateTo5 = resData.banners[4].navigateTo;

          this.rank6 = resData.banners[5].rank;
          this.benefits6 = resData.banners[5].benefits;
          this.url6 = resData.banners[5].url;
          this.termsAndConditions6 = resData.banners[5].terms;
          this.code6 = resData.banners[5].code;
          this.navigateTo6 = resData.banners[5].navigateTo;

          this.rank7 = resData.banners[6].rank;
          this.benefits7 = resData.banners[6].benefits;
          this.url7 = resData.banners[6].url;
          this.termsAndConditions7 = resData.banners[6].terms;
          this.code7 = resData.banners[6].code;
          this.navigateTo7 = resData.banners[6].navigateTo;

          this.rank8 = resData.banners[7].rank;
          this.benefits8 = resData.banners[7].benefits;
          this.url8 = resData.banners[7].url;
          this.termsAndConditions8 = resData.banners[7].terms;
          this.code8 = resData.banners[7].code;
          this.navigateTo8 = resData.banners[7].navigateTo;

          this.rank9 = resData.banners[8].rank;
          this.benefits9 = resData.banners[8].benefits;
          this.url9 = resData.banners[8].url;
          this.termsAndConditions9 = resData.banners[8].terms;
          this.code9 = resData.banners[8].code;
          this.navigateTo9 = resData.banners[8].navigateTo;

          this.rank10 = resData.banners[9].rank;
          this.benefits10 = resData.banners[9].benefits;
          this.url10 = resData.banners[9].url;
          this.termsAndConditions10 = resData.banners[9].terms;
          this.code10 = resData.banners[9].code;
          this.navigateTo10 = resData.banners[9].navigateTo;

        } else if (resData['result'] == Responses.DB_ERROR) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.DB_ERROR);
        } else if (resData['result'] == Responses.NOT_FOUND) {
          this.allData = [];
          this.showAlertBox("Banners not founded");
        } else {
          this.closeAlertModal();
          this.showAlertBox(ResponsesDescription.SERVER_ERROR_MSG)
        }
        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.sort = this.sort;
      },
        error => {
          this.spinnerService.hide();
          this.showAlertBox(ResponsesDescription.SERVER_ERROR_MSG)
        });
  }

  createRequestBodyandValidations() {
    this.requestParameters['source'] = this.source;
    this.requestParameters['bannerType'] = this.bannerType;

    if ((this.rank1 != "" && this.rank1 != null) && (this.imageByte1 != null && this.imageByte1.length > 0) && (this.navigateTo1 != null && this.navigateTo1 != "") && (this.benefits1 != null && this.benefits1 != "") && (this.termsAndConditions1 != null && this.termsAndConditions1 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank1))
      this.bannersData.push({ rank: parseFloat(this.rank1), bannerData: this.imageByte1, benefits: this.benefits1.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions1.toString(), code: this.code1, navigateTo: this.navigateTo1 });
    } else if ((this.rank1 != null) && (this.url1 != '' && this.url1 != null) && (this.navigateTo1 != null && this.navigateTo1 != "") && (this.benefits1 != null && this.benefits1 != "") && (this.termsAndConditions1 != null && this.termsAndConditions1 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank1))
      this.bannersData.push({ rank: parseFloat(this.rank1), url: this.url1, benefits: this.benefits1.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions1.toString(), code: this.code1, navigateTo: this.navigateTo1 });
    } else if ((this.rank1 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 1');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }


    if ((this.rank2 != "" && this.rank2 != null) && (this.imageByte2 != null && this.imageByte2.length > 0) && (this.navigateTo2 != null && this.navigateTo2 != "") && (this.benefits2 != null && this.benefits2 != "") && (this.termsAndConditions2 != null && this.termsAndConditions2 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank2))
      this.bannersData.push({ rank: parseFloat(this.rank2), bannerData: this.imageByte2, benefits: this.benefits2.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions2.toString(), code: this.code2, navigateTo: this.navigateTo2 });
    } else if ((this.rank2 != null) && (this.url2 != '' && this.url2 != null) && (this.navigateTo2 != null && this.navigateTo2 != "") && (this.benefits2 != null && this.benefits2 != "") && (this.termsAndConditions2 != null && this.termsAndConditions2 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank2))
      this.bannersData.push({ rank: parseFloat(this.rank2), url: this.url2, benefits: this.benefits2.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions2.toString(), code: this.code2, navigateTo: this.navigateTo2 });
    } else if ((this.rank2 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 2');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    if ((this.rank3 != "" && this.rank3 != null) && (this.imageByte3 != null && this.imageByte3.length > 0) && (this.navigateTo3 != null && this.navigateTo3 != "") && (this.benefits3 != null && this.benefits3 != "") && (this.termsAndConditions3 != null && this.termsAndConditions3 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank3))
      this.bannersData.push({ rank: parseFloat(this.rank3), bannerData: this.imageByte3, benefits: this.benefits3.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions3.toString(), code: this.code3, navigateTo: this.navigateTo3 });
    } else if ((this.rank3 != null) && (this.url3 != '' && this.url3 != null) && (this.navigateTo3 != null && this.navigateTo3 != "") && (this.benefits3 != null && this.benefits3 != "") && (this.termsAndConditions3 != null && this.termsAndConditions3 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank3))
      this.bannersData.push({ rank: parseFloat(this.rank3), url: this.url3, benefits: this.benefits3.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions3.toString(), code: this.code3, navigateTo: this.navigateTo3 });
    } else if ((this.rank3 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 3');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    if ((this.rank4 != "" && this.rank4 != null) && (this.imageByte4 != null && this.imageByte4.length > 0) && (this.navigateTo4 != null && this.navigateTo4 != "") && (this.benefits4 != null && this.benefits4 != "") && (this.termsAndConditions4 != null && this.termsAndConditions4 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank4))
      this.bannersData.push({ rank: parseFloat(this.rank4), bannerData: this.imageByte4, benefits: this.benefits4.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions4.toString(), code: this.code4, navigateTo: this.navigateTo4 });
    } else if ((this.rank4 != null) && (this.url4 != '' && this.url4 != null) && (this.navigateTo4 != null && this.navigateTo4 != "") && (this.benefits4 != null && this.benefits4 != "") && (this.termsAndConditions4 != null && this.termsAndConditions4 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank4))
      this.bannersData.push({ rank: parseFloat(this.rank4), url: this.url4, benefits: this.benefits4.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions4.toString(), code: this.code4, navigateTo: this.navigateTo4 });
    } else if ((this.rank4 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 4');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    if ((this.rank5 != "" && this.rank5 != null) && (this.imageByte5 != null && this.imageByte5.length > 0) && (this.navigateTo5 != null && this.navigateTo5 != "") && (this.benefits5 != null && this.benefits5 != "") && (this.termsAndConditions5 != null && this.termsAndConditions5 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank5))
      this.bannersData.push({ rank: parseFloat(this.rank5), bannerData: this.imageByte5, benefits: this.benefits5.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions5.toString(), code: this.code5, navigateTo: this.navigateTo5 });
    } else if ((this.rank5 != null) && (this.url5 != '' && this.url5 != null) && (this.navigateTo5 != null && this.navigateTo5 != "") && (this.benefits5 != null && this.benefits5 != "") && (this.termsAndConditions5 != null && this.termsAndConditions5 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank5))
      this.bannersData.push({ rank: parseFloat(this.rank5), url: this.url5, benefits: this.benefits5.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions5.toString(), code: this.code5, navigateTo: this.navigateTo5 });
    } else if ((this.rank5 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 5');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    if ((this.rank6 != "" && this.rank6 != null) && (this.imageByte6 != null && this.imageByte6.length > 0) && (this.navigateTo6 != null && this.navigateTo6 != "") && (this.benefits6 != null && this.benefits6 != "") && (this.termsAndConditions6 != null && this.termsAndConditions6 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank6))
      this.bannersData.push({ rank: parseFloat(this.rank6), bannerData: this.imageByte6, benefits: this.benefits6.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions6.toString(), code: this.code6, navigateTo: this.navigateTo6 });
    } else if ((this.rank6 != null) && (this.url6 != '' && this.url6 != null) && (this.navigateTo6 != null && this.navigateTo6 != "") && (this.benefits6 != null && this.benefits6 != "") && (this.termsAndConditions6 != null && this.termsAndConditions6 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank6))
      this.bannersData.push({ rank: parseFloat(this.rank6), url: this.url6, benefits: this.benefits6.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions6.toString(), code: this.code6, navigateTo: this.navigateTo6 });
    } else if ((this.rank6 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 6');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    if ((this.rank7 != "" && this.rank7 != null) && (this.imageByte7 != null && this.imageByte7.length > 0) && (this.navigateTo7 != null && this.navigateTo7 != "") && (this.benefits7 != null && this.benefits7 != "") && (this.termsAndConditions7 != null && this.termsAndConditions7 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank7))
      this.bannersData.push({ rank: parseFloat(this.rank7), bannerData: this.imageByte7, benefits: this.benefits7.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions7.toString(), code: this.code7, navigateTo: this.navigateTo7 });
    } else if ((this.rank7 != null) && (this.url7 != '' && this.url7 != null) && (this.navigateTo7 != null && this.navigateTo7 != "") && (this.benefits7 != null && this.benefits7 != "") && (this.termsAndConditions7 != null && this.termsAndConditions7 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank7))
      this.bannersData.push({ rank: parseFloat(this.rank7), url: this.url7, benefits: this.benefits7.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions7.toString(), code: this.code7, navigateTo: this.navigateTo7 });
    } else if ((this.rank7 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 7');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    if ((this.rank8 != "" && this.rank8 != null) && (this.imageByte8 != null && this.imageByte8.length > 0) && (this.navigateTo8 != null && this.navigateTo8 != "") && (this.benefits8 != null && this.benefits8 != "") && (this.termsAndConditions8 != null && this.termsAndConditions8 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank8))
      this.bannersData.push({ rank: parseFloat(this.rank8), bannerData: this.imageByte8, benefits: this.benefits8.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions8.toString(), code: this.code8, navigateTo: this.navigateTo8 });
    } else if ((this.rank8 != null) && (this.url8 != '' && this.url8 != null) && (this.navigateTo8 != null && this.navigateTo8 != "") && (this.benefits8 != null && this.benefits8 != "") && (this.termsAndConditions8 != null && this.termsAndConditions8 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank8))
      this.bannersData.push({ rank: parseFloat(this.rank8), url: this.url8, benefits: this.benefits8.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions8.toString(), code: this.code8, navigateTo: this.navigateTo8 });
    } else if ((this.rank8 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 8');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    if ((this.rank9 != "" && this.rank9 != null) && (this.imageByte9 != null && this.imageByte9.length > 0) && (this.navigateTo9 != null && this.navigateTo9 != "") && (this.benefits9 != null && this.benefits9 != "") && (this.termsAndConditions9 != null && this.termsAndConditions9 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank9))
      this.bannersData.push({ rank: parseFloat(this.rank9), bannerData: this.imageByte9, benefits: this.benefits9.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions9.toString(), code: this.code9, navigateTo: this.navigateTo9 });
    } else if ((this.rank9 != null) && (this.url9 != '' && this.url9 != null) && (this.navigateTo9 != null && this.navigateTo9 != "") && (this.benefits9 != null && this.benefits9 != "") && (this.termsAndConditions9 != null && this.termsAndConditions9 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank9))
      this.bannersData.push({ rank: parseFloat(this.rank9), url: this.url9, benefits: this.benefits9.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions9.toString(), code: this.code9, navigateTo: this.navigateTo9 });
    } else if ((this.rank9 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 9');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    if ((this.rank10 != "" && this.rank10 != null) && (this.imageByte10 != null && this.imageByte10.length > 0) && (this.navigateTo10 != null && this.navigateTo10 != "") && (this.benefits10 != null && this.benefits10 != "") && (this.termsAndConditions10 != null && this.termsAndConditions10 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank10))
      this.bannersData.push({ rank: parseFloat(this.rank10), bannerData: this.imageByte10, benefits: this.benefits10.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions10.toString(), code: this.code10, navigateTo: this.navigateTo10 });
    } else if ((this.rank10 != null) && (this.url10 != '' && this.url10 != null) && (this.navigateTo10 != null && this.navigateTo10 != "") && (this.benefits10 != null && this.benefits10 != "") && (this.termsAndConditions10 != null && this.termsAndConditions10 != "")) {
      this.rankvalidationArray.push(parseFloat(this.rank10))
      this.bannersData.push({ rank: parseFloat(this.rank10), url: this.url10, benefits: this.benefits10.replace(/\n/g, ''), termsAndConditions: this.termsAndConditions10.toString(), code: this.code10, navigateTo: this.navigateTo10 });
    } else if ((this.rank10 == "")) {
    } else {
      this.showAlertBox('Enter all the fields of this ROW 10');
      this.bannersData = []
      this.rankvalidationArray = []
      return
    }

    this.result = this.findMissingNumbers(this.rankvalidationArray);

    if (this.result.length >= 0) {
      this.showAlertBox("please check all the missing rank");
    }
    this.requestParameters['banners'] = this.bannersData;
    console.log(this.bannersData)
  }




  findMissingNumbers(arr) {
    // Create sparse array with a 1 at each index equal to a value in the input.
    var sparse = arr.reduce((sparse, i) => (sparse[i] = 1, sparse), []);
    // Create array 0..highest number, and retain only those values for which
    // the sparse array has nothing at that index (and eliminate the 0 value).
    return [...sparse.keys()].filter(i => i && !sparse[i]);
  }

  validateBannerDetails() {
    this.isValid = true;
    if ((this.rank1 == "" && this.rank1 != null)) { }
    else if ((this.rank1 != "" && this.rank1 != null) && (this.rank1 == this.rank2) || (this.rank1 == this.rank3) || (this.rank1 == this.rank4) || (this.rank1 == this.rank5) || (this.rank1 == this.rank6)
      || (this.rank1 == this.rank7) || (this.rank1 == this.rank8) || (this.rank1 == this.rank9) || (this.rank1 == this.rank10)
    ) {
      this.showAlertBox("Please check row 2, fill in the rank correctly ");
      this.isValid = false;
    }

    if ((this.rank2 == "" && this.rank2 != null)) { }
    else if ((this.rank2 != "" && this.rank2 != null) && (this.rank2 == this.rank1) || (this.rank2 == this.rank3) || (this.rank2 == this.rank4) || (this.rank2 == this.rank5) || (this.rank2 == this.rank6)
      || (this.rank2 == this.rank7) || (this.rank2 == this.rank8) || (this.rank2 == this.rank9) || (this.rank2 == this.rank10)
    ) {
      this.showAlertBox("Please check row 2 , fill in the rank correctly");
      this.isValid = false;
    }

    if ((this.rank3 == "" && this.rank3 != null)) { }
    else if ((this.rank3 != "" && this.rank3 != null) && (this.rank3 == this.rank1) || (this.rank3 == this.rank2) || (this.rank3 == this.rank4) || (this.rank3 == this.rank5) || (this.rank3 == this.rank6)
      || (this.rank3 == this.rank7) || (this.rank3 == this.rank8) || (this.rank3 == this.rank9) || (this.rank3 == this.rank10)
    ) {
      this.showAlertBox("Please check row 3 , fill in the rank correctly");
      this.isValid = false;
    }

    if ((this.rank4 == "" && this.rank4 != null)) { }
    else if ((this.rank4 != "" && this.rank4 != null) && (this.rank4 == this.rank1) || (this.rank4 == this.rank3) || (this.rank4 == this.rank2) || (this.rank4 == this.rank5) || (this.rank4 == this.rank6)
      || (this.rank4 == this.rank7) || (this.rank4 == this.rank8) || (this.rank4 == this.rank9) || (this.rank4 == this.rank10)
    ) {
      this.showAlertBox("Please check row 4 , fill in the rank correctly");
      this.isValid = false;
    }

    if ((this.rank5 == "" && this.rank5 != null)) { }
    else if ((this.rank5 != "" && this.rank5 != null) && (this.rank5 == this.rank1) || (this.rank5 == this.rank3) || (this.rank5 == this.rank2) || (this.rank5 == this.rank4) || (this.rank5 == this.rank6)
      || (this.rank5 == this.rank7) || (this.rank5 == this.rank8) || (this.rank5 == this.rank9) || (this.rank5 == this.rank10)
    ) {
      this.showAlertBox("Please check row 5 , fill in the rank correctly");
      this.isValid = false;
    }

    if ((this.rank6 == "" && this.rank6 != null)) { }
    else if ((this.rank6 != "" && this.rank6 != null) && (this.rank6 == this.rank2) || (this.rank6 == this.rank3) || (this.rank6 == this.rank4) || (this.rank6 == this.rank5) || (this.rank6 == this.rank1)
      || (this.rank6 == this.rank7) || (this.rank6 == this.rank8) || (this.rank6 == this.rank9) || (this.rank6 == this.rank10)
    ) {
      this.showAlertBox("Please check row 6 , fill in the rank correctly");
      this.isValid = false;
    }

    if ((this.rank7 == "" && this.rank7 != null)) { }
    else if ((this.rank7 != "" && this.rank7 != null) && (this.rank7 != "" && this.rank7 != null) && (this.rank7 == this.rank1) || (this.rank7 == this.rank3) || (this.rank7 == this.rank4) || (this.rank7 == this.rank5) || (this.rank7 == this.rank6)
      || (this.rank7 == this.rank2) || (this.rank7 == this.rank8) || (this.rank7 == this.rank9) || (this.rank7 == this.rank10)
    ) {
      this.showAlertBox("Please check row 7 , fill in the rank correctly");
      this.isValid = false;
    }

    if ((this.rank8 == "" && this.rank8 != null)) { }
    else if ((this.rank8 != "" && this.rank8 != null) && (this.rank8 == this.rank1) || (this.rank8 == this.rank2) || (this.rank8 == this.rank4) || (this.rank8 == this.rank5) || (this.rank8 == this.rank6)
      || (this.rank8 == this.rank7) || (this.rank8 == this.rank3) || (this.rank8 == this.rank9) || (this.rank8 == this.rank10)
    ) {
      this.showAlertBox("Please check row 8 , fill in the rank correctly");
      this.isValid = false;
    }

    if ((this.rank9 == "" && this.rank9 != null)) { }
    else if ((this.rank9 == "" && this.rank9 != null) && (this.rank9 == this.rank1) || (this.rank9 == this.rank3) || (this.rank9 == this.rank2) || (this.rank9 == this.rank5) || (this.rank9 == this.rank6)
      || (this.rank9 == this.rank7) || (this.rank9 == this.rank8) || (this.rank9 == this.rank4) || (this.rank9 == this.rank10)
    ) {
      this.showAlertBox("Please check row 9 , fill in the rank correctly");
      this.isValid = false;
    }

    if ((this.rank10 == "" && this.rank10 != null)) { }
    else if ((this.rank10 != "" && this.rank10 != null) && (this.rank10 == this.rank1) || (this.rank10 == this.rank2) || (this.rank10 == this.rank3) || (this.rank10 == this.rank4) || (this.rank10 == this.rank5)
      || (this.rank10 == this.rank7) || (this.rank10 == this.rank8) || (this.rank10 == this.rank9) || (this.rank10 == this.rank6)
    ) {
      this.showAlertBox("Please check row 10, fill in the rank correctly ");
      this.isValid = false;
    }

    return this.isValid
  }


  updateBannerNetworkCall = () => {
    if (this.validateBannerDetails()) {
      this.createRequestBodyandValidations();
      let userName = JSON.parse(sessionStorage.user).user_name;
      this.rankNotZerocheck = this.result.length
      this.bannerdatalengthcheck = this.bannersData.length
      if (this.bannerdatalengthcheck != 0) {
        if (this.rankNotZerocheck == 0) {
          this.showAlertModal = false;
          this.spinnerService.show();
          this.bannerService.insertbanner(UrlConstant.insertbanner, '', this.requestParameters, this.ipAddress, userName, '' + Date.now())
            .subscribe(resData => {
              console.log("resdata" + resData)
              this.spinnerService.hide();
              if (resData['result'] == Responses.SUCCESS) {
                this.resetAll();
                this.spinnerService.hide();

                this.getBannerDetails();
                this.showAlertBox("Banner has been updated Successfully")
              } else if (resData['result'] == Responses.DB_ERROR) {
                this.resetAll();
                this.showAlertBox(ResponsesDescription.DB_ERROR);
              }
              else if (resData['result'] == Responses.BANNER_NOT_FOUND) {
                this.resetAll();
                this.showAlertBox("Banners not found for upload");
              } else if (resData['result'] == Responses.BAD_REQUEST) {
                this.resetAll();
                this.showAlertBox("Bad Request, Please check and retry");
              } else {
                this.closeAlertModal();
                this.getBannerDetails();
                this.showAlertBox("Bad request, Please check all the missing fields")
                this.resetAll();
              }

              this.dataSource.sort = this.sort;
            },
              error => {
                this.resetAll();
                this.spinnerService.hide();
                this.showAlertBox(ResponsesDescription.SERVER_ERROR_MSG)
              });
        }
        else {
          this.showAlertBox("please check all the missing ranks");
          this.isValid = false;
          this.spinnerService.hide();
          this.rankvalidationArray = [];
          this.bannersData = [];
        }
      } else {
        this.showAlertBox("Minimun 1 banner is required or validate all missing fields");
        this.isValid = false;
        this.spinnerService.hide();
        this.rankvalidationArray = [];
        this.bannersData = [];
      }
    }
  }

  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }

  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }

 
  resetAll() {
    /*pass variable for reset*/
    this.reset(1);
    this.reset(2);
    this.reset(3);
    this.reset(4);
    this.reset(5);
    this.reset(6);
    this.reset(7);
    this.reset(8);
    this.reset(9);
    this.reset(10);
    this.bannersData = [];
    this.rankvalidationArray = []
  }

  reset(variable: number) {
    /*intilization of variable */
    if (variable == 1) { this.rank1 = ''; this.url1 = ""; this.imageByte1 = []; this.code1 = ""; this.navigateTo1 = ""; this.benefits1 = ""; this.termsAndConditions1 = ""; this.urlimageRead1 = '' }
    if (variable == 2) { this.rank2 = ''; this.url2 = ""; this.imageByte2 = []; this.code2 = ""; this.navigateTo2 = ""; this.benefits2 = ""; this.termsAndConditions2 = ""; this.urlimageRead2 = '' }
    if (variable == 3) { this.rank3 = ''; this.url3 = ""; this.imageByte3 = []; this.code3 = ""; this.navigateTo3 = ""; this.benefits3 = ""; this.termsAndConditions3 = ""; this.urlimageRead3 = '' }
    if (variable == 4) { this.rank4 = ''; this.url4 = ""; this.imageByte4 = []; this.code4 = ""; this.navigateTo4 = ""; this.benefits4 = ""; this.termsAndConditions4 = ""; this.urlimageRead4 = '' }
    if (variable == 5) { this.rank5 = ''; this.url5 = ""; this.imageByte5 = []; this.code5 = ""; this.navigateTo5 = ""; this.benefits5 = ""; this.termsAndConditions5 = ""; this.urlimageRead5 = '' }
    if (variable == 6) { this.rank6 = ''; this.url6 = ""; this.imageByte6 = []; this.code6 = ""; this.navigateTo6 = ""; this.benefits6 = ""; this.termsAndConditions6 = ""; this.urlimageRead6 = '' }
    if (variable == 7) { this.rank7 = ''; this.url7 = ""; this.imageByte7 = []; this.code7 = ""; this.navigateTo7 = ""; this.benefits7 = ""; this.termsAndConditions7 = ""; this.urlimageRead7 = '' }
    if (variable == 8) { this.rank8 = ''; this.url8 = ""; this.imageByte8 = []; this.code8 = ""; this.navigateTo8 = ""; this.benefits8 = ""; this.termsAndConditions8 = ""; this.urlimageRead8 = '' }
    if (variable == 9) { this.rank9 = ''; this.url9 = ""; this.imageByte9 = []; this.code9 = ""; this.navigateTo9 = ""; this.benefits9 = ""; this.termsAndConditions9 = ""; this.urlimageRead9 = '' }
    if (variable == 10) { this.rank10 = ''; this.url10 = ""; this.imageByte10 = []; this.code10 = ""; this.navigateTo10 = ""; this.benefits10 = ""; this.termsAndConditions10 = ""; this.urlimageRead10 = '' }
  }


}