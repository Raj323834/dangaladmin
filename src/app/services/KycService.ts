
import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class KycService {
    constructor(private networkService: NetworkService) { }

    getIP(){
        return this.networkService.getIPAddress();
    }
    getKycDetails(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }
    
    getKycJourneyDetails(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }
    approveDocument(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }  
    declineDocument(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }  

    uploadKYCDocument(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }  
    
}
