
import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class WithdrawalService {
    constructor(private networkService: NetworkService) { }
    getIP(){
        return this.networkService.getIPAddress();
    }

    getWithdrawals(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }
    getWithdrawalJourney(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }
    processWithdrawal(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }  
}
