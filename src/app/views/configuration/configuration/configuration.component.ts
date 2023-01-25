import { Component, Input, OnInit, ViewChild, isDevMode } from '@angular/core';
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
import { ConfigurationService } from '../../../services/ConfigurationService';
import { ServerConfiguration } from '../../../models/configuration/ServerConfiguration';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UserLoginService } from '../../../services/UserLoginService';



@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  user = null;
  private key: string = '';
  private columns: string[] = ['key', 'value', 'Actions']
  private value: any;
  private service: string = '';
  private userName: string = '';
  private paginator: MatPaginator;
  private sort: MatSort;
  private ipAddress = AppConstants.DEFAULT_IP;
  private dataSource: MatTableDataSource<any>;
  private serverConfigurations: ServerConfiguration[];
  private allData: any[] = [];
  private keyArray: any[] = [];
  private modalData: any;
  private showModal: boolean = false;
  private alert = "";
  private showAlertModal = false;
  private showCreateModal: boolean = false;
  private Createconfiguration: boolean = false;
  private CreateconfigurationAPI: boolean = false;
  private requestParameters = {};
  public configurationServicesTypes :any[] = [];


  public valuelength: number = 0;
  public textarea: boolean = false;

  access_permission_write: boolean = false;
  access_permission_read: boolean = false;

  public array: any

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

  closeAlertModal() {
    this.showAlertModal = false
    this.alert = ""
    this.initializeModelVariables();
    this.showModal = false
    this.showCreateModal = false
  }

  showCreateTableConfig = () => { this.showCreateModal = true; this.initializeModelVariables(); }
  closeTableConfigDetails = () => { this.showModal = false; this.initializeModelVariables(); }
  closeCreateTableConfig = () => { this.showCreateModal = false; this.initializeModelVariables(); this.showModal = false }


  constructor(private accountService: UserLoginService, private router: Router, private location: LocationStrategy,
    private configurationServices: ConfigurationService,
    private spinnerService: NgxSpinnerService) {
    history.pushState(null, null, window.location.href);
    location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    })
  }

  ngOnInit(): void {
    let storageUserData = JSON.parse(sessionStorage.user)
    this.user = storageUserData.user_name;
    this.getConfigs();
    this.getCongifurationType();
    const accessPermission = HelperService.getModulePermissions(PermissionNames.INCENTIVE_MODULE);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
    
      this.userName = JSON.parse(sessionStorage.user).user_name;
      this.configurationServices.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
        this.getConfigs();
      });
  }

  viewTableConfigDetails = (tableConfig) => {
    this.modalData = tableConfig;
    this.showModal = true;
    this.key = this.modalData.key;
    this.value = this.modalData.value;
    this.spinnerService.hide();
    this.valuelength = this.value.length
    this.textarea = this.valuelength > 30;
  }

  keyValue = (input) => Object.entries(input).forEach(([key, value]) => {
    this.allData.push({ key: key, value: value, });
    this.keyArray.push(key)
  })


  getConfigs = () => {
    this.allData = [];
    this.configurationServices.getallconfigurations(UrlConstant.configurationServiceUrl, AppConstants.NO_QUERY_PARAM, AppConstants.NO_URL_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        if (resData.result === Responses.SUCCESS) {
          if (resData.configurations == null) {
            this.allData = [];
            this.showAlertBox('No data available')
          } else {
            this.serverConfigurations = resData.configurations;
            this.keyValue(this.serverConfigurations)

          }
        } else if (resData.result === Responses.INTERNAL_SERVER_ERROR) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR);
        } else if (resData.result === Responses.DB_ERROR) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.DB_ERROR);
        }
        else if (resData.result === Responses.NOT_FOUND) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.NOT_FOUND);
        }

        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
        error => {
          this.showAlertBox("Bad Request")
          this.spinnerService.hide();
        }
      )
  }


  createRequestBodyandValidations() {
    if ((this.key != "" && this.key != null)) {
      this.requestParameters['key'] = this.key;
    } else {
      this.showAlertBox('Enter all the fields of KEY');
    }
    this.requestParameters['value'] = this.value;
    if ((this.service != "" && this.service != null)) {
      this.requestParameters['service'] = this.service;
    } else {
      this.showAlertBox('Enter all the fields of service');
    }
  }

  even = (element) => element == this.key;

  createConfigNetworkCall() {
    this.createRequestBodyandValidations();
    if (this.keyArray.some(this.even)) {
      this.showAlertBox(" Key Already Exist ");
    }
    else {
      this.spinnerService.show();
      this.configurationServices.createconfigurations(UrlConstant.configurationServiceUrl, '', this.requestParameters, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(resData => {
          if (resData['result'] == Responses.SUCCESS) {
            this.spinnerService.hide();
            this.showAlertBox(" Configuration created successfully.");
            this.initializeModelVariables();
            this.showCreateModal = false;
            this.getConfigs();
          } else if (resData['result'] == Responses.INVALID_REQUEST) {
            this.showAlertBox("Invalid Request");
            this.spinnerService.hide();
          } else if (resData['result'] == Responses.DB_ERROR) {
            this.showAlertBox(ResponsesDescription.DB_ERROR);
            this.spinnerService.hide();
          }
          else if (resData['result'] == Responses.INTERNAL_SERVER_ERROR) {
            this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR)
            this.spinnerService.hide();
          }
        },
          error => {
            this.spinnerService.hide();
            this.showAlertBox('Bad Request, Check all missing field')

          }
        );
    }
  }

  updateRequestBodyandValidations() {
    if ((this.key != "" && this.key != null)) {
      this.requestParameters['key'] = this.key;
    } else {
      this.showAlertBox('Enter all the fields of KEY');
    }
    this.requestParameters['value'] = this.value;
  }

  UpdateConfigNetworkCall() {
    this.updateRequestBodyandValidations();
    this.spinnerService.show();
    this.configurationServices.updateconfigurations(UrlConstant.configurationServiceUrl, '', this.requestParameters, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        if (resData['result'] == Responses.SUCCESS) {
          this.spinnerService.hide();
          this.showAlertBox(" Configuration Update successfully.");
          this.showModal = false;
          this.initializeModelVariables();
          this.getConfigs();
          this.spinnerService.hide();
        } else if (resData['result'] == Responses.INVALID_REQUEST) {
          this.showAlertBox("Invalid Request");
          this.spinnerService.hide();
        } else if (resData['result'] == Responses.DB_ERROR) {
          this.showAlertBox(ResponsesDescription.DB_ERROR);
          this.spinnerService.hide();
        }
        else if (resData['result'] == Responses.INTERNAL_SERVER_ERROR) {
          this.showAlertBox(ResponsesDescription.INTERNAL_SERVER_ERROR)
          this.spinnerService.hide();
        }
      },
        error => {
          this.spinnerService.hide();
          this.showAlertBox('Bad Request, Check all missing field')
          this.spinnerService.hide();
        }
      );
  }


  configurationServicesType = (input) => Object.entries(input).forEach(([key, value]) => {
    this.configurationServicesTypes.push({ key: key, value: value, });
  });

  getCongifurationType = () => {
    let storageUserData = JSON.parse(sessionStorage.user);
    this.userName = storageUserData.user_name;
    this.configurationServices.getConfigurationsTypes(UrlConstant.configurationServicesUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
        .subscribe(resData => {
          this.configurationServicesType(resData.names);
        });
    }

  initializeModelVariables = () => {
    this.key = "";
    this.service = '';
    this.value = '';
    this.allData = [];
    this.serverConfigurations = [];
    this.requestParameters = {};
  }
}


