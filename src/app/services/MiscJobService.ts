import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class MiscJobService {
    constructor(private networkService: NetworkService) { }
    getIP() {
        return this.networkService.getIPAddress();
    }

  walletbackup(url: string, urlParam: string, bodyParam: any, ipAddress: string, userName: string, timestamp: string) {
    return this.networkService.httpPutWithHeader(url, urlParam, bodyParam, ipAddress, userName, timestamp);
}
}
