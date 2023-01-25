import { Injectable } from "@angular/core";
import { NetworkService } from "./NetworkService";

@Injectable({ providedIn: 'root' })
export class GameOrderService {
    
    constructor(private networkService: NetworkService) { }

    getIP() {
        return this.networkService.getIPAddress();
    }

    getAllGames(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        return this.networkService.httpGetWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }

    saveGameOrder(url: string, urlParam: string, bodyParams: any, ipAddress: string, userName: string, timestamp: string){
        return this.networkService.httpPostWithHeader(url, urlParam, bodyParams, ipAddress, userName, timestamp);
    }
}