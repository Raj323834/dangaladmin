
import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
    constructor(private networkService: NetworkService) { }
    getIP(){
        return this.networkService.getIPAddress();
    }
    getAllLeaderboard(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp);

    }
    createLeaderboard(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp)
    }

    disableLeaderboard(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp)
    }

    seduleupdate(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp)
    }
    
}
