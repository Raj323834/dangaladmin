
import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';

@Injectable({ providedIn: 'root' })
export class AdminService {
    constructor(private networkService: NetworkService) { }
    getIP() {
        return this.networkService.getIPAddress();
    }

    getRoles(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }

    getRoleIdPermissions(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }

    updateRoleIdPermissions(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }

    createNewRole(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }

    getAllRoles(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    getAllUsers(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    disableUsers(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }

    createUser(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    resetPassword(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    updateUser(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    getUserByUSerID(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
    updatePassword(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpPutWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);

    }
    getUserByID(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
    }
}