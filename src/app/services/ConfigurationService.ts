import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private networkService: NetworkService) { }
  getIP() {
    return this.networkService.getIPAddress();
  }

  updateconfigurations(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
    return this.networkService.httpPutWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp)
  }

  getallconfigurations(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
    return this.networkService.httpGetWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp);

  }

  createconfigurations(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
    return this.networkService.httpPutWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp)
  }

  getConfigurationsTypes(url: string, urlParam: string, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
    return this.networkService.httpGetWithHeader(url, urlParam, queryParam, ipAddress, userName, timestamp);
}
}
