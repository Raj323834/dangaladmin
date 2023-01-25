import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../services/HelperService';
import { Responses } from '../../constant/Responses';
import { WalletType } from '../../enums/bonus/WalletType';
import { BonusUsageInterval } from '../../enums/bonus/BonusUsageInterval';
import { AppConstants } from '../../constant/AppConstants';
import { Type } from '../../enums/bonus/Type';
import { Bonus } from '../../models/bonus/Bonus';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { BonusService } from '../../services/BonusService';
import { UrlConstant } from '../../constant/UrlConstant';
import { PermissionNames } from '../../constant/PermissionNames';

@Component({
  templateUrl: 'bonus.component.html',
  styleUrls: ["bonus.component.scss"]
})
export class BonusComponent implements OnInit {

  public walletTypes = Object.values(WalletType);
  public types = Object.values(Type);
  public bonusUsageInterval = Object.values(BonusUsageInterval);

  private GAME_LEVEL: string = "GAME_LEVEL";
  private RAKE: string = "RAKE";
  private allData: Bonus[];
  private dataSource: MatTableDataSource<any>;
  private columns: string[] = ['id', 'code', 'description', 'depositInfo.minAmount', 'active', 'Actions'];
  private ipAddress: string = '';
  public userIds: any = [];
  public userIdsUpdate: any = [];

  showModal: boolean = false;
  showNewModal: boolean = false;
  paramsEdit = {};
  paramsNew = {};
  paramsDepositInfo = {};
  paramsRestriction = {};
  paramsSignupInfo = {};
  alert: string = ""
  showAlertModal: boolean = false;
  showAlertModalUpdate: boolean = false;
  modalData: Bonus;

  public Code: string = "";
  public Type: string = "";
  public BonusUsageInterval: any;
  public Description: string = "";
  public IsActive: string = "";
  public DescriptionNew: string = "";
  public expireDays: string = "";
  public Amount: string = '';
  public IsActiveNew: string = "";
  public ActiveFrom: string = "";
  public ActiveTill: string = "";
  public ActiveFrom4: string = "";
  public ActiveTill4: string = "";
  public DepositType: string = "";
  public MinAmount: string = "";
  public VisibleInUI: string = "";
  public Percentage: string = "";
  public MaxBonus;
  public PromoPercentage: string = "";
  public LockedPercentage: string = "";
  public WithdrawalPercentage: string = "";
  public DepositPercentage: string = "";
  public InstantDepositAmount: string = "";
  public InstantWithdrawalAmount: string = "";
  public MaxUsagePerUser: string = "1";
  public OverallMaxUsage: string = "-1";
  public UserSpecific: boolean = false;
  public PromoInstantAmount: string = "";
  private paginator: MatPaginator;
  private sort: MatSort;
  public unselect = false;
  public showAlreadyActiveBonus: boolean = false;
  public canChangeMaxOverallUser: boolean = true;
  public depositInfo: boolean = false;
  public signupInfo: boolean = false;
  public activeBonusId: string = "";
  public instantWithdrawalAmount: string;
  public UserSpecific2: string = "";
  public MinAmountNew: string = "";
  public BonuaUsageIntervalSelected2: boolean;
  public type2: string = "";
  DepositType2: string;



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
    private bonusService: BonusService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }

  showAlertBoxUpdate = (alert) => {
    this.alert = alert;
    this.showAlertModalUpdate = true
  }

  closeAlertModal = () => {
    this.showAlertModal = false
    this.showAlertModalUpdate = false
    this.alert = ""
    this.showAlreadyActiveBonus = false;
  }

  applyfilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLowerCase()
  }

  currentDate = new Date();


  access_permission_read: boolean = false
  access_permission_write: boolean = false


  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.BONUS);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];
    this.getBonusDetails();
      this.bonusService.getIP().subscribe((res: any) => {
        this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      });
      this.dataSource.paginator = this.paginator;

  }


  getWalletValue(walletDisplay: string): string {
    switch (walletDisplay) {
      case WalletType.DEPOSIT: return 'deposit';
      case WalletType.WITHDRAWAL: return 'withdrawal';
      case WalletType.GAME_CHIPS: return 'promo_bonus';
      case WalletType.BONUS: return 'locked_bonus';
    }
  }

  getType(type: string) {
    switch (type) {
      case "DEPOSIT": return Type.DEPOSIT;
      case "SIGNUP": return Type.SIGNUP;
    }
  }


  getBonusUsageInterval(bonusUsageInterval: string) {
    switch (bonusUsageInterval) {
      case "DAILY": return BonusUsageInterval.DAILY;
      case "WEEKLY": return BonusUsageInterval.WEEKLY;
      case "MONTHLY": return BonusUsageInterval.MONTHLY;
      case "ALL_TIME": return BonusUsageInterval.ALL_TIME;
      case "SELECT": return null;
    }
  }

  getBonusDetails = () => {
    this.spinnerService.show();
    let userName = JSON.parse(sessionStorage.user).user_name;
    this.bonusService.getAllBonus(UrlConstant.getAllBonusUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(resData => {
        this.spinnerService.hide();
        if (resData['result'] == Responses.SUCCESS) {
          this.allData = resData['bonuses'];
        } else if (resData['result'] == Responses.DB_ERROR) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.DB_ERROR);
        } else if (resData['result'] == Responses.NO_BONUS_EXIST) {
          this.allData = [];
          this.showAlertBox(ResponsesDescription.NO_BONUS_EXIST_MSG);
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

  BonusInfo = (bonus) => {
    this.showModal = true;
    this.modalData = bonus;

    this.DescriptionNew = this.modalData['description'];
    this.IsActive = this.modalData['active'];
    this.ActiveTill4 = this.modalData.activeTill;
    this.ActiveFrom4 = this.modalData['activeFrom'];
    this.expireDays = this.modalData['expireDays'];
    this.type2 = this.modalData.type;

    this.MaxUsagePerUser = this.modalData.restriction['maxUsagePerUser'];
    this.OverallMaxUsage = this.modalData.restriction['overallMaxUsage'];
    this.UserSpecific2 = this.modalData.restriction.userSpecific;
    this.userIds = this.modalData.restriction['userIds'];
    this.BonusUsageInterval = this.modalData.restriction.bonusUsageInterval;

    this.DepositType2 = this.modalData.depositInfo['type'];
    this.MinAmount = this.modalData.depositInfo['minAmount'];
    this.Percentage = this.modalData.depositInfo['percentage'];
    this.MaxBonus = this.modalData.depositInfo.maxBonus;
    this.VisibleInUI = this.modalData.depositInfo.visibleInUi;
    this.LockedPercentage = this.modalData.depositInfo.lockedPercentage;
    this.DepositPercentage = this.modalData.depositInfo.depositPercentage;
    this.PromoPercentage = this.modalData.depositInfo.promoPercentage;
    this.WithdrawalPercentage = this.modalData.depositInfo.withdrawalPercentage;

    this.Amount = this.modalData.signUpInfo['instantBonusAmount'];
    this.PromoInstantAmount = this.modalData.signUpInfo['instantPromoAmount'];
    this.InstantWithdrawalAmount = this.modalData.signUpInfo['instantWithdrawalAmount'];
    this.InstantDepositAmount = this.modalData.signUpInfo['instantDepositAmount'];
  }

  closeModal = () => {
    this.showModal = false;
    this.resetform();
  }

  openNewModal = () => {
    this.showNewModal = true;
  }

  closeNewModal = () => {
    this.showNewModal = false;
    this.resetform();
  }

  onPromoCreditToSelected(walletType) {
    console.log("walletType  : " + walletType);

  }
  onLockedCreditSelected(walletType) {
    console.log("walletType  : " + walletType);

  }

  onTypeSelected(type: string) {
    console.log("type  : " + type);
    if (type == 'DEPOSIT') {
      this.depositInfo = true;
      this.signupInfo = false;

    }
    else if (type == 'SIGNUP') {
      this.depositInfo = false;
      this.signupInfo = true;
    }
    else {
      this.depositInfo = false;
      this.signupInfo = false;
    }
  }





  onTypeSelectedupdate(type: string) {
    console.log("type  : " + type);
    if (type == 'DEPOSIT') {
      this.depositInfo = true;
      this.signupInfo = false;

    }
    else if (type == 'SIGNUP') {
      this.depositInfo = false;
      this.signupInfo = true;
    }
    else {
      this.depositInfo = false;
      this.signupInfo = false;
      this.resetform;
    }
  }


  public bonusinterval1: string = "";


  onBonuaUsageIntervalSelected(bonusUsageInterval: string) {
    this.bonusinterval1 = bonusUsageInterval;
    if (bonusUsageInterval == 'DAILY') {
      this.BonusUsageInterval = 'DAILY'
    }
    else if (bonusUsageInterval == 'WEEKLY') {
      this.BonusUsageInterval = 'WEEKLY'
    }
    else if (bonusUsageInterval == 'MONTHLY') {
      this.BonusUsageInterval == 'MONTHLY'
    }
    else if (bonusUsageInterval = 'All_TIME') {
      this.BonusUsageInterval = 'ALL_TIME'
    }
    else {
      this.BonusUsageInterval = null;
    }
  }

  onDepositTypeSelected(depositType: string) {
    if (depositType == 'FIRST') {
      this.canChangeMaxOverallUser = false;
    }
    else if (depositType == 'OTHERS') {
      this.canChangeMaxOverallUser = true;
    }
  }


  onDepositTypeSelected3(depositType: string) {
    if (depositType == 'FIRST') {
      this.BonuaUsageIntervalSelected2 = false;
    }
    else if (depositType == 'OTHERS') {
      this.BonuaUsageIntervalSelected2 = true;
    }
    else if (depositType == 'SIGNUP') {
      this.BonuaUsageIntervalSelected2 = false;
    }
    else {
      this.BonuaUsageIntervalSelected2 = false;
      this.resetform;
    }
  }

  createNewBonus = () => {
    if (AppConstants.getTimestamp(this.ActiveFrom.toString()) < AppConstants.getTimestamp(this.ActiveTill.toString())) {

      if (AppConstants.getTimestamp(this.ActiveFrom.toString()) >= AppConstants.getTimestamp(this.currentDate.toISOString())) {

        if (this.ActiveFrom == "" ) {
          this.showAlertBox("Please enter Active From");
          return;
        } else {
          this.paramsNew['activeFrom'] = AppConstants.getTimestamp(this.ActiveFrom.toString());
        }
      } else {
        this.showAlertBox("The difference between the  Active From should be more than current time ");
        return;
      }

      if (AppConstants.getTimestamp(this.ActiveTill.toString()) >= AppConstants.getTimestamp(this.currentDate.toISOString())) {

        if (this.ActiveTill == "" ) {
          this.showAlertBox("Please enter Active Till");
          return;
        } else {
          this.paramsNew['activeTill'] = AppConstants.getTimestamp(this.ActiveTill.toString());
        }
      } else {
        this.showAlertBox("The difference between the  Active till should be more than current time ");
        return;
      }

      if (this.Code == undefined) {
        this.showAlertBox("Please enter valid Code");
        return;
      } else {
        this.paramsNew['code'] = this.Code;
      }

      if (this.Type == undefined) {
        this.showAlertBox("Please enter valid Type");
        return;
      } else {
        this.paramsNew['type'] = this.Type;
      }

      if (this.DescriptionNew == undefined) {
        this.showAlertBox("Please enter valid description");
        return;
      } else {
        this.paramsNew['description'] = this.DescriptionNew;
      }
      if (this.IsActiveNew == undefined) {
        this.showAlertBox("Please enter isActive");
        return;
      } else {
        (this.IsActiveNew == "false") ? this.paramsNew['active'] = false : this.paramsNew['active'] = true;
      }
      if (this.expireDays == undefined) {
        this.showAlertBox("Please enter Expire Days");
        return;
      } else {
        this.paramsNew['expireDays'] = this.expireDays;
      }
      if (this.MaxBonus < 0 || this.MaxBonus > 1000000) {
        this.showAlertBox("Maximum bonus should be between 0 and 10,000,00");
        return;
      } else {
        this.paramsDepositInfo['maxBonus'] = this.MaxBonus;
      }
      if (this.Type == 'DEPOSIT') {
        if (this.DepositType == undefined || this.DepositType == '') {
          this.showAlertBox("Select Type");
          this.paramsDepositInfo['type'] = "";
          this.paramsRestriction['bonusUsageInterval'] = this.BonusUsageInterval;

          return;
        } else {
          this.paramsDepositInfo['type'] = this.DepositType;
          this.paramsRestriction['bonusUsageInterval'] = this.BonusUsageInterval;

        }
      }

      this.paramsDepositInfo['minAmount'] = parseFloat(this.MinAmount);
      this.paramsDepositInfo['visibleInUi'] = this.VisibleInUI;
      this.paramsDepositInfo['percentage'] = parseInt(this.Percentage);
      this.paramsDepositInfo['maxBonus'] = this.MaxBonus;
      this.paramsDepositInfo['promoPercentage'] = parseInt(this.PromoPercentage);
      this.paramsDepositInfo['lockedPercentage'] = parseFloat(this.LockedPercentage);
      this.paramsDepositInfo['withdrawalPercentage'] = parseFloat(this.WithdrawalPercentage);
      this.paramsDepositInfo['depositPercentage'] = parseFloat(this.DepositPercentage);

      this.paramsNew['depositInfo'] = this.paramsDepositInfo;



      this.paramsRestriction['userIds'] = this.userIds.length != 0 ? this.userIds.split(',') : [];
      this.paramsRestriction['maxUsagePerUser'] = parseInt(this.MaxUsagePerUser);
      this.paramsRestriction['overallMaxUsage'] = parseInt(this.OverallMaxUsage);
      this.paramsRestriction['userSpecific'] = this.UserSpecific;
      this.paramsNew['restriction'] = this.paramsRestriction;



      //SignupInfo
      if (this.Type == 'SIGNUP') {
        if (this.Amount == undefined || this.Amount == '') {
          this.showAlertBox("Enter Amount");
          this.paramsSignupInfo['amount'] = "";
          return;
        } else {
          this.paramsSignupInfo['amount'] = parseFloat(this.Amount);
        }
      }
      this.paramsSignupInfo['instantPromoAmount'] = parseFloat(this.PromoInstantAmount);
      this.paramsSignupInfo['instantDepositAmount'] = parseFloat(this.InstantDepositAmount);
      this.paramsSignupInfo['instantWithdrawalAmount'] = parseFloat(this.InstantWithdrawalAmount);
      this.paramsNew['signUpInfo'] = this.paramsSignupInfo;


      if (this.paramsNew['activeFrom'] == '' || this.paramsNew['activeFrom'] == null ||
        this.paramsNew['activeTill'] == '' || this.paramsNew['activeTill'] == null ||
        this.paramsNew['code'] == '' || this.paramsNew['code'] == null ||
        this.paramsNew['type'] == '' || this.paramsNew['type'] == null ||
        this.paramsNew['description'] == '' || this.paramsNew['description'] == null ||
        this.paramsNew['expireDays'] == '' || this.paramsNew['expireDays'] == null) {
        this.closeAlertModal();
        this.showAlertBox('Enter all the mandatory fields')
        return;
      }
      else if (this.paramsNew['code'].length < 3 || this.paramsNew['code'].length > 20) {
        this.showAlertBox("Enter characters between 3-20 in Code.");
        return;
      }
      else {
        let userName = JSON.parse(sessionStorage.user).user_name;
        this.spinnerService.show();
        this.bonusService.createNewBonus(UrlConstant.createBonusUrl, AppConstants.NO_URL_PARAM, this.paramsNew, this.ipAddress, userName, '' + Date.now())
          .subscribe(resData => {
            this.spinnerService.hide();
            if (resData['result'] == Responses.SUCCESS) {
              this.closeNewModal();
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.SUCCESS_BONUS_MSG)
              this.getBonusDetails();
            } else if (resData['result'] == Responses.FAILED) {
              this.showAlertBox(ResponsesDescription.FAILED_BONUS_MSG);
            } else if (resData['result'] == Responses.INVALID_DATE_RANGE) {
              this.closeModal();
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);
              this.getBonusDetails();
              this.resetform();
            } else if (resData['result'] == Responses.DB_ERROR) {
              this.closeNewModal();
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.DB_ERROR);
            } else if (resData['result'] == Responses.SIGNUP_BONUS_INFO_MISSING) {
              this.showAlertBox(ResponsesDescription.SIGNUP_BONUS_INFO_MISSING_MSG);
            } else if (resData['result'] == Responses.BONUS_SERVICE_NOT_REACHABLE) {
              this.showAlertBox(ResponsesDescription.BONUS_SERVICE_NOT_REACHABLE_MSG);
            } else if (resData['result'] == Responses.DEPOSIT_BONUS_INFO_MISSING) {
              this.showAlertBox(ResponsesDescription.DEPOSIT_BONUS_INFO_MISSING_MSG);
            } else if (resData['result'] == Responses.BONUS_ALREADY_EXIST) {
              this.closeNewModal();
              this.closeAlertModal();
              this.showAlertBox(ResponsesDescription.BONUS_ALREADY_EXIST_MSG);
            } else if (resData['result'] == Responses.INVALID_BONUS_NAME) {
              this.showAlertBox(ResponsesDescription.INVALID_BONUS_NAME_MSG);
            } else if (resData['result'] == Responses.INVALID_BONUS_INFO) {
              this.showAlertBox(ResponsesDescription.INVALID_BONUS_INFO_MSG);
            } else {
              this.closeAlertModal();
              this.showAlertBox("Server Error");
            }
          },
            error => {
              this.spinnerService.hide();
              console.log("ERROR    ", "Server Error");


            }
          );
      }
    }
    else {
      this.showAlertBox("Active Form Date must be less than Active Till Date");
    }

  }



  updateBonus = () => {
    let isValid = false;
    let userName = JSON.parse(sessionStorage.user).user_name;

    if (AppConstants.getTimestampInMonthDayYear(this.ActiveTill4.toString()) > 1604946600000) {
      if (AppConstants.getTimestampInMonthDayYear(this.ActiveFrom4.toString()) > 1604946600000) {
        if (AppConstants.getTimestampInMonthDayYear(this.ActiveFrom4.toString()) < AppConstants.getTimestampInMonthDayYear(this.ActiveTill4.toString())) {


          if (this.modalData['id'] != "") {
            this.paramsEdit['bonusId'] = this.modalData['id'];
            if (this.DescriptionNew != "" && this.DescriptionNew != null) {
              this.paramsEdit['description'] = this.DescriptionNew;
              if (this.IsActive != '' && this.IsActive != null) {
                this.paramsEdit['isActive'] = this.IsActive;
                if (this.expireDays != '' && this.expireDays != null) {
                  this.paramsEdit['expireDays'] = this.expireDays;

                  if (this.ActiveTill4 != '' && this.ActiveTill4 != null) {

                    this.paramsEdit['activeTill'] = AppConstants.getTimestampInMonthDayYear(this.ActiveTill4.toString());

                    if (this.ActiveFrom4 != '' && this.ActiveFrom4 != null) {

                      this.paramsEdit['activeFrom'] = AppConstants.getTimestampInMonthDayYear(this.ActiveFrom4.toString());

                      this.paramsDepositInfo['minAmount'] = parseFloat(this.MinAmount);
                      this.paramsDepositInfo['visibleInUi'] = this.VisibleInUI;
                      this.paramsDepositInfo['percentage'] = parseInt(this.Percentage);
                      this.paramsDepositInfo['maxBonus'] = this.MaxBonus;
                      this.paramsDepositInfo['promoPercentage'] = parseInt(this.PromoPercentage);
                      this.paramsDepositInfo['lockedPercentage'] = parseFloat(this.LockedPercentage);
                      this.paramsDepositInfo['withdrawalPercentage'] = parseFloat(this.WithdrawalPercentage);
                      this.paramsDepositInfo['depositPercentage'] = parseFloat(this.DepositPercentage);

                      this.paramsEdit['depositInfo'] = this.paramsDepositInfo;

                      //userId  data

                      this.userIdsUpdate = this.userIds.length != 0 ? this.userIds.toString().split(',') : [];

                      //restrication update
                      this.paramsRestriction['userIds'] = this.userIdsUpdate;
                      this.paramsRestriction['maxUsagePerUser'] = parseInt(this.MaxUsagePerUser);
                      this.paramsRestriction['overallMaxUsage'] = parseInt(this.OverallMaxUsage);
                      this.paramsRestriction['bonusUsageInterval'] = this.BonusUsageInterval;
                      this.paramsRestriction['userSpecific'] = this.UserSpecific2;
                      this.paramsEdit['restriction'] = this.paramsRestriction;

                      //signup update


                      this.paramsSignupInfo['amount'] = parseFloat(this.Amount)
                      this.paramsSignupInfo['instantPromoAmount'] = parseFloat(this.PromoInstantAmount);
                      this.paramsSignupInfo['instantDepositAmount'] = parseFloat(this.InstantDepositAmount);
                      this.paramsSignupInfo['instantWithdrawalAmount'] = parseFloat(this.InstantWithdrawalAmount);
                      this.paramsEdit['signUpInfo'] = this.paramsSignupInfo;

                      isValid = true;


                      if (this.paramsEdit['activeFrom'] == '' || this.paramsEdit['activeFrom'] == null ||
                        this.paramsEdit['activeTill'] == '' || this.paramsEdit['activeTill'] == null
                      ) {
                        this.closeAlertModal();
                        this.showAlertBox('Enter all the mandatory fields && enter From date to till date')
                        return;


                      }
                    } else {
                      this.showAlertBox("Select Active From Date before submitting");
                      return;
                    }
                  } else {
                    this.showAlertBox("Active till date is Greater than Active From Date")

                    return;
                  }
                } else {
                  this.showAlertBox("Select Expire Days before submitting");
                  return;
                }

              } else {
                this.showAlertBox("Select isActive before submitting");
                return;
              }
            } else {
              this.showAlertBox("Enter Description before submitting");
              return;
            }
          } else {
            this.showAlertBox("Entering ID is mandatory");
            return;
          }

          if (isValid) {
            this.spinnerService.show();
            this.bonusService.updateBonus(UrlConstant.updateBonusUrl, AppConstants.NO_URL_PARAM, this.paramsEdit, this.ipAddress, userName, '' + Date.now())
              .subscribe(resData => {
                this.spinnerService.hide();
                if (resData['result'] == Responses.SUCCESS) {

                  this.showAlertBoxUpdate(ResponsesDescription.SUCCESS_UPDATEBONUS_MSG);
                  this.ngOnInit();
                  this.closeModal();
                  this.getBonusDetails();
                  this.resetform();

                } else if (resData['result'] == Responses.INVALID_DATE_RANGE) {
                  this.closeModal();
                  this.closeAlertModal();
                  this.showAlertBox(ResponsesDescription.INVALID_DATE_RANGE);
                  this.getBonusDetails();
                  this.resetform();
                } else if (resData['result'] == Responses.DB_ERROR) {
                  this.closeModal();
                  this.closeAlertModal();
                  this.showAlertBox(ResponsesDescription.DB_ERROR);
                  this.getBonusDetails();
                  this.resetform();
                } else if (resData['result'] == Responses.BONUS_DOES_NOT_EXIST) {
                  this.closeModal();
                  this.closeAlertModal();
                  this.showAlertBox(ResponsesDescription.BONUS_DOES_NOT_EXIST_MSG);
                  this.getBonusDetails();
                  this.resetform();
                } else if (resData['result'] == Responses.ACTIVE_BONUS_ALREADY_EXIST) {
                  this.closeModal();
                  this.closeAlertModal();
                  if (resData['activeBonusIdWithSameCode'] != null)
                    this.activeBonusId = resData['activeBonusIdWithSameCode'];
                  this.showAlreadyActiveBonus = true;
                  this.showAlertBox("Active bonus code exists with same name ");
                  this.getBonusDetails();
                  this.resetform();
                }
                else if (resData['result'] == Responses.BONUS_SERVICE_NOT_REACHABLE) {
                  this.closeModal();
                  this.closeAlertModal();
                  this.showAlertBox(ResponsesDescription.BONUS_SERVICE_NOT_REACHABLE_MSG);
                  this.getBonusDetails();
                  this.resetform();
                } else {

                  this.closeAlertModal();
                  this.showAlertBox("Server Error");
                  return;
                }
              },
                error => {
                  this.spinnerService.hide();
                  console.log("ERROR    ", "Server Error");
                });
          }

        } else {
          this.showAlertBox("Active Form Date must be less than Active Till Date");
        }
      }
      else {
        this.showAlertBox("Check Format of Active Form Date");
      }
    }
    else {
      this.showAlertBox("check Format of Active Till Date");
    }

    //update function end here
  }

  resetform() {
    this.Code = "";
    this.Type = "";
    this.Description = "";
    this.IsActive = "";
    this.DescriptionNew = "";
    this.expireDays = "";
    this.Amount = "";
    this.IsActiveNew = "false";
    this.ActiveFrom = "";
    this.ActiveFrom4 = "";
    this.ActiveTill = "";
    this.ActiveTill4 = "";

    this.DepositType = "";
    this.MinAmount = "";
    this.VisibleInUI = "";
    this.Percentage = "";
    this.MaxBonus = 0;
    this.PromoPercentage = "";
    this.LockedPercentage = "";
    this.WithdrawalPercentage = "";
    this.DepositPercentage = "";
    this.InstantDepositAmount = "";
    this.InstantWithdrawalAmount = "";
    this.MaxUsagePerUser = "1";
    this.OverallMaxUsage = "-1";
    this.UserSpecific = false;
    this.userIds = [];
    this.onTypeSelectedupdate;
    this.onDepositTypeSelected3;
    this.PromoInstantAmount = "";
    this.depositInfo = false
    this.type2 = "";
    this.signupInfo = false
  }
}
