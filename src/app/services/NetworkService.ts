
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UrlConstant } from '../constant/UrlConstant';

@Injectable({ providedIn: 'root' })
export class NetworkService {
    constructor(private http: HttpClient) {}

    getIPAddress() {
        return this.http.get(UrlConstant.getIPApiUrl).pipe(map(res => {
            return res
        }));
    }

    httpGetWithHeader(url: String, urlParam: String, queryParam: any, ipAddress: string, userName: string, timestamp: string) {
        const headers = this.setHeaders(userName, ipAddress, timestamp);

        return this.http.get<any>(`${environment.apiUrl}${url}${urlParam}`, { params: queryParam, headers: headers })
            .pipe(map(x => {
                return x;

            }))
    }
    
    httpPostWithHeader(url: String, urlParam: String, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        const headers = this.setHeaders(userName, ipAddress, timestamp);

        return this.http.post<any>(`${environment.apiUrl}${url}${urlParam}`, bodyParams, { headers: headers })
            .pipe(map(x => {
                return x;
            }))
    }

    httpPutWithHeader(url: String, urlParam: String, bodyParams: any, ipAddress: string, userName: string, timestamp: string) {
        const headers = this.setHeaders(userName, ipAddress, timestamp);

        return this.http.put<any>(`${environment.apiUrl}${url}${urlParam}`, bodyParams, { headers: headers })
            .pipe(map(x => {
                return x;
            }))
    }

    httpDeleteWithHeader(url: String, urlParam: String, queryParams: any, ipAddress: string, userName: string, timestamp: string) {
        const headers = this.setHeaders(userName, ipAddress, timestamp);

        return this.http.delete<any>(`${environment.apiUrl}${url}${urlParam}`, { params: queryParams, headers: headers })
            .pipe(map(x => {
                return x;
            }))
    }

    httpPostWithoutHeader(url: String, urlParam: String, bodyParams: any) {
        return this.http.post<any>(`${environment.apiUrl}${url}${urlParam}`, bodyParams)
            .pipe(map(x => {
                return x;
            }))
    }

    private setHeaders(userName: string, ipAddress: string, timestamp: string) {
        return new HttpHeaders()
            .set('user_name', userName)
            .set('ip_address', ipAddress)
            .set('timestamp', timestamp);
    }
}
