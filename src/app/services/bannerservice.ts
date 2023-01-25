import { Injectable } from '@angular/core';
import { NetworkService } from './NetworkService';


@Injectable({
  providedIn: 'root'
})
export class BannerservicesService {

  constructor(private networkService: NetworkService) { }
    getIP(){
        return this.networkService.getIPAddress();
    }
    gethomebanner(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp);

    }
    
    getdealsbanner(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
      return this.networkService.httpGetWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp);

  }

   

    insertbanner(url: string, queryParam: string, urlParam: any, ipAddress: string, userName: string, timestamp: string) {
      return this.networkService.httpPutWithHeader(url, queryParam, urlParam, ipAddress, userName, timestamp)
  }
}
