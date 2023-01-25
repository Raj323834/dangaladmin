
import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class GeoRestrictionService {
    constructor(private networkService: NetworkService) { }

    getIP(){
        return this.networkService.getIPAddress();
    }

    geoRestrict(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    whitelist(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    getAllWhiteListUsers(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    getAllGeoRestricted(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    
    
}
