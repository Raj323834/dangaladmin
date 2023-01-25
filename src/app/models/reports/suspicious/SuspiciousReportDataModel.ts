export class SuspiciousReportDataModel {
    userId?: string;
    isPnlRuleViolated?: boolean;
    isGamePlayPnlRuleViolated?: boolean;
    isManualWithdrawalInLastHours?: boolean;
    isDepositFailure?: boolean;
}