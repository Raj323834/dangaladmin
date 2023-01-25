import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/HelperService';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-navigationsidebar',
  templateUrl: './navigationsidebar.component.html',
  styleUrls: ['./navigationsidebar.component.scss']
})

export class NavigationsidebarComponent implements OnInit {
  access_permission_write:boolean = false;
  access_permission_read_LEADERBOARD: boolean = false;
  access_permission_read_RUMMY: boolean = false;
  access_permission_read_GEORESTRICTION: boolean =  false;
  access_permission_read_WHITELIST: boolean =  false;
  access_permission_read_CHANGE_PASSWORD: boolean =  false;
  access_permission_read_WITHDRAWAL: boolean =  false;
  access_permission_read_WITHDRAWAL_JOURNEY: boolean =  false;
  access_permission_read_UPDATE_BALANCE: boolean =  false;
  access_permission_read_KYC: boolean = false;
  access_permission_read_KYC_JORNEY: boolean =  false;
  access_permission_read_FIND_PLAYERS: boolean =  false;
  access_permission_read_DEPOSITS: boolean =  false;
  access_permission_read_USER_REGISTRATIONS: boolean =  false;
  access_permission_read_BYPASS_USER_REPORTS: boolean =  false;
  access_permission_read_MANAGE_ADMIN_USERS: boolean = false;
  access_permission_read_MANAGE_ROLES: boolean =  false;
  access_permission_read_CONTACTS: boolean =  false;
  access_permission_read_MANUAL_KYC: boolean =  false;
  access_permission_read_GET_PLAYER_DETAILS: boolean =  false;
  access_permission_read_CONTACT_IN_PLAYER_DETAILS: boolean =  false;
  access_permission_read_MANUAL_REGISTRATION: boolean =  false;
  access_permission_read_BONUS: boolean =  false;
  access_permission_read_LOCK_USER: boolean =  false;
  access_permission_read_FRAUD_USER: boolean =  false;
  access_permission_read_GAME_ORDER: boolean =  false;
  access_permission_read_DELETE_PLAYER: boolean =  false;
  access_permission_read_BANNER_MANAGEMENT: boolean =  false;
  access_permission_read_INCENTIVE_MODULE: boolean =  false;
  access_permission_read_MISC_JOB: boolean =  false;
  access_permission_read_WALLET_BACKUP: boolean =  false;
  access_permission_read_ADMIN_ACTIVITY_REPORT: boolean =  false;
  access_permission_read_SUSPICIOUS_REPORT: boolean =  false;
  access_permission_read_FRAUD_REPORT: boolean =  false;
  access_permission_read_POKER_TO_DG_TRANSFER_REPORT: boolean =  false;
  access_permission_read_DG_TO_POKER_TRANSFER_REPORT: boolean =  false;
  access_permission_read_TRANSACTION_HISTORY_REPORT: boolean =  false;
  access_permission_read_LEADERBOARD_WINNING_REPORT: boolean =  false;
  access_permission_read_WITHDRAWAL_REPORT: boolean =  false;
  access_permission_read_TDS_REPORT: boolean =  false;
  access_permission_read_RAF_REPORT: boolean =  false;
  access_permission_read_IP_REPORT: boolean =  false;
  access_permission_read_WINNING_REPORT: boolean =  false;
  access_permission_read_HANDS_PLAYED_TOGETHER_REPORT: boolean =  false;
  access_permission_read_DEPOSIT_REPORT: boolean = false;
  access_permission_read_DAILY_STATS_REPORT: boolean =  false;
  access_permission_read_SNAPSHOT_REPORT: boolean =  false;
  access_permission_read_RUMMY_TOURNAMENT_REPORT: boolean =  false;
  access_permission_read_CALL_BREAK_GAME_STATS: boolean =  false;
  access_permission_read_TOURNAMENT_REPORT: boolean =  false;
  access_permission_read_FREE_GAME_REPORT: boolean =  false;
  access_permission_read_CASH_GAME_REPORT: boolean =  false;
  access_permission_read_OVERVIEW_REPORT: boolean =  false;
  access_permission_read_OpponentPlayedTogetherReport: boolean =  false;

  public permission: boolean;

  access_permission_write_LEADERBOARD: boolean = false;
  access_permission_write_RUMMY: boolean = false;
  access_permission_write_GEORESTRICTION: boolean =  false;
  access_permission_write_WHITELIST: boolean =  false;
  access_permission_write_CHANGE_PASSWORD: boolean =  false;
  access_permission_write_WITHDRAWAL: boolean =  false;
  access_permission_write_WITHDRAWAL_JOURNEY: boolean =  false;
  access_permission_write_UPDATE_BALANCE: boolean =  false;
  access_permission_write_KYC: boolean = false;
  access_permission_write_KYC_JORNEY: boolean =  false;
  access_permission_write_FIND_PLAYERS: boolean =  false;
  access_permission_write_DEPOSITS: boolean =  false;
  access_permission_write_USER_REGISTRATIONS: boolean =  false;
  access_permission_write_BYPASS_USER_REPORTS: boolean =  false;
  access_permission_write_MANAGE_ADMIN_USERS: boolean = false;
  access_permission_write_MANAGE_ROLES: boolean =  false;
  access_permission_write_CONTACTS: boolean =  false;
  access_permission_write_MANUAL_KYC: boolean =  false;
  access_permission_write_GET_PLAYER_DETAILS: boolean =  false;
  access_permission_write_CONTACT_IN_PLAYER_DETAILS: boolean =  false;
  access_permission_write_MANUAL_REGISTRATION: boolean =  false;
  access_permission_write_BONUS: boolean =  false;
  access_permission_write_LOCK_USER: boolean =  false;
  access_permission_write_FRAUD_USER: boolean =  false;
  access_permission_write_GAME_ORDER: boolean =  false;
  access_permission_write_DELETE_PLAYER: boolean =  false;
  access_permission_write_BANNER_MANAGEMENT: boolean =  false;
  access_permission_write_INCENTIVE_MODULE: boolean =  false;
  access_permission_write_MISC_JOB: boolean =  false;
  access_permission_write_WALLET_BACKUP: boolean =  false;
  access_permission_write_ADMIN_ACTIVITY_REPORT: boolean =  false;
  access_permission_write_SUSPICIOUS_REPORT: boolean =  false;
  access_permission_write_FRAUD_REPORT: boolean =  false;
  access_permission_write_POKER_TO_DG_TRANSFER_REPORT: boolean =  false;
  access_permission_write_DG_TO_POKER_TRANSFER_REPORT: boolean =  false;
  access_permission_write_TRANSACTION_HISTORY_REPORT: boolean =  false;
  access_permission_write_LEADERBOARD_WINNING_REPORT: boolean =  false;
  access_permission_write_WITHDRAWAL_REPORT: boolean =  false;
  access_permission_write_TDS_REPORT: boolean =  false;
  access_permission_write_RAF_REPORT: boolean =  false;
  access_permission_write_IP_REPORT: boolean =  false;
  access_permission_write_WINNING_REPORT: boolean =  false;
  access_permission_write_HANDS_PLAYED_TOGETHER_REPORT: boolean =  false;
  access_permission_write_DEPOSIT_REPORT: boolean = false;
  access_permission_write_DAILY_STATS_REPORT: boolean =  false;
  access_permission_write_SNAPSHOT_REPORT: boolean =  false;
  access_permission_write_RUMMY_TOURNAMENT_REPORT: boolean =  false;
  access_permission_write_CALL_BREAK_GAME_STATS: boolean =  false;
  access_permission_write_TOURNAMENT_REPORT: boolean =  false;
  access_permission_write_FREE_GAME_REPORT: boolean =  false;
  access_permission_write_CASH_GAME_REPORT: boolean =  false;
  access_permission_write_OVERVIEW_REPORT: boolean =  false;
  access_permission_write_OpponentPlayedTogetherReport: boolean =  false;


  constructor() { }


  ngOnInit(): void {
    this.permission = environment.production;
    const accessPermission_read_Manageroles = HelperService.getModulePermissions("manage roles");
    this.access_permission_read_MANAGE_ROLES = accessPermission_read_Manageroles[HelperService.READ];
    const accessPermission_read_Manageadmin = HelperService.getModulePermissions("manage admin users");
    this.access_permission_read_MANAGE_ADMIN_USERS = accessPermission_read_Manageadmin[HelperService.READ];
    const accessPermission_read_GET_PLAYER_DETAILS = HelperService.getModulePermissions("get player details");
    this.access_permission_read_GET_PLAYER_DETAILS = accessPermission_read_GET_PLAYER_DETAILS[HelperService.READ];
    const accessPermission_read_Manualregistration = HelperService.getModulePermissions("manual registration");
    this.access_permission_read_MANUAL_REGISTRATION = accessPermission_read_Manualregistration[HelperService.READ];
    const accessPermission_read_deleteplayer = HelperService.getModulePermissions("delete player");
    this.access_permission_read_DELETE_PLAYER = accessPermission_read_deleteplayer[HelperService.READ];
    const accessPermission_read_lockeduser = HelperService.getModulePermissions("lock user");
    this.access_permission_read_LOCK_USER = accessPermission_read_lockeduser[HelperService.READ];
    const accessPermission_read_frauduser = HelperService.getModulePermissions("fraud user");
    this.access_permission_read_FRAUD_USER = accessPermission_read_frauduser[HelperService.READ];
    const accessPermission_read_Banner = HelperService.getModulePermissions("banner management");
    this.access_permission_read_BANNER_MANAGEMENT = accessPermission_read_Banner[HelperService.READ];
    const accessPermission_read_ConfigurationModule = HelperService.getModulePermissions("incentive module");
    this.access_permission_read_INCENTIVE_MODULE = accessPermission_read_ConfigurationModule[HelperService.READ];
    const accessPermission_read_MiscJob = HelperService.getModulePermissions("misc job");
    this.access_permission_read_MISC_JOB = accessPermission_read_MiscJob[HelperService.READ];
    const accessPermission_read_WalletBackup = HelperService.getModulePermissions("wallet backup");
    this.access_permission_read_WALLET_BACKUP = accessPermission_read_WalletBackup[HelperService.READ];
    const accessPermission_read_KYC = HelperService.getModulePermissions("kyc");
    this.access_permission_read_KYC = accessPermission_read_KYC[HelperService.READ];
    const accessPermission_read_KYCJOURNEY = HelperService.getModulePermissions('kyc journey');
    this.access_permission_read_KYC_JORNEY = accessPermission_read_KYCJOURNEY[HelperService.READ];
    const accessPermission_read_KYCmanual = HelperService.getModulePermissions("manual kyc");
    this.access_permission_read_MANUAL_KYC = accessPermission_read_KYCmanual[HelperService.READ];
    const accessPermission_read_LEADERBOARD = HelperService.getModulePermissions("leaderboard");
    this.access_permission_read_LEADERBOARD = accessPermission_read_LEADERBOARD[HelperService.READ];
    const accessPermission_read_Leaderboardwinning = HelperService.getModulePermissions("leaderboard winning report");
    this.access_permission_read_LEADERBOARD_WINNING_REPORT = accessPermission_read_Leaderboardwinning[HelperService.READ];
    const accessPermission_read_BONUS = HelperService.getModulePermissions("bonus");
    this.access_permission_read_BONUS = accessPermission_read_BONUS[HelperService.READ];
    const accessPermission_read_Updatebalance = HelperService.getModulePermissions("update balance");
    this.access_permission_read_UPDATE_BALANCE = accessPermission_read_Updatebalance[HelperService.READ];
    const accessPermission_read_Rummy = HelperService.getModulePermissions("rummy");
    this.access_permission_read_RUMMY = accessPermission_read_Rummy[HelperService.READ];
    const accessPermission_read_Gameorder = HelperService.getModulePermissions("game order");
    this.access_permission_read_GAME_ORDER = accessPermission_read_Gameorder[HelperService.READ];
    const accessPermission_read_GEOLOCATION = HelperService.getModulePermissions("georestriction");
    this.access_permission_read_GEORESTRICTION = accessPermission_read_GEOLOCATION[HelperService.READ];
    const accessPermission_read_WHITELISTING = HelperService.getModulePermissions('whitelist');
    this.access_permission_read_WHITELIST = accessPermission_read_WHITELISTING[HelperService.READ];
    const accessPermission_read_IP = HelperService.getModulePermissions("ip report");
    this.access_permission_read_IP_REPORT = accessPermission_read_IP[HelperService.READ];
    const accessPermission_read_WinningReports = HelperService.getModulePermissions("winning report");
    this.access_permission_read_WINNING_REPORT = accessPermission_read_WinningReports[HelperService.READ];
    const accessPermission_read_HANDSPLAYED=HelperService.getModulePermissions("hands played together report");
    this.access_permission_read_HANDS_PLAYED_TOGETHER_REPORT = accessPermission_read_HANDSPLAYED[HelperService.READ];
    const accessPermission_read_Pokerdg = HelperService.getModulePermissions("pokertodg report");
    this.access_permission_read_POKER_TO_DG_TRANSFER_REPORT = accessPermission_read_Pokerdg[HelperService.READ];
    const accessPermission_read_Dgpoker=HelperService.getModulePermissions("dgtopoker report");
    this.access_permission_read_DG_TO_POKER_TRANSFER_REPORT = accessPermission_read_Dgpoker[HelperService.READ];
    const accessPermission_read_Callbreak = HelperService.getModulePermissions("call break game stats report");
    this.access_permission_read_CALL_BREAK_GAME_STATS = accessPermission_read_Callbreak[HelperService.READ];
    const accessPermission_read_Userregistration = HelperService.getModulePermissions("user registrations");
    this.access_permission_read_USER_REGISTRATIONS = accessPermission_read_Userregistration[HelperService.READ];
    const accessPermission_read_Transitcionhistpry = HelperService.getModulePermissions("transaction history report");
    this.access_permission_read_TRANSACTION_HISTORY_REPORT = accessPermission_read_Transitcionhistpry[HelperService.READ];
    const accessPermission_read_Overview = HelperService.getModulePermissions("overview report");
    this.access_permission_read_OVERVIEW_REPORT = accessPermission_read_Overview[HelperService.READ];
    const accessPermission_read_Snapshot = HelperService.getModulePermissions("snapshot report");
    this.access_permission_read_SNAPSHOT_REPORT = accessPermission_read_Snapshot[HelperService.READ];
    const accessPermission_read_WITHDRAWAL_REPORT = HelperService.getModulePermissions("withdrawal report");
    this.access_permission_read_WITHDRAWAL_REPORT = accessPermission_read_WITHDRAWAL_REPORT[HelperService.READ];
    const accessPermission_read_DEPOSIT_REPORT = HelperService.getModulePermissions("deposit report");
    this.access_permission_read_DEPOSIT_REPORT = accessPermission_read_DEPOSIT_REPORT[HelperService.READ];
    const accessPermission_read_ADMIN_ACTIVITY_REPORT = HelperService.getModulePermissions("admin activity report");
    this.access_permission_read_ADMIN_ACTIVITY_REPORT = accessPermission_read_ADMIN_ACTIVITY_REPORT[HelperService.READ];
    const accessPermission_read_CASH_GAME_REPORT = HelperService.getModulePermissions("cash game report");
    this.access_permission_read_CASH_GAME_REPORT = accessPermission_read_CASH_GAME_REPORT[HelperService.READ];
    const accessPermission_read_DAILY_STATS_REPORT = HelperService.getModulePermissions("daily stats report");
    this.access_permission_read_DAILY_STATS_REPORT = accessPermission_read_DAILY_STATS_REPORT[HelperService.READ];
    const accessPermission_read_Freegamereport = HelperService.getModulePermissions("free game report");
    this.access_permission_read_FREE_GAME_REPORT = accessPermission_read_Freegamereport[HelperService.READ];
    const accessPermission_read_SUSPICIOUS_REPORT = HelperService.getModulePermissions("suspicious report");
    this.access_permission_read_SUSPICIOUS_REPORT = accessPermission_read_SUSPICIOUS_REPORT[HelperService.READ];
    const accessPermission_read_FRAUD_REPORT = HelperService.getModulePermissions("fraud report");
    this.access_permission_read_FRAUD_REPORT = accessPermission_read_FRAUD_REPORT[HelperService.READ];
    const accessPermission_read_RAF_REPORT = HelperService.getModulePermissions("raf report");
    this.access_permission_read_RAF_REPORT = accessPermission_read_RAF_REPORT[HelperService.READ];
    const accessPermission_read_TDS_REPORT = HelperService.getModulePermissions("tds report");
    this.access_permission_read_TDS_REPORT = accessPermission_read_TDS_REPORT[HelperService.READ];
    const accessPermission_read_TOURNAMENT_REPORT = HelperService.getModulePermissions("tournament report");
    this.access_permission_read_TOURNAMENT_REPORT = accessPermission_read_TOURNAMENT_REPORT[HelperService.READ];
    const accessPermission_read_RUMMY_TOURNAMENT_REPORT = HelperService.getModulePermissions("rummy tournament report");
    this.access_permission_read_RUMMY_TOURNAMENT_REPORT = accessPermission_read_RUMMY_TOURNAMENT_REPORT[HelperService.READ];
    const accessPermission_read_BYPASS_USER_REPORTS = HelperService.getModulePermissions("bypass user reports");
    this.access_permission_read_BYPASS_USER_REPORTS = accessPermission_read_BYPASS_USER_REPORTS[HelperService.READ];
    const accessPermission_read_WITHDRAWAL_JOURNEY = HelperService.getModulePermissions("withdrawal journey");
    this.access_permission_read_WITHDRAWAL_JOURNEY = accessPermission_read_WITHDRAWAL_JOURNEY[HelperService.READ];
    const accessPermission_read_WITHDRAWAL = HelperService.getModulePermissions("withdrawal");
    this.access_permission_read_WITHDRAWAL = accessPermission_read_WITHDRAWAL[HelperService.READ];
    const accessPermission_read_OpponentPlayedTogetherReport = HelperService.getModulePermissions("opponent played together report");
    this.access_permission_read_OpponentPlayedTogetherReport = accessPermission_read_OpponentPlayedTogetherReport[HelperService.READ];


    const accessPermission_write_Manageroles = HelperService.getModulePermissions("manage roles");
    this.access_permission_write_MANAGE_ROLES = accessPermission_write_Manageroles[HelperService.WRITE];
    const accessPermission_write_Manageadmin = HelperService.getModulePermissions("manage admin users");
    this.access_permission_write_MANAGE_ADMIN_USERS = accessPermission_write_Manageadmin[HelperService.WRITE];
    const accessPermission_write_GET_PLAYER_DETAILS = HelperService.getModulePermissions("get player details");
    this.access_permission_write_GET_PLAYER_DETAILS = accessPermission_write_GET_PLAYER_DETAILS[HelperService.WRITE];
    const accessPermission_write_Manualregistration = HelperService.getModulePermissions("manual registration");
    this.access_permission_write_MANUAL_REGISTRATION = accessPermission_write_Manualregistration[HelperService.WRITE];
    const accessPermission_write_deleteplayer = HelperService.getModulePermissions("delete player");
    this.access_permission_write_DELETE_PLAYER = accessPermission_write_deleteplayer[HelperService.WRITE];
    const accessPermission_write_lockeduser = HelperService.getModulePermissions("lock user");
    this.access_permission_write_LOCK_USER = accessPermission_write_lockeduser[HelperService.WRITE];
    const accessPermission_write_frauduser = HelperService.getModulePermissions("fraud user");
    this.access_permission_write_FRAUD_USER = accessPermission_write_frauduser[HelperService.WRITE];
    const accessPermission_write_Banner = HelperService.getModulePermissions("banner management");
    this.access_permission_write_BANNER_MANAGEMENT = accessPermission_write_Banner[HelperService.WRITE];
    const accessPermission_write_ConfigurationModule = HelperService.getModulePermissions("incentive module");
    this.access_permission_write_INCENTIVE_MODULE = accessPermission_write_ConfigurationModule[HelperService.WRITE];
    const accessPermission_write_MiscJob = HelperService.getModulePermissions("misc job");
    this.access_permission_write_MISC_JOB = accessPermission_write_MiscJob[HelperService.READ];
    const accessPermission_write_WalletBackup = HelperService.getModulePermissions("wallet backup");
    this.access_permission_write_WALLET_BACKUP = accessPermission_write_WalletBackup[HelperService.READ];
    const accessPermission_write_KYC = HelperService.getModulePermissions("kyc");
    this.access_permission_write_KYC = accessPermission_write_KYC[HelperService.WRITE];
    const accessPermission_write_KYCJOURNEY = HelperService.getModulePermissions('kyc journey');
    this.access_permission_write_KYC_JORNEY = accessPermission_write_KYCJOURNEY[HelperService.WRITE];
    const accessPermission_write_KYCmanual = HelperService.getModulePermissions("manual kyc");
    this.access_permission_write_MANUAL_KYC = accessPermission_write_KYCmanual[HelperService.WRITE];
    const accessPermission_write_LEADERBOARD = HelperService.getModulePermissions("leaderboard");
    this.access_permission_write_LEADERBOARD = accessPermission_write_LEADERBOARD[HelperService.WRITE];
    const accessPermission_write_Leaderboardwinning = HelperService.getModulePermissions("leaderboard winning report");
    this.access_permission_write_LEADERBOARD_WINNING_REPORT = accessPermission_write_Leaderboardwinning[HelperService.WRITE];
    const accessPermission_write_BONUS = HelperService.getModulePermissions("bonus");
    this.access_permission_write_BONUS = accessPermission_write_BONUS[HelperService.WRITE];
    const accessPermission_write_Updatebalance = HelperService.getModulePermissions("update balance");
    this.access_permission_write_UPDATE_BALANCE = accessPermission_write_Updatebalance[HelperService.WRITE];
    const accessPermission_write_Rummy = HelperService.getModulePermissions("rummy");
    this.access_permission_write_RUMMY = accessPermission_write_Rummy[HelperService.WRITE];
    const accessPermission_write_Gameorder = HelperService.getModulePermissions("game order");
    this.access_permission_write_GAME_ORDER = accessPermission_write_Gameorder[HelperService.WRITE];
    const accessPermission_write_GEOLOCATION = HelperService.getModulePermissions("georestriction");
    this.access_permission_write_GEORESTRICTION = accessPermission_write_GEOLOCATION[HelperService.WRITE];
    const accessPermission_write_WHITELISTING = HelperService.getModulePermissions('whitelist');
    this.access_permission_write_WHITELIST = accessPermission_write_WHITELISTING[HelperService.WRITE];
    const accessPermission_write_IP = HelperService.getModulePermissions("ip report");
    this.access_permission_write_IP_REPORT = accessPermission_write_IP[HelperService.WRITE];
    const accessPermission_write_WinningReports = HelperService.getModulePermissions("winning report");
    this.access_permission_write_WINNING_REPORT = accessPermission_write_WinningReports[HelperService.WRITE];
    const accessPermission_write_HANDSPLAYED=HelperService.getModulePermissions("hands played together report");
    this.access_permission_write_HANDS_PLAYED_TOGETHER_REPORT = accessPermission_write_HANDSPLAYED[HelperService.WRITE];
    const accessPermission_write_Pokerdg = HelperService.getModulePermissions("pokertodg report");
    this.access_permission_write_POKER_TO_DG_TRANSFER_REPORT = accessPermission_write_Pokerdg[HelperService.WRITE];
    const accessPermission_write_Dgpoker=HelperService.getModulePermissions("dgtopoker report");
    this.access_permission_write_DG_TO_POKER_TRANSFER_REPORT = accessPermission_write_Dgpoker[HelperService.WRITE];
    const accessPermission_write_Callbreak = HelperService.getModulePermissions("call break game stats report");
    this.access_permission_write_CALL_BREAK_GAME_STATS = accessPermission_write_Callbreak[HelperService.WRITE];
    const accessPermission_write_Userregistration = HelperService.getModulePermissions("user registrations");
    this.access_permission_write_USER_REGISTRATIONS = accessPermission_write_Userregistration[HelperService.WRITE];
    const accessPermission_write_Transitcionhistpry = HelperService.getModulePermissions("transaction history report");
    this.access_permission_write_TRANSACTION_HISTORY_REPORT = accessPermission_write_Transitcionhistpry[HelperService.WRITE];
    const accessPermission_write_Overview = HelperService.getModulePermissions("overview report");
    this.access_permission_write_OVERVIEW_REPORT = accessPermission_write_Overview[HelperService.WRITE];
    const accessPermission_write_Snapshot = HelperService.getModulePermissions("snapshot report");
    this.access_permission_write_SNAPSHOT_REPORT = accessPermission_write_Snapshot[HelperService.WRITE];
    const accessPermission_write_WITHDRAWAL_REPORT = HelperService.getModulePermissions("withdrawal report");
    this.access_permission_write_WITHDRAWAL_REPORT = accessPermission_write_WITHDRAWAL_REPORT[HelperService.WRITE];
    const accessPermission_write_DEPOSIT_REPORT = HelperService.getModulePermissions("deposit report");
    this.access_permission_write_DEPOSIT_REPORT = accessPermission_write_DEPOSIT_REPORT[HelperService.WRITE];
    const accessPermission_write_ADMIN_ACTIVITY_REPORT = HelperService.getModulePermissions("admin activity report");
    this.access_permission_write_ADMIN_ACTIVITY_REPORT = accessPermission_write_ADMIN_ACTIVITY_REPORT[HelperService.WRITE];
    const accessPermission_write_CASH_GAME_REPORT = HelperService.getModulePermissions("cash game report");
    this.access_permission_write_CASH_GAME_REPORT = accessPermission_write_CASH_GAME_REPORT[HelperService.WRITE];
    const accessPermission_write_DAILY_STATS_REPORT = HelperService.getModulePermissions("daily stats report");
    this.access_permission_write_DAILY_STATS_REPORT = accessPermission_write_DAILY_STATS_REPORT[HelperService.WRITE];
    const accessPermission_write_Freegamereport = HelperService.getModulePermissions("free game report");
    this.access_permission_write_FREE_GAME_REPORT = accessPermission_write_Freegamereport[HelperService.WRITE];
    const accessPermission_write_SUSPICIOUS_REPORT = HelperService.getModulePermissions("suspicious report");
    this.access_permission_write_SUSPICIOUS_REPORT = accessPermission_write_SUSPICIOUS_REPORT[HelperService.WRITE];
    const accessPermission_write_FRAUD_REPORT = HelperService.getModulePermissions("fraud report");
    this.access_permission_write_FRAUD_REPORT = accessPermission_write_FRAUD_REPORT[HelperService.WRITE];
    const accessPermission_write_RAF_REPORT = HelperService.getModulePermissions("raf report");
    this.access_permission_write_RAF_REPORT = accessPermission_write_RAF_REPORT[HelperService.WRITE];
    const accessPermission_write_TDS_REPORT = HelperService.getModulePermissions("tds report");
    this.access_permission_write_TDS_REPORT = accessPermission_write_TDS_REPORT[HelperService.WRITE];
    const accessPermission_write_TOURNAMENT_REPORT = HelperService.getModulePermissions("tournament report");
    this.access_permission_write_TOURNAMENT_REPORT = accessPermission_write_TOURNAMENT_REPORT[HelperService.WRITE];
    const accessPermission_write_RUMMY_TOURNAMENT_REPORT = HelperService.getModulePermissions("rummy tournament report");
    this.access_permission_write_RUMMY_TOURNAMENT_REPORT = accessPermission_write_RUMMY_TOURNAMENT_REPORT[HelperService.WRITE];
    const accessPermission_write_BYPASS_USER_REPORTS = HelperService.getModulePermissions("bypass user reports");
    this.access_permission_write_BYPASS_USER_REPORTS = accessPermission_write_BYPASS_USER_REPORTS[HelperService.WRITE];
    const accessPermission_write_WITHDRAWAL_JOURNEY = HelperService.getModulePermissions("withdrawal journey");
    this.access_permission_write_WITHDRAWAL_JOURNEY = accessPermission_write_WITHDRAWAL_JOURNEY[HelperService.WRITE];
    const accessPermission_write_WITHDRAWAL = HelperService.getModulePermissions("withdrawal");
    this.access_permission_write_WITHDRAWAL = accessPermission_write_WITHDRAWAL[HelperService.WRITE];
    const accessPermission_write_OpponentPlayedTogetherReport = HelperService.getModulePermissions("opponent played together report");
    this.access_permission_write_OpponentPlayedTogetherReport = accessPermission_write_OpponentPlayedTogetherReport[HelperService.WRITE];

  }
}
