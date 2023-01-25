
import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private networkService: NetworkService) { }
    getIP() {
        return this.networkService.getIPAddress();
    }
    getUserByUserId(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }

    lockUser(url: string, urlParam: string, bodyParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParam, ipAddress, userName, timestamp);
    }
    fraudUser(url: string, urlParam: string, bodyParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParam, ipAddress, userName, timestamp);
    }
    unLockUser(url: string, urlParam: string, bodyParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpDeleteWithHeader(url, urlParam, bodyParam, ipAddress, userName, timestamp);
    }

    getAllLockedUserList(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }

    getAllFraudUserList(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }

    updateBalance(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }

    updateUserInfo(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }

    registerEmail(url: string, urlParam: string, bodyParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParam, ipAddress, userName, timestamp);
    }

    registerMobile(url: string, urlParam: string, bodyParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParam, ipAddress, userName, timestamp);
    }

    deleteUser(url: string, urlParam: string, bodyParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpDeleteWithHeader(url, urlParam, bodyParam, ipAddress, userName, timestamp);
    }
}
