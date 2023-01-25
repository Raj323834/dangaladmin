import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NetworkService } from './NetworkService';
import { Responses } from '../constant/Responses';

@Injectable({ providedIn: 'root' })
export class UserLoginService {
    constructor(
        private networkService: NetworkService) { }

    login(url: string, urlParam: string, bodyParams: any) {
        return this.networkService.httpPostWithoutHeader(url, urlParam, bodyParams).pipe(map(x => {
            if (x.result === Responses.SUCCESS) {
                sessionStorage.setItem('user', JSON.stringify(x));
                sessionStorage.setItem('permissions', JSON.stringify(x.permissions));
                sessionStorage.setItem('user_name', JSON.stringify(x.user_name));
                sessionStorage.setItem('user_id', JSON.stringify(x.user_id));
                sessionStorage.setItem('disabled', JSON.stringify(x.disabled));
                sessionStorage.setItem('roleId', JSON.stringify(x.roleId));
                sessionStorage.setItem('role', JSON.stringify(x.role));
            }
            return x;
        }))
    }
}
