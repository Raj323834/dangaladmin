export class PoketTournamentStatsReportDataModel {
    userId?: string;
    amount?: number;
    openingDepositBalance?: number;
    closingDepositBalance?: number;
    openingWithdrawalBalance?: number;
    closingWithdrawalBalance?: number;
    date?: string;

    playerName?: string;
    sessionToken?: string;
    referenceNumber?: string;
    winAmount?: number;
    bountyWinAmount: number;
    playerAvatar?: string;
    rank?: number;
    buyIn?: number;
    entryFee?: number;
    roundsPlayed?: number;
    rebuyInAmount?: number;
    rebuyEntryFee?: number;
    addonAmount?: number;
    addonEntryFee?: number;
    bountyAmount?: number;
    bountyEntryFee?: number;
    totalEntryFee?: number;
    totalRake?: number;
    rebuyCount?: number;
    addOnCount?: number;
    gameStartTime?: string;
    gameEndTime?: string;
    mode?: string;
    gameId?: string;
    gameType?: number;
    timeStamp?: string;
    totalPlayers?: number;
    name?: string;
    tournamentId: number;
    totalRounds?: number;
    cash: boolean
}