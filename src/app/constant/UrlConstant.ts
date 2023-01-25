
export class UrlConstant {

  //IP_ADDRESS
  public static getIPApiUrl: string = "http://api.ipify.org/?format=json";

  //WITHDRAWAL DETAILS
  public static getWithdrawalUrl: string = "/admin/v1/report/withdrawal?";
  public static processWithdrawalUrl: string = "/admin/v1/withdrawals/process";
  public static getWithdrawalJourneyUrl: string = "/admin/v1/withdrawals/status/";
  //KYC DETAILS
  public static getKycDetailsUrl: string = "/admin/v1/kyc/documents?";
  public static approveDocumentUrl: string = "/admin/v1/kyc/approve";
  public static declineDocumentUrl: string = "/admin/v1/kyc/decline";
  public static uploadKYCUrl: string = "/admin/v1/kyc/upload/";
  //KYC JOURNEY
  public static getKycJourneyDetailsUrl: string = "/admin/v1/kyc/";


  //BONUSES
  public static getAllBonusUrl: string = "/admin/v1/bonus/";
  public static updateBonusUrl: string = "/admin/v1/bonus/";
  public static createBonusUrl: string = "/admin/v1/bonus/";

  //LEADERBOARD
  public static getAllLeaderboardsUrl: string = "/admin/v1/leaderboards";
  public static disableLeaderboardUrl: string = "/admin/v1/leaderboards/";
  public static createLeaderboardUrl: string = "/admin/v1/leaderboards";
  public static updateSedulePointLeaderboardUrl: string = "/admin/v1/leaderboards/users/internal"

  //RUMMY
  public static getAllTableConfigUrl: string = "/admin/v1/rummy/tableconfig";
  public static deleteTableConfigUrl: string = "/admin/v1/rummy/tableconfig/";
  public static getTableConfigUrl: string = "/admin/v1/rummy/tableconfig/";
  public static createTableConfigUrl: string = "/admin/v1/rummy/tableconfig";

  //ADMIN ACTIVITY REPORT
  public static getAllAdminActivityUrl: string = "/admin/v1/report/activitylogs?";
  public static getAdminActivityUrl: string = "/admin/v1/activitytypes/";

  //SUSPICIOUS REPORT
  public static getSuspiciousReportUrl: string = "/admin/v1/report/suspicious?";
  public static updateFraudUserInSuspiciousReportUrl: string = "/admin/v1/stats/suspicious";

  // FRAUD REPORT
  public static getFraudReportUrl: string = "/admin/v1/report/fraud?";
  // DEPOSIT REPORT
  public static getDepositReportUrl: string = "/admin/v1/report/deposit?";
  // WINNING REPORT
  public static getWinningReportUrl: string = "/admin/v1/report/winnings?";
  // USER REGISTRATION REPORT
  public static getUserRegistrationReportUrl: string = "/admin/v1/registrations";

  // DAILY STATS REPORT
  public static getDailyStatsReportUrl: string = "/admin/v1/report/dailystats";

  // SNAPSHOT REPORT REPORT
  public static getSnapshotReportUrl: string = "/admin/v1/report/snapshot";

  // BY PASS REPORT
  public static getByPassReportUrl: string = "/admin/v1/withdrawals/bypass";
  // create BY PASS REPORT
  public static createByPassReportUrl: string = "/admin/v1/withdrawals/bypass";
  // delete BY PASS REPORT
  public static deleteByPassReportUrl: string = "/admin/v1/withdrawals/bypass/";

  // HANDS PLAYED TOGETHER REPORT
  public static getHandsPlayedTogetherReportUrl: string = "/admin/v1/report/playedtogether?";


  // POKER_TO_DG REPORT
  public static getPokerToDgdGReportUrl: string = "/admin/v1/report/pokertodg?";

  // DG_TO_POKER REPORT
  public static getDgToPokerReportUrl: string = "/admin/v1/report/dgtopoker?";

  //TDS REPORT
  public static getTdsReportUrl: string = "/admin/v1/report/tds?";

  //RAF REPORT
  public static getRAFReportUrl: string = "/admin/v1/report/raf";


  //TRANSACTION HISTORY REPORT
  public static getTransactionHistoryReportUrl: string = "/admin/v1/wallets/transactions?";
  //LEADERBOARD WINNING REPORT
  public static getLeaderboardWinningReportUrl: string = "/admin/v1/leaderboards/leaderboard-result/";

  //WITHDRAWAL  REPORT
  public static getWithdrawalReportUrl: string = "/admin/v1/report/withdrawal?";
  //CASH  REPORT
  public static getCashReportUrl: string = "/admin/v1/player/stats/cash?";

  //FREE  REPORT
  public static getFreeReportUrl: string = "/admin/v1/player/stats/free?";

  //OVERVIEW   REPORT
  public static getOverviewReportUrl: string = "/admin/v1/report/business";



  //GEO RESTRICTION
  public static getGeoRestrictionUrl: string = "/admin/v1/georestrict/";
   //WHITELIST
   public static getWhitelistUrl: string = "/admin/v1/georestrict/whitelist";
   
  //IP REPORT RESTRICTION
  public static getIPReportUrl: string = "/admin/v1/report/ip?";

  //CHANGE PASSWORD
  public static changePassword: string = "/admin/v1/users/password/";

  //USERS
  public static getUserByUserIdUrl: string = "/admin/v1/service/ups/users?";
  public static updateUserInfo: string = "/admin/v1/service/ups/info";
  public static registerEmailUrl: string = "/admin/v1/manual/register/email";
  public static registerMobileUrl: string = "/admin/v1/manual/register/mobile";
  public static getAdminUserByUserIdUrl: string = "/admin/v1/users/";
  public static deleteUserUrl: string = "/admin/v1/cleanup/";
  public static getAllWhiteListUserUrl: string = "/admin/v1/georestrict/whitelisted";
  public static getAllGeoRestrictedUrl: string = "/admin/v1/georestrict/restricted";
  public static lockUserUrl: string = "/admin/v1/auth/lock";
  public static unLockUserUrl: string = "/admin/v1/auth/lock";
  public static getAllLockedUSersListUrl: string = "/admin/v1/auth/lock";
  
  //UPDATE BALANCE
  public static updateBalanceUrl: string = "/admin/v1/wallets/";

  //ADMIN REPORT
  public static createNewRoleUrl: string = "/admin/v1/role-permissions/";
  public static UpdateRoleIdPermissionsUrl: string = "/admin/v1/role-permissions/";
  public static GetRoleIdPermissionsUrl: string = "/admin/v1/role-permissions/";
  public static getRoleUrl: string = "/admin/v1/roles";
  public static getAllRoleUrl: string = "/admin/v1/roles/";
  public static getAllUserUrl: string = "/admin/v1/users/";
  public static disableUserUrl: string = "/admin/v1/users/disable/";
  public static createUserUrl: string = "/admin/v1/users/";
  public static updateUserUrl: string = "/admin/v1/users/update/";
  public static getUserByUserIDUrl: string = "/admin/v1/users/";
  public static resetPasswordUrl: string = "/admin/v1/users/reset-password/";

  // Game Order
  public static getAllGamesUrl: string = "/admin/v1/games/";
  public static saveGameOrderUrl: string = "/admin/v1/games/order/";

  // Login
  public static loginUrl: string = "/admin/v1/users/login";

  //Poker tournament stats REPORT
  public static getPokerTournamentReportUrl: string = "/admin/v1/report/tournament/poker?";

  //Rummy tournament stats REPORT
  public static getRummyTournamentReportUrl: string = "/admin/v1/report/tournament/rummy?";

  // Get call break games stats
  public static getCallBreakGameStatsReportUrl: string = "/admin/v1/callbreak/stats?";

  // Get call break games stats
  public static getCallBreakRoundStatsReportUrl: string = "/admin/v1/callbreak/stats/round?";

   // Get call break games stats
   public static getCallBreakGamesLogReportUrl: string = "/admin/v1/callbreak/logs?";

  // Get All Fraud Users
  public static getAllFraudUsersList: string = "/admin/v1/stats/fraud"
  public static markFraudUser: string = "/admin/v1/stats/fraud/"

  //Get banner 

  public static homebanner:string = "/admin/v1/banners/?"
  public static dealsbanner:string = "/admin/v1/banners/?"
  public static insertbanner:string = "/admin/v1/banners/"

  //Configurations
  public static configurationServiceUrl: string = "/admin/v1/configurations/"
  public static configurationServicesUrl: string = "/admin/v1/configurations/services";

  //Misc job
 
  public static walletBackupUrl: string = "/admin/v1/wallet/backup/?"

  //Opponent Played Together Report
  public static opponentPlayedTogetherUrl: string = "/admin/v1/playedtogether/opponent";

}
