export interface RummyTournamentStatsReportsDataModel {

    userId?: string;
    userName?: string;
    avatarUrl? : string;
    rebuyAmount? : number;
    rakeAmount? : number;
    wonAmount? : number;
    wageredAmount? : number;
    eventName? : string;
    maxRegistrations? : number;
    numberOfLevels? : number;
    tournamentName? : string;
    tournamentId? : number;
    tournamentDate? : any;
    siteId? : number;
    totalRegistrations? :number;
    entryFeeType? : string;
    entryFee? : number;
    totalPrizeAmount? : number;
    isStaticTournament?: any ;
    isPlayed? : any ;
}
