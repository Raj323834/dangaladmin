
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConstants } from '../../../constant/AppConstants';
import { PermissionNames } from '../../../constant/PermissionNames';
import { Responses } from '../../../constant/Responses';
import { ResponsesDescription } from '../../../constant/ResponsesDescription';
import { UrlConstant } from '../../../constant/UrlConstant';
import { AdminRole } from '../../../models/admin/AdminRole';
import { AdminService } from '../../../services/AdminService';
import { HelperService } from '../../../services/HelperService';

@Component({
  templateUrl: 'manage-role.component.html',
  styleUrls: ['manage-role.component.scss'],
})
export class TypographyComponent implements OnInit {


  private showCreateModal: boolean = false
  private listData = null
  private rolesListData = null
  private rolesToEdit = null
  private rolesDetail = null

  private showEditModal = false
  private roleIdData = null


  kycPerm = [false, false, false]

  withdrawalPerm = [false, false, false]
  kycjourneyPerm = [false, false, false]
  withdrawaljourneyPerm = [false, false, false]
  findPlayersPerm = [false, false, false]
  depositPerm = [false, false, false]
  userRegistrationPerm = [false, false, false]
  byPassUserReportPerm = [false, false, false]
  snapshotReportPerm = [false, false, false]
  rummyTournamentReportPerm = [false, false, false]
  callBreakGameStatsPerm = [false, false, false]
  bannerManagementPerm = [false, false, false]
  incentivePerm = [false, false, false]
  tournamentReportPerm = [false, false, false]
  manageAdminUserPerm = [false, false, false]
  manageRolesPerm = [false, false, false]
  contactPerm = [false, false, false]
  leaderboardPerm = [false, false, false]
  rummyPerm = [false, false, false]
  manualKYCPerm = [false, false, false]
  getPlayerDetailsPerm = [false, false, false]
  contactInPlayerDetailsPerm = [false, false, false]
  manualRegistrationPerm = [false, false, false]
  bonusPerm = [false, false, false]
  geoRestrictionPerm = [false, false, false]
  whitelistPerm = [false, false, false]
  updateBalancePerm = [false, false, false]
  lockUserPerm = [false, false, false]
  fraudUserPerm = [false, false, false]

  deletePlayerPerm = [false, false, false]
  gameOrderPerm = [false, false, false]
  transactionHistoryReportPerm = [false, false, false]
  leaderboardWinningReportPerm = [false, false, false]
  overviewReportPerm = [false, false, false]
  withdrawalReportPerm = [false, false, false]
  depositReportPerm = [false, false, false]
  cashGameReportPerm = [false, false, false]
  freeGameReportPerm = [false, false, false]
  dailyStatsReportPerm = [false, false, false]
  suspiciousReportPerm = [false, false, false]
  fraudReportPerm = [false, false, false]
  pokerToDgReportPerm = [false, false, false]
  dgToPokerReportPerm = [false, false, false]
  tdsReportPerm = [false, false, false]
  walletBackupPerm = [false, false, false]
  miscJobPerm = [false, false, false]
  rafReportPerm = [false, false, false]
  ipReportPerm = [false, false, false]
  winningReportPerm = [false, false, false]
  handsPlayedTogetherReportPerm = [false, false, false]
  adminActivityReportPerm = [false, false, false]
  opponentPlayedTogetherReportPerm = [false, false, false]

  kycNewPerm = []
  withdrawalNewPerm = []
  kycjourneyNewPerm = []
  withdrawaljourneyNewPerm = []
  findPlayersNewPerm = []
  depositNewPerm = []
  userRegistrationNewPerm = []
  byPassUserReportNewPerm = []
  snapshotReportNewPerm = []
  rummyTournamentReportNewPerm = []
  opponentPlayedTogetherReportNewPerm = []
  callBreakGameStatsNewPerm = []

  bannerManagementNewPerm = []
  incentiveNewPerm = []
  pokerTournamentReportNewPerm = []
  manageAdminUserNewPerm = []
  manageRolesNewPerm = []
  contactNewPerm = []
  leaderboardNewPerm = []
  rummyNewPerm = []
  manualKYCNewPerm = []
  getPlayerDetailsNewPerm = []
  contactInPlayerDetailsNewPerm = []
  manualRegistrationNewPerm = []
  bonusNewPerm = []
  geoRestrictionNewPerm = []
  whitelistNewPerm = []
  updateBalanceNewPerm = []
  lockUserNewPerm = []
  fraudUserNewPerm = []

  deletePlayerNewPerm = []
  gameOrderNewPerm = []
  transactionHistoryReportNewPerm = []
  leaderboardWinningReportNewPerm = []
  overviewReportNewPerm = []
  withdrawalReportNewPerm = []
  depositReportNewPerm = []
  cashGameReportNewPerm = []
  freeGameReportNewPerm = []
  dailyStatsReportNewPerm = []
  suspiciousReportNewPerm = []
  fraudReportNewPerm = []
  pokerToDgReportNewPerm = []
  dgToPokerReportNewPerm = []
  tdsReportNewPerm = []
  walletBackupNewPerm = []
  miscJobNewPerm = []
  rafReportNewPerm = []
  ipReportNewPerm = []
  winningReportNewPerm = []
  handsPlayedTogetherReportNewPerm = []
  adminActivityReportNewPerm = []




  kycModuleForm: any = null
  withModuleForm = null
  kycJourneyModuleForm = null
  withdrawaljourneyModuleForm = null
  findPlayersForm = null
  depositForm = null
  userRegistrationForm = null
  bypassUserReportForm = null
  snapshotReportForm = null
  rummyTournamentReportForm = null
  opponentPlayedTogetherReportForm = null
  callBreakGameStatsReportForm = null

  bannerManagementForm = null
  incentiveForm = null
  pokerTournamentReportForm = null

  manageAdminUserForm = null
  manageRoleForm = null
  manualKYCForm = null
  contactForm = null
  leaderboardForm = null
  rummyForm = null
  getPlayerDetailsForm = null
  contactInPlayerDetailsForm = null
  manualRegistrationForm = null
  bonusForm = null
  geoRestrictionForm = null
  whitelistForm = null
  updateBalanceForm = null
  lockUserForm = null
  fraudUserForm = null
  deletePlayerForm = null
  gameOrderForm = null
  transactionHistoryReportForm = null
  leaderboardWinningReportForm = null
  overviewReportForm = null
  withdrawalReportForm = null
  depositReportForm = null
  cashGameReportForm = null
  freeGameReportForm = null
  dailyStatsReportForm = null
  suspiciousReportForm = null
  fraudReportForm = null
  pokerToDgReportForm = null
  dgToPokerReportForm = null
  tdsReportForm = null
  walletBackupForm = null
  miscJobForm = null
  rafReportForm = null
  ipReportForm = null
  winningReportForm = null
  handsPlayedTogetherReportForm = null
  adminActivityReportForm = null

  private role_name: string = "";
  private role_id = 0;
  private modulePermission = [];
  private ipAddress: string = "00.00.00.00";
  private userName: string = "";
  private updateParamForm: any = null;
  private createParamForm: any = null;
  dataSource: MatTableDataSource<any>;
  private allData: AdminRole[];
  private columns: string[] = ['role_id', 'role', 'Actions'];
  private userId = ''
  private searchParamsForm = null
  private showModal = false

  showUserModal = false

  private modalData: AdminRole;
  private status: string = ""
  private selectedWithdrawlStatus: string = "";

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
    public adminService: AdminService) { }

  access_permission_read: boolean = false;
  access_permission_write: boolean = false;

  ngOnInit() {

    const accessPermission = HelperService.getModulePermissions(PermissionNames.MANAGE_ROLES);
    this.access_permission_read = accessPermission[HelperService.READ];
    this.access_permission_write = accessPermission[HelperService.WRITE];


    this.userName = JSON.parse(sessionStorage.user).user_name;
    this.adminService.getIP().subscribe((res: any) => {
      this.ipAddress = (res != null) ? res.ip : AppConstants.DEFAULT_IP;
      this.getRolesDetails();
    });

    this.createParamForm = this.formBuilder.group({
      role_name: '',
      module_permissions: this.formBuilder.array(this.modulePermission)
    })

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
  getRolesDetails = () => {
    let userName = JSON.parse(sessionStorage.user).user_name;
    this.ipAddress, userName, '' + Date.now()
    this.adminService.getRoles(UrlConstant.getRoleUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, this.ipAddress, userName, '' + Date.now())
      .subscribe(resData => {
        try {
          if (resData['result'] == Responses.SUCCESS) {
            this.allData = resData['roles'];
            this.dataSource = new MatTableDataSource(this.allData);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          } else if (resData['result'] == Responses.SUCCESS) { }
          else {
            this.closeAlertModal();
            this.showAlertBox("Unable to get Roles");
          }
        } catch {
          this.closeAlertModal();
          this.showAlertBox("Unable to get Roles");
        }
      },
        error => {
          this.showAlertBox(ResponsesDescription.ERROR_RETRIEVING_DATA);

        });
  }


  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get search() { return this.searchParamsForm.controls; }



  onKycCheckboxChange(perm, event) {
    this.kycPerm[perm] = !this.kycPerm[perm]
  }

  onKycJourneyCheckboxChange(perm, event) {
    this.kycjourneyPerm[perm] = !this.kycjourneyPerm[perm]
  }
  onWithdrawCheckboxChange(perm, event) {
    this.withdrawalPerm[perm] = !this.withdrawalPerm[perm]
  }
  onWithdrawJourneyCheckboxChange(perm, event) {
    this.withdrawaljourneyPerm[perm] = !this.withdrawaljourneyPerm[perm]
  }
  onFindPlayerCheckboxChange(perm, event) {
    this.findPlayersPerm[perm] = !this.findPlayersPerm[perm]
  }
  onDepositCheckboxChange(perm, event) {
    this.depositPerm[perm] = !this.depositPerm[perm]
  }
  onUserRegistrationCheckboxChange(perm, event) {
    this.userRegistrationPerm[perm] = !this.userRegistrationPerm[perm]
  }
  onByPassUserReportCheckboxChange(perm, event) {
    this.byPassUserReportPerm[perm] = !this.byPassUserReportPerm[perm]
  }
  onSnapshotReportCheckboxChange(perm, event) {
    this.snapshotReportPerm[perm] = !this.snapshotReportPerm[perm]
  }
  onRummyTournamentReportCheckboxChange(perm, event) {
    this.rummyTournamentReportPerm[perm] = !this.rummyTournamentReportPerm[perm]
  }
  onOpponentPlayedTogetherReportCheckboxChange(perm, event) {
    this.opponentPlayedTogetherReportPerm[perm] = !this.opponentPlayedTogetherReportPerm[perm]
  }
  onCallBreakGameStatsCheckboxChange(perm, event) {
    this.callBreakGameStatsPerm[perm] = !this.callBreakGameStatsPerm[perm]
  }

  onBannerManagementCheckboxChange(perm, event) {
    this.bannerManagementPerm[perm] = !this.bannerManagementPerm[perm]
  }
  onIncentiveCheckboxChange(perm, event) {
    this.incentivePerm[perm] = !this.incentivePerm[perm]
  }
  onPokerTournamentReportCheckboxChange(perm, event) {
    this.tournamentReportPerm[perm] = !this.tournamentReportPerm[perm]
  }

  onManageAdminCheckboxChange(perm, event) {
    this.manageAdminUserPerm[perm] = !this.manageAdminUserPerm[perm]
  }
  onManageRolesCheckboxChange(perm, event) {
    this.manageRolesPerm[perm] = !this.manageRolesPerm[perm]
  }
  onContactCheckboxChange(perm, event) {
    this.contactPerm[perm] = !this.contactPerm[perm]
  }
  onLeaderboardCheckboxChange(perm, event) {
    this.leaderboardPerm[perm] = !this.leaderboardPerm[perm]
  }
  onRummyCheckboxChange(perm, event) {
    this.rummyPerm[perm] = !this.rummyPerm[perm]
  }
  onManualKYCCheckboxChange(perm, event) {
    this.manualKYCPerm[perm] = !this.manualKYCPerm[perm]
  }

  onGetPlayerDetailsCheckboxChange(perm, event) {
    this.getPlayerDetailsPerm[perm] = !this.getPlayerDetailsPerm[perm]
  }
  onContactInPlayerDetailsCheckboxChange(perm, event) {
    this.contactInPlayerDetailsPerm[perm] = !this.contactInPlayerDetailsPerm[perm]
  }
  onManualRegistrationCheckboxChange(perm, event) {
    this.manualRegistrationPerm[perm] = !this.manualRegistrationPerm[perm]
  }
  onBonusCheckboxChange(perm, event) {
    this.bonusPerm[perm] = !this.bonusPerm[perm]
  }
  onUpdateBalanceCheckboxChange(perm, event) {
    this.updateBalancePerm[perm] = !this.updateBalancePerm[perm]
  }
  onLockUserCheckboxChange(perm, event) {
    this.lockUserPerm[perm] = !this.lockUserPerm[perm]
  }
  onFraudUserCheckboxChange(perm, event) {
    this.fraudUserPerm[perm] = !this.fraudUserPerm[perm]
  }
  onDeletePlayerCheckboxChange(perm, event) {
    this.deletePlayerPerm[perm] = !this.deletePlayerPerm[perm]
  }
  onGameOrderCheckboxChange(perm, event) {
    this.gameOrderPerm[perm] = !this.gameOrderPerm[perm]
  }
  onTransactionHistoryReportCheckboxChange(perm, event) {
    this.transactionHistoryReportPerm[perm] = !this.transactionHistoryReportPerm[perm]
  }
  onLeaderboardWinningReportCheckboxChange(perm, event) {
    this.leaderboardWinningReportPerm[perm] = !this.leaderboardWinningReportPerm[perm]
  }
  onOverviewReportCheckboxChange(perm, event) {
    this.overviewReportPerm[perm] = !this.overviewReportPerm[perm]
  }
  onWithdrawalReportCheckboxChange(perm, event) {
    this.withdrawalReportPerm[perm] = !this.withdrawalReportPerm[perm]
  }
  onDepositReportCheckboxChange(perm, event) {
    this.depositReportPerm[perm] = !this.depositReportPerm[perm]
  }
  onCashGameReportCheckboxChange(perm, event) {
    this.cashGameReportPerm[perm] = !this.cashGameReportPerm[perm]
  }
  onFreeGameReportCheckboxChange(perm, event) {
    this.freeGameReportPerm[perm] = !this.freeGameReportPerm[perm]
  }
  onDailyStatsReportCheckboxChange(perm, event) {
    this.dailyStatsReportPerm[perm] = !this.dailyStatsReportPerm[perm]
  }

  onSuspiciousReportCheckboxChange(perm, event) {
    this.suspiciousReportPerm[perm] = !this.suspiciousReportPerm[perm]
  }

  onFraudReportCheckboxChange(perm, event) {
    this.fraudReportPerm[perm] = !this.fraudReportPerm[perm];
  }
  onPokerToDgReportCheckboxChange(perm, event) {
    this.pokerToDgReportPerm[perm] = !this.pokerToDgReportPerm[perm];
  }
  onDgToPokerReportCheckboxChange(perm, event) {
    this.dgToPokerReportPerm[perm] = !this.dgToPokerReportPerm[perm];
  }
  onTdsReportCheckboxChange(perm, event) {
    this.tdsReportPerm[perm] = !this.tdsReportPerm[perm];
  }
  onwalletBackupCheckboxChange(perm, event) {
    this.walletBackupPerm[perm] = !this.walletBackupPerm[perm];
  }
  onmiscJobCheckboxChange(perm, event) {
    this.miscJobPerm[perm] = !this.miscJobPerm[perm];
  }
  onGeoRestrictionCheckboxChange(perm, event) {
    this.geoRestrictionPerm[perm] = !this.geoRestrictionPerm[perm]
  }
  onWhitelistCheckboxChange(perm, event) {
    this.whitelistPerm[perm] = !this.whitelistPerm[perm]
  }
  onRafReportCheckboxChange(perm, event) {
    this.rafReportPerm[perm] = !this.rafReportPerm[perm]
  }
  onIPReportCheckboxChange(perm, event) {
    this.ipReportPerm[perm] = !this.ipReportPerm[perm]
  }
  onWinningReportCheckboxChange(perm, event) {
    this.winningReportPerm[perm] = !this.winningReportPerm[perm]
  }
  onhandsPlayedTogetherCheckboxChange(perm, event) {
    this.handsPlayedTogetherReportPerm[perm] = !this.handsPlayedTogetherReportPerm[perm]
  }
  onAdminActivityCheckboxChange(perm, event) {
    this.adminActivityReportPerm[perm] = !this.adminActivityReportPerm[perm]
  }
  onEditBtnClick = (role_id) => {

    this.role_id = role_id
    this.adminService.getRoleIdPermissions(UrlConstant.GetRoleIdPermissionsUrl, role_id.toString(), AppConstants.NO_QUERY_PARAM, this.ipAddress, this.userName, '' + Date.now())
      .subscribe(resData => {
        try {
          if (resData['result'] == Responses.SUCCESS) {
            this.roleIdData = resData['modulePermissions']
            this.permissionChange();
            this.showEditModal = true
          } else {
            this.closeAlertModal();
            this.showAlertBox("Server Error");
          }
        } catch (err) {
          this.closeAlertModal();
          this.showAlertBox("Server Error");
        }
      });
  }

  permissionChange() {
    this.kycPerm = [false, false]
    this.withdrawalPerm = [false, false]
    this.kycjourneyPerm = [false, false]
    this.withdrawaljourneyPerm = [false, false]
    this.findPlayersPerm = [false, false]
    this.depositPerm = [false, false]
    this.userRegistrationPerm = [false, false]
    this.byPassUserReportPerm = [false, false]
    this.snapshotReportPerm = [false, false]
    this.rummyTournamentReportPerm = [false, false]
    this.opponentPlayedTogetherReportPerm = [false, false]
    this.callBreakGameStatsPerm = [false, false]
    this.bannerManagementPerm = [false, false]
    this.incentivePerm = [false, false]
    this.tournamentReportPerm = [false, false]
    this.manageAdminUserPerm = [false, false]
    this.manageRolesPerm = [false, false]
    this.contactPerm = [false, false]
    this.leaderboardPerm = [false, false]
    this.rummyPerm = [false, false]
    this.manualKYCPerm = [false, false]
    this.getPlayerDetailsPerm = [false, false]
    this.contactInPlayerDetailsPerm = [false, false]
    this.manualRegistrationPerm = [false, false]
    this.bonusPerm = [false, false]
    this.geoRestrictionPerm = [false, false]
    this.whitelistPerm = [false, false]
    this.updateBalancePerm = [false, false]
    this.lockUserPerm = [false, false]
    this.fraudUserPerm = [false, false]
    this.deletePlayerPerm = [false, false]
    this.gameOrderPerm = [false, false]
    this.transactionHistoryReportPerm = [false, false]
    this.leaderboardWinningReportPerm = [false, false]
    this.overviewReportPerm = [false, false]
    this.withdrawalReportPerm = [false, false]
    this.depositReportPerm = [false, false]
    this.cashGameReportPerm = [false, false]
    this.freeGameReportPerm = [false, false]
    this.dailyStatsReportPerm = [false, false]
    this.rafReportPerm = [false, false]
    this.ipReportPerm = [false, false]
    this.walletBackupPerm = [false, false]
    this.miscJobPerm = [false, false]
    this.winningReportPerm = [false, false]
    this.handsPlayedTogetherReportPerm = [false, false]
    this.adminActivityReportPerm = [false, false]
    for (let i = 0; i < this.roleIdData.length; i++) {
      if (this.roleIdData[i]['module'] == PermissionNames.KYC) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.kycPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.kycPerm[1] = true
          }
        }
      } else if (this.roleIdData[i]['module'] == PermissionNames.WITHDRAWAL) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.withdrawalPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.withdrawalPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.KYC_JORNEY) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.kycjourneyPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.kycjourneyPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.WITHDRAWAL_JOURNEY) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.withdrawaljourneyPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.withdrawaljourneyPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.FIND_PLAYERS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.findPlayersPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.findPlayersPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.DEPOSITS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.depositPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.depositPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.USER_REGISTRATIONS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.userRegistrationPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.userRegistrationPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.BYPASS_USER_REPORTS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.byPassUserReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.byPassUserReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.SNAPSHOT_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.snapshotReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.snapshotReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.RUMMY_TOURNAMENT_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.rummyTournamentReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.rummyTournamentReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.OPPONENT_PLAYED_TOGETHER_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.opponentPlayedTogetherReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.opponentPlayedTogetherReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.CALL_BREAK_GAME_STATS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.callBreakGameStatsPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.callBreakGameStatsPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.BANNER_MANAGEMENT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.bannerManagementPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.bannerManagementPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.INCENTIVE_MODULE) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.incentivePerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.incentivePerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.TOURNAMENT_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.tournamentReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.tournamentReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.MANAGE_ADMIN_USERS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.manageAdminUserPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.manageAdminUserPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.MANAGE_ROLES) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.manageRolesPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.manageRolesPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.CONTACTS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.contactPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.contactPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.LEADERBOARD) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.leaderboardPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.leaderboardPerm[1] = true
          }
        }
      } else if (this.roleIdData[i]['module'] == PermissionNames.RUMMY) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.rummyPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.rummyPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.MANUAL_KYC) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.manualKYCPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.manualKYCPerm[1] = true
          }
        }
      } else if (this.roleIdData[i]['module'] == PermissionNames.GET_PLAYER_DETAILS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.getPlayerDetailsPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.getPlayerDetailsPerm[1] = true
          }
        }
      } else if (this.roleIdData[i]['module'] == PermissionNames.CONTACT_IN_PLAYER_DETAILS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.contactInPlayerDetailsPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.contactInPlayerDetailsPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.MANUAL_REGISTRATION) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.manualRegistrationPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.manualRegistrationPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.BONUS) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.bonusPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.bonusPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.UPDATE_BALANCE) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.updateBalancePerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.updateBalancePerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.LOCK_USER) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.lockUserPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.lockUserPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.FRAUD_USER) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.fraudUserPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.fraudUserPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.DELETE_PLAYER) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.deletePlayerPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.deletePlayerPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.GAME_ORDER) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.gameOrderPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.gameOrderPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.TRANSACTION_HISTORY_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.transactionHistoryReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.transactionHistoryReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.LEADERBOARD_WINNING_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.leaderboardWinningReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.leaderboardWinningReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.OVERVIEW_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.overviewReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.overviewReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.WITHDRAWAL_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.withdrawalReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.withdrawalReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.DEPOSIT_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.depositReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.depositReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.CASH_GAME_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.cashGameReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.cashGameReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.FREE_GAME_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.freeGameReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.freeGameReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.DAILY_STATS_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.dailyStatsReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.dailyStatsReportPerm[1] = true
          }
        }
      }

      else if (this.roleIdData[i]['module'] == PermissionNames.SUSPICIOUS_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.suspiciousReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.suspiciousReportPerm[1] = true
          }
        }
      }

      else if (this.roleIdData[i]['module'] == PermissionNames.FRAUD_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.fraudReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.fraudReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.POKER_TO_DG_TRANSFER_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.pokerToDgReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.pokerToDgReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.TDS_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.tdsReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.tdsReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.WALLET_BACKUP) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.walletBackupPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.walletBackupPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.MISC_JOB) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.miscJobPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.miscJobPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.DG_TO_POKER_TRANSFER_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.dgToPokerReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.dgToPokerReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.GEORESTRICTION) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.geoRestrictionPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.geoRestrictionPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.WHITELIST) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.whitelistPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.whitelistPerm[1] = true
          }
        }
      }

      else if (this.roleIdData[i]['module'] == PermissionNames.RAF_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.rafReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.rafReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.IP_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.ipReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.ipReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.WINNING_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.winningReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.winningReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.HANDS_PLAYED_TOGETHER_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.handsPlayedTogetherReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.handsPlayedTogetherReportPerm[1] = true
          }
        }
      }
      else if (this.roleIdData[i]['module'] == PermissionNames.ADMIN_ACTIVITY_REPORT) {
        for (let j = 0; j < this.roleIdData[i]['permissions'].length; j++) {
          if (this.roleIdData[i]['permissions'][j] == "read") {
            this.adminActivityReportPerm[0] = true
          } else if (this.roleIdData[i]['permissions'][j] == "write") {
            this.adminActivityReportPerm[1] = true
          }
        }
      }
    }
  }

  hideEditModal() {
    this.showEditModal = false
  }
  
  isvalid: boolean = false;
  permissionCheck() {
    for (let i = 0; i < this.modulePermission.length; i++) {
      if (this.modulePermission[i].permissions.length > 0) {
        this.isvalid = true;
      }
    }
  }

  updateRole() {
    let userName = JSON.parse(sessionStorage.user).user_name;
    this.kycNewPerm = []
    this.withdrawalNewPerm = []
    this.kycjourneyNewPerm = []
    this.withdrawaljourneyNewPerm = []
    this.findPlayersNewPerm = []
    this.depositNewPerm = []
    this.userRegistrationNewPerm = []
    this.byPassUserReportNewPerm = []
    this.snapshotReportNewPerm = []
    this.rummyTournamentReportNewPerm = []
    this.opponentPlayedTogetherReportNewPerm = []
    this.callBreakGameStatsNewPerm = []
    this.bannerManagementNewPerm = []
    this.incentiveNewPerm = []
    this.pokerTournamentReportNewPerm = []
    this.manageAdminUserNewPerm = []
    this.manageRolesNewPerm = []
    this.contactNewPerm = []
    this.leaderboardNewPerm = []
    this.rummyNewPerm = []
    this.manualKYCNewPerm = []
    this.getPlayerDetailsNewPerm = []
    this.contactInPlayerDetailsNewPerm = []
    this.manualRegistrationNewPerm = []
    this.bonusNewPerm = []
    this.updateBalanceNewPerm = []
    this.lockUserNewPerm = []
    this.fraudUserNewPerm = []
    this.deletePlayerNewPerm = []
    this.gameOrderNewPerm = []
    this.transactionHistoryReportNewPerm = []
    this.leaderboardWinningReportNewPerm = []
    this.overviewReportNewPerm = []
    this.withdrawalReportNewPerm = []
    this.depositReportNewPerm = []
    this.cashGameReportNewPerm = []
    this.freeGameReportNewPerm = []
    this.dailyStatsReportNewPerm = []
    this.suspiciousReportNewPerm = []
    this.fraudReportNewPerm = []
    this.pokerToDgReportNewPerm = []
    this.dgToPokerReportNewPerm = []
    this.tdsReportNewPerm = []
    this.walletBackupNewPerm = []
    this.miscJobNewPerm = []
    this.geoRestrictionNewPerm = []
    this.whitelistNewPerm = []
    this.rafReportNewPerm = []
    this.ipReportNewPerm = []
    this.winningReportNewPerm = []
    this.handsPlayedTogetherReportNewPerm = []
    this.adminActivityReportNewPerm = []
    this.modulePermission = []

    if (this.kycPerm[0]) {
      this.kycNewPerm.push("read")
    }
    if (this.kycPerm[1]) {
      this.kycNewPerm.push("write")
    }
    if (this.withdrawalPerm[0]) {
      this.withdrawalNewPerm.push("read")
    }
    if (this.withdrawalPerm[1]) {
      this.withdrawalNewPerm.push("write")
    }
    if (this.kycjourneyPerm[0]) {
      this.kycjourneyNewPerm.push("read")
    }
    if (this.kycjourneyPerm[1]) {
      this.kycjourneyNewPerm.push("write")
    }
    if (this.withdrawaljourneyPerm[0]) {
      this.withdrawaljourneyNewPerm.push("read")
    }
    if (this.withdrawaljourneyPerm[1]) {
      this.withdrawaljourneyNewPerm.push("write")
    }
    if (this.findPlayersPerm[0]) {
      this.findPlayersNewPerm.push("read")
    }
    if (this.findPlayersPerm[1]) {
      this.findPlayersNewPerm.push("write")
    }
    if (this.depositPerm[0]) {
      this.depositNewPerm.push("read")
    }
    if (this.depositPerm[1]) {
      this.depositNewPerm.push("write")
    }
    if (this.userRegistrationPerm[0]) {
      this.userRegistrationNewPerm.push("read")
    }
    if (this.userRegistrationPerm[1]) {
      this.userRegistrationNewPerm.push("write")
    }
    if (this.byPassUserReportPerm[0]) {
      this.byPassUserReportNewPerm.push("read")
    }
    if (this.byPassUserReportPerm[1]) {
      this.byPassUserReportNewPerm.push("write")
    }
    if (this.snapshotReportPerm[0]) {
      this.snapshotReportNewPerm.push("read")
    }
    if (this.snapshotReportPerm[1]) {
      this.snapshotReportNewPerm.push("write")
    }
    if (this.rummyTournamentReportPerm[0]) {
      this.rummyTournamentReportNewPerm.push("read")
    }
    if (this.rummyTournamentReportPerm[1]) {
      this.rummyTournamentReportNewPerm.push("write")
    }
    if (this.opponentPlayedTogetherReportPerm[0]) {
      this.opponentPlayedTogetherReportNewPerm.push("read")
    }
    if (this.opponentPlayedTogetherReportPerm[1]) {
      this.opponentPlayedTogetherReportNewPerm.push("write")
    }
    if (this.callBreakGameStatsPerm[0]) {
      this.callBreakGameStatsNewPerm.push("read")
    }
    if (this.callBreakGameStatsPerm[1]) {
      this.callBreakGameStatsNewPerm.push("write")
    }

    if (this.bannerManagementPerm[0]) {
      this.bannerManagementNewPerm.push("read")
    }
    if (this.bannerManagementPerm[1]) {
      this.bannerManagementNewPerm.push("write")
    }
    if (this.incentivePerm[0]) {
      this.incentiveNewPerm.push("read")
    }
    if (this.incentivePerm[1]) {
      this.incentiveNewPerm.push("write")
    }
    if (this.tournamentReportPerm[0]) {
      this.pokerTournamentReportNewPerm.push("read")
    }
    if (this.tournamentReportPerm[1]) {
      this.pokerTournamentReportNewPerm.push("write")
    }
    if (this.manageAdminUserPerm[0]) {
      this.manageAdminUserNewPerm.push("read")
    }
    if (this.manageAdminUserPerm[1]) {
      this.manageAdminUserNewPerm.push("write")
    }
    if (this.manageRolesPerm[0]) {
      this.manageRolesNewPerm.push("read")
    }
    if (this.manageRolesPerm[1]) {
      this.manageRolesNewPerm.push("write")
    }
    if (this.contactPerm[0]) {
      this.contactNewPerm.push("read")
    }
    if (this.contactPerm[1]) {
      this.contactNewPerm.push("write")
    }
    if (this.leaderboardPerm[0]) {
      this.leaderboardNewPerm.push("read")
    }
    if (this.leaderboardPerm[1]) {
      this.leaderboardNewPerm.push("write")
    }
    if (this.rummyPerm[0]) {
      this.rummyNewPerm.push("read")
    }
    if (this.rummyPerm[1]) {
      this.rummyNewPerm.push("write")
    }
    if (this.manualKYCPerm[0]) {
      this.manualKYCNewPerm.push("read")
    }
    if (this.manualKYCPerm[1]) {
      this.manualKYCNewPerm.push("write")
    }
    if (this.getPlayerDetailsPerm[0]) {
      this.getPlayerDetailsNewPerm.push("read")
    }
    if (this.getPlayerDetailsPerm[1]) {
      this.getPlayerDetailsNewPerm.push("write")
    }
    if (this.contactInPlayerDetailsPerm[0]) {
      this.contactInPlayerDetailsNewPerm.push("read")
    }
    if (this.contactInPlayerDetailsPerm[1]) {
      this.contactInPlayerDetailsNewPerm.push("write")
    }
    if (this.manualRegistrationPerm[0]) {
      this.manualRegistrationNewPerm.push("read")
    }
    if (this.manualRegistrationPerm[1]) {
      this.manualRegistrationNewPerm.push("write")
    }
    if (this.bonusPerm[0]) {
      this.bonusNewPerm.push("read")
    }
    if (this.bonusPerm[1]) {
      this.bonusNewPerm.push("write")
    }
    if (this.updateBalancePerm[0]) {
      this.updateBalanceNewPerm.push("read")
    }
    if (this.updateBalancePerm[1]) {
      this.updateBalanceNewPerm.push("write")
    }
    if (this.lockUserPerm[0]) {
      this.lockUserNewPerm.push("read")
    }
    if (this.lockUserPerm[1]) {
      this.lockUserNewPerm.push("write")
    }
    if (this.fraudUserPerm[0]) {
      this.fraudUserNewPerm.push("read")
    }
    if (this.fraudUserPerm[1]) {
      this.fraudUserNewPerm.push("write")
    }
    if (this.deletePlayerPerm[0]) {
      this.deletePlayerNewPerm.push("read")
    }
    if (this.deletePlayerPerm[1]) {
      this.deletePlayerNewPerm.push("write")
    }
    if (this.gameOrderPerm[0]) {
      this.gameOrderNewPerm.push("read")
    }
    if (this.gameOrderPerm[1]) {
      this.gameOrderNewPerm.push("write")
    }
    if (this.transactionHistoryReportPerm[0]) {
      this.transactionHistoryReportNewPerm.push("read")
    }
    if (this.transactionHistoryReportPerm[1]) {
      this.transactionHistoryReportNewPerm.push("write")
    }
    if (this.leaderboardWinningReportPerm[0]) {
      this.leaderboardWinningReportNewPerm.push("read")
    }
    if (this.leaderboardWinningReportPerm[1]) {
      this.leaderboardWinningReportNewPerm.push("write")
    }
    if (this.overviewReportPerm[0]) {
      this.overviewReportNewPerm.push("read")
    }
    if (this.overviewReportPerm[1]) {
      this.overviewReportNewPerm.push("write")
    }
    if (this.withdrawalReportPerm[0]) {
      this.withdrawalReportNewPerm.push("read")
    }
    if (this.withdrawalReportPerm[1]) {
      this.withdrawalReportNewPerm.push("write")
    }
    if (this.depositReportPerm[0]) {
      this.depositReportNewPerm.push("read")
    }
    if (this.depositReportPerm[1]) {
      this.depositReportNewPerm.push("write")
    }
    if (this.cashGameReportPerm[0]) {
      this.cashGameReportNewPerm.push("read")
    }
    if (this.cashGameReportPerm[1]) {
      this.cashGameReportNewPerm.push("write")
    }
    if (this.freeGameReportPerm[0]) {
      this.freeGameReportNewPerm.push("read")
    }
    if (this.freeGameReportPerm[1]) {
      this.freeGameReportNewPerm.push("write")
    }
    if (this.dailyStatsReportPerm[0]) {
      this.dailyStatsReportNewPerm.push("read")
    }
    if (this.dailyStatsReportPerm[1]) {
      this.dailyStatsReportNewPerm.push("write")
    }
    if (this.suspiciousReportPerm[0]) {
      this.suspiciousReportNewPerm.push("read")
    }
    if (this.suspiciousReportPerm[1]) {
      this.suspiciousReportNewPerm.push("write")
    }

    if (this.fraudReportPerm[0]) {
      this.fraudReportNewPerm.push("read")
    }
    if (this.fraudReportPerm[1]) {
      this.fraudReportNewPerm.push("write")
    }
    if (this.pokerToDgReportPerm[0]) {
      this.pokerToDgReportNewPerm.push("read")
    }
    if (this.pokerToDgReportPerm[1]) {
      this.pokerToDgReportNewPerm.push("write")
    }
    if (this.dgToPokerReportPerm[0]) {
      this.dgToPokerReportNewPerm.push("read")
    }
    if (this.dgToPokerReportPerm[1]) {
      this.dgToPokerReportNewPerm.push("write")
    }
    if (this.tdsReportPerm[0]) {
      this.tdsReportNewPerm.push("read")
    }
    if (this.tdsReportPerm[1]) {
      this.tdsReportNewPerm.push("write")
    }
    if (this.walletBackupPerm[0]) {
      this.walletBackupNewPerm.push("read")
    }
    if (this.walletBackupPerm[1]) {
      this.walletBackupNewPerm.push("write")
    }
    if (this.miscJobPerm[0]) {
      this.miscJobNewPerm.push("read")
    }
    if (this.miscJobPerm[1]) {
      this.miscJobNewPerm.push("write")
    }
    if (this.geoRestrictionPerm[0]) {
      this.geoRestrictionNewPerm.push("read")
    }
    if (this.geoRestrictionPerm[1]) {
      this.geoRestrictionNewPerm.push("write")
    }
    if (this.whitelistPerm[0]) {
      this.whitelistNewPerm.push("read")
    }
    if (this.whitelistPerm[1]) {
      this.whitelistNewPerm.push("write")
    }
    if (this.rafReportPerm[0]) {
      this.rafReportNewPerm.push("read")
    }
    if (this.rafReportPerm[1]) {
      this.rafReportNewPerm.push("write")
    }
    if (this.ipReportPerm[0]) {
      this.ipReportNewPerm.push("read")
    }
    if (this.ipReportPerm[1]) {
      this.ipReportNewPerm.push("write")
    }
    if (this.winningReportPerm[0]) {
      this.winningReportNewPerm.push("read")
    }
    if (this.winningReportPerm[1]) {
      this.winningReportNewPerm.push("write")
    }
    if (this.handsPlayedTogetherReportPerm[0]) {
      this.handsPlayedTogetherReportNewPerm.push("read")
    }
    if (this.handsPlayedTogetherReportPerm[1]) {
      this.handsPlayedTogetherReportNewPerm.push("write")
    }
    if (this.adminActivityReportPerm[0]) {
      this.adminActivityReportNewPerm.push("read")
    }
    if (this.adminActivityReportPerm[1]) {
      this.adminActivityReportNewPerm.push("write")
    }
    this.kycModuleForm = {
      "module": PermissionNames.KYC,
      "permissions": this.kycNewPerm
    }
    this.withModuleForm = {
      "module": PermissionNames.WITHDRAWAL,
      "permissions": this.withdrawalNewPerm
    }
    this.kycJourneyModuleForm = {
      "module": PermissionNames.KYC_JORNEY,
      "permissions": this.kycjourneyNewPerm
    }
    this.withdrawaljourneyModuleForm = {
      "module": PermissionNames.WITHDRAWAL_JOURNEY,
      "permissions": this.withdrawaljourneyNewPerm
    }
    this.findPlayersForm = {
      "module": PermissionNames.FIND_PLAYERS,
      "permissions": this.findPlayersNewPerm
    }
    this.depositForm = {
      "module": PermissionNames.DEPOSITS,
      "permissions": this.depositNewPerm
    }
    this.userRegistrationForm = {
      "module": PermissionNames.USER_REGISTRATIONS,
      "permissions": this.userRegistrationNewPerm
    }
    this.bypassUserReportForm = {
      "module": PermissionNames.BYPASS_USER_REPORTS,
      "permissions": this.byPassUserReportNewPerm
    }
    this.snapshotReportForm = {
      "module": PermissionNames.SNAPSHOT_REPORT,
      "permissions": this.snapshotReportNewPerm
    }
    this.rummyTournamentReportForm = {
      "module": PermissionNames.RUMMY_TOURNAMENT_REPORT,
      "permissions": this.rummyTournamentReportNewPerm
    }
    this.opponentPlayedTogetherReportForm= {
      "module": PermissionNames.OPPONENT_PLAYED_TOGETHER_REPORT,
      "permissions": this.opponentPlayedTogetherReportNewPerm
    }
    this.callBreakGameStatsReportForm = {
      "module": PermissionNames.CALL_BREAK_GAME_STATS,
      "permissions": this.callBreakGameStatsNewPerm
    }

    this.bannerManagementForm = {
      "module": PermissionNames.BANNER_MANAGEMENT,
      "permissions": this.bannerManagementNewPerm
    }
    this.incentiveForm = {
      "module": PermissionNames.INCENTIVE_MODULE,
      "permissions": this.incentiveNewPerm
    }
    this.pokerTournamentReportForm = {
      "module": PermissionNames.TOURNAMENT_REPORT,
      "permissions": this.pokerTournamentReportNewPerm
    }
    this.manageAdminUserForm = {
      "module": PermissionNames.MANAGE_ADMIN_USERS,
      "permissions": this.manageAdminUserNewPerm
    }
    this.manageRoleForm = {
      "module": PermissionNames.MANAGE_ROLES,
      "permissions": this.manageRolesNewPerm
    }
    this.contactForm = {
      "module": PermissionNames.CONTACTS,
      "permissions": this.contactNewPerm
    }
    this.leaderboardForm = {
      "module": PermissionNames.LEADERBOARD,
      "permissions": this.leaderboardNewPerm
    }
    this.rummyForm = {
      "module": PermissionNames.RUMMY,
      "permissions": this.rummyNewPerm
    }
    this.manualKYCForm = {
      "module": PermissionNames.MANUAL_KYC,
      "permissions": this.manualKYCNewPerm
    }
    this.getPlayerDetailsForm = {
      "module": PermissionNames.GET_PLAYER_DETAILS,
      "permissions": this.getPlayerDetailsNewPerm
    }
    this.contactInPlayerDetailsForm = {
      "module": PermissionNames.CONTACT_IN_PLAYER_DETAILS,
      "permissions": this.contactInPlayerDetailsNewPerm
    }
    this.manualRegistrationForm = {
      "module": PermissionNames.MANUAL_REGISTRATION,
      "permissions": this.manualRegistrationNewPerm
    }
    this.bonusForm = {
      "module": PermissionNames.BONUS,
      "permissions": this.bonusNewPerm
    }
    this.updateBalanceForm = {
      "module": PermissionNames.UPDATE_BALANCE,
      "permissions": this.updateBalanceNewPerm
    }
    this.lockUserForm = {
      "module": PermissionNames.LOCK_USER,
      "permissions": this.lockUserNewPerm
    }
    this.fraudUserForm = {
      "module": PermissionNames.FRAUD_USER,
      "permissions": this.fraudUserNewPerm
    }
    this.deletePlayerForm = {
      "module": PermissionNames.DELETE_PLAYER,
      "permissions": this.deletePlayerNewPerm
    }
    this.gameOrderForm = {
      "module": PermissionNames.GAME_ORDER,
      "permissions": this.gameOrderNewPerm
    }
    this.transactionHistoryReportForm = {
      "module": PermissionNames.TRANSACTION_HISTORY_REPORT,
      "permissions": this.transactionHistoryReportNewPerm
    }
    this.leaderboardWinningReportForm = {
      "module": "leaderboard winning report",
      "permissions": this.leaderboardWinningReportNewPerm
    }
    this.overviewReportForm = {
      "module": PermissionNames.OVERVIEW_REPORT,
      "permissions": this.overviewReportNewPerm
    }
    this.withdrawalReportForm = {
      "module": PermissionNames.WITHDRAWAL_REPORT,
      "permissions": this.withdrawalReportNewPerm
    }
    this.depositReportForm = {
      "module": PermissionNames.DEPOSIT_REPORT,
      "permissions": this.depositReportNewPerm
    }
    this.cashGameReportForm = {
      "module": PermissionNames.CASH_GAME_REPORT,
      "permissions": this.cashGameReportNewPerm
    }
    this.freeGameReportForm = {
      "module": PermissionNames.FREE_GAME_REPORT,
      "permissions": this.freeGameReportNewPerm
    }
    this.dailyStatsReportForm = {
      "module": PermissionNames.DAILY_STATS_REPORT,
      "permissions": this.dailyStatsReportNewPerm
    }
    this.suspiciousReportForm = {
      "module": PermissionNames.SUSPICIOUS_REPORT,
      "permissions": this.suspiciousReportNewPerm
    }
    this.fraudReportForm = {
      "module": PermissionNames.FRAUD_REPORT,
      "permissions": this.fraudReportNewPerm
    }
    this.pokerToDgReportForm = {
      "module": PermissionNames.POKER_TO_DG_TRANSFER_REPORT,
      "permissions": this.pokerToDgReportNewPerm
    }
    this.dgToPokerReportForm = {
      "module": PermissionNames.DG_TO_POKER_TRANSFER_REPORT,
      "permissions": this.dgToPokerReportNewPerm
    }
    this.tdsReportForm = {
      "module": PermissionNames.TDS_REPORT,
      "permissions": this.tdsReportNewPerm
    }
    this.walletBackupForm = {
      "module": PermissionNames.WALLET_BACKUP,
      "permissions": this.walletBackupNewPerm
    }
    this.miscJobForm = {
      "module": PermissionNames.MISC_JOB,
      "permissions": this.miscJobNewPerm
    }
    this.geoRestrictionForm = {
      "module": PermissionNames.GEORESTRICTION,
      "permissions": this.geoRestrictionNewPerm
    }
    this.whitelistForm = {
      "module": PermissionNames.WHITELIST,
      "permissions": this.whitelistNewPerm
    }
    this.rafReportForm = {
      "module": PermissionNames.RAF_REPORT,
      "permissions": this.rafReportNewPerm
    }
    this.ipReportForm = {
      "module": PermissionNames.IP_REPORT,
      "permissions": this.ipReportNewPerm
    }
    this.winningReportForm = {
      "module": PermissionNames.WINNING_REPORT,
      "permissions": this.winningReportNewPerm
    }
    this.handsPlayedTogetherReportForm = {
      "module": PermissionNames.HANDS_PLAYED_TOGETHER_REPORT,
      "permissions": this.handsPlayedTogetherReportNewPerm
    }
    this.adminActivityReportForm = {
      "module": PermissionNames.ADMIN_ACTIVITY_REPORT,
      "permissions": this.adminActivityReportNewPerm
    }

    this.modulePermission.push(this.kycModuleForm)
    this.modulePermission.push(this.withModuleForm)
    this.modulePermission.push(this.kycJourneyModuleForm)
    this.modulePermission.push(this.withdrawaljourneyModuleForm)
    this.modulePermission.push(this.findPlayersForm)
    this.modulePermission.push(this.depositForm)
    this.modulePermission.push(this.userRegistrationForm)
    this.modulePermission.push(this.bypassUserReportForm)
    this.modulePermission.push(this.snapshotReportForm)
    this.modulePermission.push(this.rummyTournamentReportForm)
    this.modulePermission.push(this.opponentPlayedTogetherReportForm)
    this.modulePermission.push(this.callBreakGameStatsReportForm)
    this.modulePermission.push(this.bannerManagementForm)
    this.modulePermission.push(this.incentiveForm)
    this.modulePermission.push(this.pokerTournamentReportForm)
    this.modulePermission.push(this.manageAdminUserForm)
    this.modulePermission.push(this.manageRoleForm)
    this.modulePermission.push(this.contactForm)
    this.modulePermission.push(this.leaderboardForm)
    this.modulePermission.push(this.rummyForm)
    this.modulePermission.push(this.manualKYCForm)
    this.modulePermission.push(this.getPlayerDetailsForm)
    this.modulePermission.push(this.contactInPlayerDetailsForm)
    this.modulePermission.push(this.manualRegistrationForm)
    this.modulePermission.push(this.bonusForm)
    this.modulePermission.push(this.updateBalanceForm)
    this.modulePermission.push(this.lockUserForm)
    this.modulePermission.push(this.fraudUserForm)
    this.modulePermission.push(this.deletePlayerForm)
    this.modulePermission.push(this.gameOrderForm)
    this.modulePermission.push(this.transactionHistoryReportForm)
    this.modulePermission.push(this.leaderboardWinningReportForm)
    this.modulePermission.push(this.overviewReportForm)
    this.modulePermission.push(this.withdrawalReportForm)
    this.modulePermission.push(this.depositReportForm)
    this.modulePermission.push(this.cashGameReportForm)
    this.modulePermission.push(this.freeGameReportForm)
    this.modulePermission.push(this.dailyStatsReportForm)
    this.modulePermission.push(this.suspiciousReportForm)
    this.modulePermission.push(this.fraudReportForm)
    this.modulePermission.push(this.pokerToDgReportForm)
    this.modulePermission.push(this.dgToPokerReportForm)
    this.modulePermission.push(this.tdsReportForm)
    this.modulePermission.push(this.walletBackupForm)
    this.modulePermission.push(this.miscJobForm)
    this.modulePermission.push(this.geoRestrictionForm)
    this.modulePermission.push(this.whitelistForm)
    this.modulePermission.push(this.rafReportForm)
    this.modulePermission.push(this.ipReportForm)
    this.modulePermission.push(this.winningReportForm)
    this.modulePermission.push(this.handsPlayedTogetherReportForm)
    this.modulePermission.push(this.adminActivityReportForm)
    this.updateParamForm = {
      "modulePermissions": this.modulePermission
    }

    this.permissionCheck();
    if (this.isvalid) {
      this.adminService.updateRoleIdPermissions(UrlConstant.UpdateRoleIdPermissionsUrl, this.role_id.toString(), this.updateParamForm, this.ipAddress, userName, '' + Date.now())
        .subscribe(resData => {
          try {
            if (resData['result'] == Responses.SUCCESS) {
              this.closeAlertModal();
              this.showAlertBox("Updated Successfully");
              this.showEditModal = false;
              this.isvalid = false;
            } else if (resData['result'] == Responses.ROLE_PERMISSION_NOT_FOUND) {
              this.closeAlertModal();
              this.showAlertBox("Role Checkbox cannot be empty, Select atleast 1 Role");
              this.isvalid = false;
            }
            else {
              this.closeAlertModal();
              this.showAlertBox("Server Error");
              this.isvalid = false;
            }
          } catch (err) {
            this.closeAlertModal();
            this.showAlertBox("Server Error");
            this.isvalid = false;
          }
        });
    } else {
      this.showAlertBox("Role Checkbox cannot be empty, Select atleast 1 Role");
      this.isvalid = false;
    }
  }

  hideRoleModal() {
    this.showCreateModal = false
  }

  openRoleModal() {

    this.showCreateModal = true;

    this.kycPerm = [false, false]
    this.withdrawalPerm = [false, false]
    this.kycjourneyPerm = [false, false]
    this.withdrawaljourneyPerm = [false, false]
    this.findPlayersPerm = [false, false]
    this.depositPerm = [false, false]
    this.userRegistrationPerm = [false, false]
    this.byPassUserReportPerm = [false, false]
    this.snapshotReportPerm = [false, false]
    this.rummyTournamentReportPerm = [false, false]
    this.opponentPlayedTogetherReportPerm = [false, false]
    this.callBreakGameStatsPerm = [false, false]
    this.bannerManagementPerm = [false, false]
    this.incentivePerm = [false, false]
    this.tournamentReportPerm = [false, false]
    this.manageAdminUserPerm = [false, false]
    this.manageRolesPerm = [false, false]
    this.contactPerm = [false, false]
    this.leaderboardPerm = [false, false]
    this.rummyPerm = [false, false]
    this.manualKYCPerm = [false, false]
    this.getPlayerDetailsPerm = [false, false]
    this.contactInPlayerDetailsPerm = [false, false]
    this.manualRegistrationPerm = [false, false]
    this.bonusPerm = [false, false]
    this.updateBalancePerm = [false, false]
    this.lockUserPerm = [false, false]
    this.fraudUserPerm = [false, false]
    this.deletePlayerPerm = [false, false]
    this.gameOrderPerm = [false, false]
    this.transactionHistoryReportPerm = [false, false]
    this.leaderboardWinningReportPerm = [false, false]
    this.overviewReportPerm = [false, false]
    this.withdrawalReportPerm = [false, false]
    this.depositReportPerm = [false, false]
    this.cashGameReportPerm = [false, false]
    this.freeGameReportPerm = [false, false]
    this.dailyStatsReportPerm = [false, false]
    this.suspiciousReportPerm = [false, false]
    this.fraudReportPerm = [false, false]
    this.pokerToDgReportPerm = [false, false]
    this.dgToPokerReportPerm = [false, false]
    this.tdsReportPerm = [false, false]
    this.walletBackupPerm = [false, false]
    this.miscJobPerm = [false, false]
    this.geoRestrictionPerm = [false, false]
    this.whitelistPerm = [false, false]
    this.rafReportPerm = [false, false]
    this.ipReportPerm = [false, false]
    this.winningReportPerm = [false, false]
    this.handsPlayedTogetherReportPerm = [false, false]
    this.adminActivityReportPerm = [false, false]

  }

  createRoleModal() {
    let params: URLSearchParams = new URLSearchParams();
    let userName = JSON.parse(sessionStorage.user).user_name;

    this.kycNewPerm = []
    this.withdrawalNewPerm = []
    this.kycjourneyNewPerm = []
    this.withdrawaljourneyNewPerm = []
    this.findPlayersNewPerm = []
    this.depositNewPerm = []
    this.userRegistrationNewPerm = []
    this.byPassUserReportNewPerm = []
    this.snapshotReportNewPerm = []
    this.rummyTournamentReportNewPerm = []
    this.opponentPlayedTogetherReportNewPerm = []
    this.callBreakGameStatsNewPerm = []
    this.bannerManagementNewPerm = []
    this.incentiveNewPerm = []
    this.pokerTournamentReportNewPerm = []
    this.manageAdminUserNewPerm = []
    this.manageRolesNewPerm = []
    this.contactNewPerm = []
    this.leaderboardNewPerm = []
    this.rummyNewPerm = []
    this.manualKYCNewPerm = []
    this.getPlayerDetailsNewPerm = []
    this.contactInPlayerDetailsNewPerm = []
    this.manualRegistrationNewPerm = []
    this.bonusNewPerm = []
    this.updateBalanceNewPerm = []
    this.lockUserNewPerm = []
    this.fraudUserNewPerm = []
    this.deletePlayerNewPerm = []
    this.gameOrderNewPerm = []
    this.transactionHistoryReportNewPerm = []
    this.leaderboardWinningReportNewPerm = []
    this.overviewReportNewPerm = []
    this.withdrawalReportNewPerm = []
    this.depositReportNewPerm = []
    this.cashGameReportNewPerm = []
    this.freeGameReportNewPerm = []
    this.dailyStatsReportNewPerm = []
    this.suspiciousReportNewPerm = []
    this.fraudReportNewPerm = []
    this.pokerToDgReportNewPerm = []
    this.dgToPokerReportNewPerm = []
    this.tdsReportNewPerm = []
    this.walletBackupNewPerm = []
    this.miscJobNewPerm = []


    this.geoRestrictionNewPerm = []
    this.whitelistNewPerm = []
    this.rafReportNewPerm = []
    this.ipReportNewPerm = []
    this.winningReportNewPerm = []
    this.handsPlayedTogetherReportNewPerm = []
    this.adminActivityReportNewPerm = []
    this.modulePermission = []

    if (this.kycPerm[0]) {
      this.kycNewPerm.push("read")
    }
    if (this.kycPerm[1]) {
      this.kycNewPerm.push("write")
    }
    if (this.withdrawalPerm[0]) {
      this.withdrawalNewPerm.push("read")
    }
    if (this.withdrawalPerm[1]) {
      this.withdrawalNewPerm.push("write")
    }
    if (this.kycjourneyPerm[0]) {
      this.kycjourneyNewPerm.push("read")
    }
    if (this.kycjourneyPerm[1]) {
      this.kycjourneyNewPerm.push("write")
    }
    if (this.withdrawaljourneyPerm[0]) {
      this.withdrawaljourneyNewPerm.push("read")
    }
    if (this.withdrawaljourneyPerm[1]) {
      this.withdrawaljourneyNewPerm.push("write")
    }
    if (this.findPlayersPerm[0]) {
      this.findPlayersNewPerm.push("read")
    }
    if (this.findPlayersPerm[1]) {
      this.findPlayersNewPerm.push("write")
    }
    if (this.depositPerm[0]) {
      this.depositNewPerm.push("read")
    }
    if (this.depositPerm[1]) {
      this.depositNewPerm.push("write")
    }
    if (this.userRegistrationPerm[0]) {
      this.userRegistrationNewPerm.push("read")
    }
    if (this.userRegistrationPerm[1]) {
      this.userRegistrationNewPerm.push("write")
    }
    if (this.byPassUserReportPerm[0]) {
      this.byPassUserReportNewPerm.push("read")
    }
    if (this.byPassUserReportPerm[1]) {
      this.byPassUserReportNewPerm.push("write")
    }
    if (this.snapshotReportPerm[0]) {
      this.snapshotReportNewPerm.push("read")
    }
    if (this.snapshotReportPerm[1]) {
      this.snapshotReportNewPerm.push("write")
    }
    if (this.rummyTournamentReportPerm[0]) {
      this.rummyTournamentReportNewPerm.push("read")
    }
    if (this.rummyTournamentReportPerm[1]) {
      this.rummyTournamentReportNewPerm.push("write")
    }
    if (this.opponentPlayedTogetherReportPerm[0]) {
      this.opponentPlayedTogetherReportNewPerm.push("read")
    }
    if (this.opponentPlayedTogetherReportPerm[1]) {
      this.opponentPlayedTogetherReportNewPerm.push("write")
    }
    if (this.callBreakGameStatsPerm[0]) {
      this.callBreakGameStatsNewPerm.push("read")
    }
    if (this.callBreakGameStatsPerm[1]) {
      this.callBreakGameStatsNewPerm.push("write")
    }

    if (this.bannerManagementPerm[0]) {
      this.bannerManagementNewPerm.push("read")
    }
    if (this.bannerManagementPerm[1]) {
      this.bannerManagementNewPerm.push("write")
    }
    if (this.incentivePerm[0]) {
      this.incentiveNewPerm.push("read")
    }
    if (this.incentivePerm[1]) {
      this.incentiveNewPerm.push("write")
    }
    if (this.tournamentReportPerm[0]) {
      this.pokerTournamentReportNewPerm.push("read")
    }
    if (this.tournamentReportPerm[1]) {
      this.pokerTournamentReportNewPerm.push("write")
    }
    if (this.manageAdminUserPerm[0]) {
      this.manageAdminUserNewPerm.push("read")
    }
    if (this.manageAdminUserPerm[1]) {
      this.manageAdminUserNewPerm.push("write")
    }
    if (this.manageRolesPerm[0]) {
      this.manageRolesNewPerm.push("read")
    }
    if (this.manageRolesPerm[1]) {
      this.manageRolesNewPerm.push("write")
    }
    if (this.contactPerm[0]) {
      this.contactNewPerm.push("read")
    }
    if (this.contactPerm[1]) {
      this.contactNewPerm.push("write")
    }
    if (this.leaderboardPerm[0]) {
      this.leaderboardNewPerm.push("read")
    }
    if (this.leaderboardPerm[1]) {
      this.leaderboardNewPerm.push("write")
    }
    if (this.rummyPerm[0]) {
      this.rummyNewPerm.push("read")
    }
    if (this.rummyPerm[1]) {
      this.rummyNewPerm.push("write")
    }
    if (this.manualKYCPerm[0]) {
      this.manualKYCNewPerm.push("read")
    }
    if (this.manualKYCPerm[1]) {
      this.manualKYCNewPerm.push("write")
    }
    if (this.getPlayerDetailsPerm[0]) {
      this.getPlayerDetailsNewPerm.push("read")
    }
    if (this.getPlayerDetailsPerm[1]) {
      this.getPlayerDetailsNewPerm.push("write")
    }
    if (this.contactInPlayerDetailsPerm[0]) {
      this.contactInPlayerDetailsNewPerm.push("read")
    }
    if (this.contactInPlayerDetailsPerm[1]) {
      this.contactInPlayerDetailsNewPerm.push("write")
    }
    if (this.manualRegistrationPerm[0]) {
      this.manualRegistrationNewPerm.push("read")
    }
    if (this.manualRegistrationPerm[1]) {
      this.manualRegistrationNewPerm.push("write")
    }
    if (this.bonusPerm[0]) {
      this.bonusNewPerm.push("read")
    }
    if (this.bonusPerm[1]) {
      this.bonusNewPerm.push("write")
    }
    if (this.updateBalancePerm[0]) {
      this.updateBalanceNewPerm.push("read")
    }
    if (this.updateBalancePerm[1]) {
      this.updateBalanceNewPerm.push("write")
    }
    if (this.lockUserPerm[0]) {
      this.lockUserNewPerm.push("read")
    }
    if (this.lockUserPerm[1]) {
      this.lockUserNewPerm.push("write")
    }
    if (this.fraudUserPerm[0]) {
      this.fraudUserNewPerm.push("read")
    }
    if (this.fraudUserPerm[1]) {
      this.fraudUserNewPerm.push("write")
    }
    if (this.deletePlayerPerm[0]) {
      this.deletePlayerNewPerm.push("read")
    }
    if (this.deletePlayerPerm[1]) {
      this.deletePlayerNewPerm.push("write")
    }
    if (this.gameOrderPerm[0]) {
      this.gameOrderNewPerm.push("read")
    }
    if (this.gameOrderPerm[1]) {
      this.gameOrderNewPerm.push("write")
    }
    if (this.transactionHistoryReportPerm[0]) {
      this.transactionHistoryReportNewPerm.push("read")
    }
    if (this.transactionHistoryReportPerm[1]) {
      this.transactionHistoryReportNewPerm.push("write")
    }
    if (this.leaderboardWinningReportPerm[0]) {
      this.leaderboardWinningReportNewPerm.push("read")
    }
    if (this.leaderboardWinningReportPerm[1]) {
      this.leaderboardWinningReportNewPerm.push("write")
    }
    if (this.overviewReportPerm[0]) {
      this.overviewReportNewPerm.push("read")
    }
    if (this.overviewReportPerm[1]) {
      this.overviewReportNewPerm.push("write")
    }
    if (this.withdrawalReportPerm[0]) {
      this.withdrawalReportNewPerm.push("read")
    }
    if (this.withdrawalReportPerm[1]) {
      this.withdrawalReportNewPerm.push("write")
    }
    if (this.depositReportPerm[0]) {
      this.depositReportNewPerm.push("read")
    }
    if (this.depositReportPerm[1]) {
      this.depositReportNewPerm.push("write")
    }
    if (this.cashGameReportPerm[0]) {
      this.cashGameReportNewPerm.push("read")
    }
    if (this.cashGameReportPerm[1]) {
      this.cashGameReportNewPerm.push("write")
    }
    if (this.freeGameReportPerm[0]) {
      this.freeGameReportNewPerm.push("read")
    }
    if (this.freeGameReportPerm[1]) {
      this.freeGameReportNewPerm.push("write")
    }
    if (this.dailyStatsReportPerm[0]) {
      this.dailyStatsReportNewPerm.push("read")
    }
    if (this.dailyStatsReportPerm[1]) {
      this.dailyStatsReportNewPerm.push("write")
    }
    if (this.suspiciousReportPerm[0]) {
      this.suspiciousReportNewPerm.push("read")
    }
    if (this.suspiciousReportPerm[1]) {
      this.suspiciousReportNewPerm.push("write")
    }

    if (this.fraudReportPerm[0]) {
      this.fraudReportNewPerm.push("read")
    }
    if (this.fraudReportPerm[1]) {
      this.fraudReportNewPerm.push("write")
    }
    if (this.pokerToDgReportPerm[0]) {
      this.pokerToDgReportNewPerm.push("read")
    }
    if (this.pokerToDgReportPerm[1]) {
      this.pokerToDgReportNewPerm.push("write")
    }
    if (this.dgToPokerReportPerm[0]) {
      this.dgToPokerReportNewPerm.push("read")
    }
    if (this.dgToPokerReportPerm[1]) {
      this.dgToPokerReportNewPerm.push("write")
    }
    if (this.tdsReportPerm[0]) {
      this.tdsReportNewPerm.push("read")
    }
    if (this.tdsReportPerm[1]) {
      this.tdsReportNewPerm.push("write")
    }
    if (this.walletBackupPerm[0]) {
      this.walletBackupNewPerm.push("read")
    }
    if (this.walletBackupPerm[1]) {
      this.walletBackupNewPerm.push("write")
    }
    if (this.miscJobPerm[0]) {
      this.miscJobNewPerm.push("read")
    }
    if (this.miscJobPerm[1]) {
      this.miscJobNewPerm.push("write")
    }
    if (this.geoRestrictionPerm[0]) {
      this.geoRestrictionNewPerm.push("read")
    }
    if (this.geoRestrictionPerm[1]) {
      this.geoRestrictionNewPerm.push("write")
    }
    if (this.whitelistPerm[0]) {
      this.whitelistNewPerm.push("read")
    }
    if (this.whitelistPerm[1]) {
      this.whitelistNewPerm.push("write")
    }
    if (this.rafReportPerm[0]) {
      this.rafReportNewPerm.push("read")
    }
    if (this.rafReportPerm[1]) {
      this.rafReportNewPerm.push("write")
    }
    if (this.ipReportPerm[0]) {
      this.ipReportNewPerm.push("read")
    }
    if (this.ipReportPerm[1]) {
      this.ipReportNewPerm.push("write")
    }
    if (this.winningReportPerm[0]) {
      this.winningReportNewPerm.push("read")
    }
    if (this.winningReportPerm[1]) {
      this.winningReportNewPerm.push("write")
    }
    if (this.handsPlayedTogetherReportPerm[0]) {
      this.handsPlayedTogetherReportNewPerm.push("read")
    }
    if (this.handsPlayedTogetherReportPerm[1]) {
      this.handsPlayedTogetherReportNewPerm.push("write")
    }
    if (this.adminActivityReportPerm[0]) {
      this.adminActivityReportNewPerm.push("read")
    }
    if (this.adminActivityReportPerm[1]) {
      this.adminActivityReportNewPerm.push("write")
    }
    this.kycModuleForm = {
      "module": PermissionNames.KYC,
      "permissions": this.kycNewPerm
    }
    this.withModuleForm = {
      "module": PermissionNames.WITHDRAWAL,
      "permissions": this.withdrawalNewPerm
    }
    this.kycJourneyModuleForm = {
      "module": PermissionNames.KYC_JORNEY,
      "permissions": this.kycjourneyNewPerm
    }
    this.withdrawaljourneyModuleForm = {
      "module": PermissionNames.WITHDRAWAL_JOURNEY,
      "permissions": this.withdrawaljourneyNewPerm
    }
    this.findPlayersForm = {
      "module": PermissionNames.FIND_PLAYERS,
      "permissions": this.findPlayersNewPerm
    }
    this.depositForm = {
      "module": PermissionNames.DEPOSITS,
      "permissions": this.depositNewPerm
    }
    this.userRegistrationForm = {
      "module": PermissionNames.USER_REGISTRATIONS,
      "permissions": this.userRegistrationNewPerm
    }
    this.bypassUserReportForm = {
      "module": PermissionNames.BYPASS_USER_REPORTS,
      "permissions": this.byPassUserReportNewPerm
    }
    this.snapshotReportForm = {
      "module": PermissionNames.SNAPSHOT_REPORT,
      "permissions": this.snapshotReportNewPerm
    }
    this.rummyTournamentReportForm = {
      "module": PermissionNames.RUMMY_TOURNAMENT_REPORT,
      "permissions": this.rummyTournamentReportNewPerm
    }
    this.opponentPlayedTogetherReportForm = {
      "module": PermissionNames.OPPONENT_PLAYED_TOGETHER_REPORT,
      "permissions": this.opponentPlayedTogetherReportNewPerm
    }
    this.callBreakGameStatsReportForm = {
      "module": PermissionNames.CALL_BREAK_GAME_STATS,
      "permissions": this.callBreakGameStatsNewPerm
    }

    this.bannerManagementForm = {
      "module": PermissionNames.BANNER_MANAGEMENT,
      "permissions": this.bannerManagementNewPerm
    }
    this.incentiveForm = {
      "module": PermissionNames.INCENTIVE_MODULE,
      "permissions": this.incentiveNewPerm
    }
    this.pokerTournamentReportForm = {
      "module": PermissionNames.TOURNAMENT_REPORT,
      "permissions": this.pokerTournamentReportNewPerm
    }
    this.manageAdminUserForm = {
      "module": PermissionNames.MANAGE_ADMIN_USERS,
      "permissions": this.manageAdminUserNewPerm
    }
    this.manageRoleForm = {
      "module": PermissionNames.MANAGE_ROLES,
      "permissions": this.manageRolesNewPerm
    }
    this.contactForm = {
      "module": PermissionNames.CONTACTS,
      "permissions": this.contactNewPerm
    }
    this.leaderboardForm = {
      "module": PermissionNames.LEADERBOARD,
      "permissions": this.leaderboardNewPerm
    }
    this.rummyForm = {
      "module": PermissionNames.RUMMY,
      "permissions": this.rummyNewPerm
    }
    this.manualKYCForm = {
      "module": PermissionNames.MANUAL_KYC,
      "permissions": this.manualKYCNewPerm
    }
    this.getPlayerDetailsForm = {
      "module": PermissionNames.GET_PLAYER_DETAILS,
      "permissions": this.getPlayerDetailsNewPerm
    }
    this.contactInPlayerDetailsForm = {
      "module": PermissionNames.CONTACT_IN_PLAYER_DETAILS,
      "permissions": this.contactInPlayerDetailsNewPerm
    }
    this.manualRegistrationForm = {
      "module": PermissionNames.MANUAL_REGISTRATION,
      "permissions": this.manualRegistrationNewPerm
    }
    this.bonusForm = {
      "module": PermissionNames.BONUS,
      "permissions": this.bonusNewPerm
    }
    this.updateBalanceForm = {
      "module": PermissionNames.UPDATE_BALANCE,
      "permissions": this.updateBalanceNewPerm
    }
    this.lockUserForm = {
      "module": PermissionNames.LOCK_USER,
      "permissions": this.lockUserNewPerm
    }
    this.fraudUserForm = {
      "module": PermissionNames.FRAUD_USER,
      "permissions": this.fraudUserNewPerm
    }
    this.deletePlayerForm = {
      "module": PermissionNames.DELETE_PLAYER,
      "permissions": this.deletePlayerNewPerm
    }
    this.gameOrderForm = {
      "module": PermissionNames.GAME_ORDER,
      "permissions": this.gameOrderNewPerm
    }
    this.transactionHistoryReportForm = {
      "module": PermissionNames.TRANSACTION_HISTORY_REPORT,
      "permissions": this.transactionHistoryReportNewPerm
    }
    this.leaderboardWinningReportForm = {
      "module": "leaderboard winning report",
      "permissions": this.leaderboardWinningReportNewPerm
    }
    this.overviewReportForm = {
      "module": PermissionNames.OVERVIEW_REPORT,
      "permissions": this.overviewReportNewPerm
    }
    this.withdrawalReportForm = {
      "module": PermissionNames.WITHDRAWAL_REPORT,
      "permissions": this.withdrawalReportNewPerm
    }
    this.depositReportForm = {
      "module": PermissionNames.DEPOSIT_REPORT,
      "permissions": this.depositReportNewPerm
    }
    this.cashGameReportForm = {
      "module": PermissionNames.CASH_GAME_REPORT,
      "permissions": this.cashGameReportNewPerm
    }
    this.freeGameReportForm = {
      "module": PermissionNames.FREE_GAME_REPORT,
      "permissions": this.freeGameReportNewPerm
    }
    this.dailyStatsReportForm = {
      "module": PermissionNames.DAILY_STATS_REPORT,
      "permissions": this.dailyStatsReportNewPerm
    }
    this.suspiciousReportForm = {
      "module": PermissionNames.SUSPICIOUS_REPORT,
      "permissions": this.suspiciousReportNewPerm
    }
    this.fraudReportForm = {
      "module": PermissionNames.FRAUD_REPORT,
      "permissions": this.fraudReportNewPerm
    }
    this.pokerToDgReportForm = {
      "module": PermissionNames.POKER_TO_DG_TRANSFER_REPORT,
      "permissions": this.pokerToDgReportNewPerm
    }
    this.dgToPokerReportForm = {
      "module": PermissionNames.DG_TO_POKER_TRANSFER_REPORT,
      "permissions": this.dgToPokerReportNewPerm
    }
    this.tdsReportForm = {
      "module": PermissionNames.TDS_REPORT,
      "permissions": this.tdsReportNewPerm
    }
    this.walletBackupForm = {
      "module": PermissionNames.WALLET_BACKUP,
      "permissions": this.walletBackupNewPerm
    }
    this.miscJobForm = {
      "module": PermissionNames.WALLET_BACKUP,
      "permissions": this.miscJobNewPerm
    }
    this.geoRestrictionForm = {
      "module": PermissionNames.GEORESTRICTION,
      "permissions": this.geoRestrictionNewPerm
    }
    this.whitelistForm = {
      "module": PermissionNames.WHITELIST,
      "permissions": this.whitelistNewPerm
    }
    this.rafReportForm = {
      "module": PermissionNames.RAF_REPORT,
      "permissions": this.rafReportNewPerm
    }
    this.ipReportForm = {
      "module": PermissionNames.IP_REPORT,
      "permissions": this.ipReportNewPerm
    }
    this.winningReportForm = {
      "module": PermissionNames.WINNING_REPORT,
      "permissions": this.winningReportNewPerm
    }
    this.handsPlayedTogetherReportForm = {
      "module": PermissionNames.HANDS_PLAYED_TOGETHER_REPORT,
      "permissions": this.handsPlayedTogetherReportNewPerm
    }
    this.adminActivityReportForm = {
      "module": PermissionNames.ADMIN_ACTIVITY_REPORT,
      "permissions": this.adminActivityReportNewPerm
    }

    this.modulePermission.push(this.kycModuleForm)
    this.modulePermission.push(this.withModuleForm)
    this.modulePermission.push(this.kycJourneyModuleForm)
    this.modulePermission.push(this.withdrawaljourneyModuleForm)
    this.modulePermission.push(this.findPlayersForm)
    this.modulePermission.push(this.depositForm)
    this.modulePermission.push(this.userRegistrationForm)
    this.modulePermission.push(this.bypassUserReportForm)
    this.modulePermission.push(this.snapshotReportForm)
    this.modulePermission.push(this.rummyTournamentReportForm)
    this.modulePermission.push(this.opponentPlayedTogetherReportForm)
    this.modulePermission.push(this.callBreakGameStatsReportForm)
    this.modulePermission.push(this.bannerManagementForm)
    this.modulePermission.push(this.incentiveForm)
    this.modulePermission.push(this.pokerTournamentReportForm)
    this.modulePermission.push(this.manageAdminUserForm)
    this.modulePermission.push(this.manageRoleForm)
    this.modulePermission.push(this.contactForm)
    this.modulePermission.push(this.leaderboardForm)
    this.modulePermission.push(this.rummyForm)
    this.modulePermission.push(this.manualKYCForm)
    this.modulePermission.push(this.getPlayerDetailsForm)
    this.modulePermission.push(this.contactInPlayerDetailsForm)
    this.modulePermission.push(this.manualRegistrationForm)
    this.modulePermission.push(this.bonusForm)
    this.modulePermission.push(this.updateBalanceForm)
    this.modulePermission.push(this.lockUserForm)
    this.modulePermission.push(this.fraudUserForm)
    this.modulePermission.push(this.deletePlayerForm)
    this.modulePermission.push(this.gameOrderForm)
    this.modulePermission.push(this.transactionHistoryReportForm)
    this.modulePermission.push(this.leaderboardWinningReportForm)
    this.modulePermission.push(this.overviewReportForm)
    this.modulePermission.push(this.withdrawalReportForm)
    this.modulePermission.push(this.depositReportForm)
    this.modulePermission.push(this.cashGameReportForm)
    this.modulePermission.push(this.freeGameReportForm)
    this.modulePermission.push(this.dailyStatsReportForm)
    this.modulePermission.push(this.suspiciousReportForm)
    this.modulePermission.push(this.fraudReportForm)
    this.modulePermission.push(this.pokerToDgReportForm)
    this.modulePermission.push(this.dgToPokerReportForm)
    this.modulePermission.push(this.tdsReportForm)
    this.modulePermission.push(this.walletBackupForm)
    this.modulePermission.push(this.miscJobForm)
    this.modulePermission.push(this.geoRestrictionForm)
    this.modulePermission.push(this.whitelistForm)
    this.modulePermission.push(this.rafReportForm)
    this.modulePermission.push(this.ipReportForm)
    this.modulePermission.push(this.winningReportForm)
    this.modulePermission.push(this.handsPlayedTogetherReportForm)
    this.modulePermission.push(this.adminActivityReportForm)

    this.permissionCheck();
    if (this.isvalid) {
      if (this.createParamForm.get("role_name").value !== undefined && this.createParamForm.get("role_name").value.trim() !== '') {
        params.set('role_name', this.createParamForm.get("role_name").value)
        this.createParamForm.value['module_permissions'] = this.modulePermission

        this.adminService.createNewRole(UrlConstant.createNewRoleUrl, AppConstants.NO_URL_PARAM, this.createParamForm.value, this.ipAddress, userName, '' + Date.now())
          .subscribe(resData => {
            if (resData['result'] == Responses.SUCCESS) {
              this.closeNewRoleModal();
              this.showAlertBox("Created Succesfully");
              this.role_name = ""
              this.ngOnInit();
              this.isvalid = false;
            } else if (resData['result'] == "INVALID_REQUEST") {
              this.showAlertBox("Invalid Request");
              this.closeNewRoleModal();
              this.role_name = "";
              this.isvalid = false;
              this.showAlertBox(ResponsesDescription.DB_ERROR);
            } else if (resData['result'] == 'ROLE_ALREADY_PRESENT') {
              this.closeNewRoleModal();
              this.role_name = ""
              this.showAlertBox("Role Already exist");
              this.isvalid = false;
            } else {
              this.closeAlertModal();
              this.role_name = ""
              this.showAlertBox("Server Error");
              this.isvalid = false;
            }
          })
      }
    }
    else {
      this.showAlertBox("Role Checkbox cannot be empty, Select atleast 1 Role");
    }
  }
  closeNewRoleModal() {
    this.showCreateModal = false;
  }
}

