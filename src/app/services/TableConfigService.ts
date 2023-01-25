
import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class TableConfigService {
    constructor(private networkService: NetworkService) { }
    getIP(){
        return this.networkService.getIPAddress();
    }
    getAllTableConfig(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp);

    }
    createTableConfig(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp)
    }

    getTableConfig(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp)
    }
    deleteTableConfig(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpDeleteWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp)
    }
}
