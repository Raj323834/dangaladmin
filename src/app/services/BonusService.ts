
import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class BonusService
 {
    constructor(private networkService: NetworkService) { }
    getIP(){
        return this.networkService.getIPAddress();
    }

    getAllBonus(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }

    createNewBonus(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }
    
    updateBonus(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }  
}
