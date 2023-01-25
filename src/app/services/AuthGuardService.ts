import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = sessionStorage.getItem('user');

        if (user) {
            console.log("AuthGuard   User true")
            return true;
        }
        console.log("AuthGuard   User false")
        this.router.navigate(['/login']);
        return false;
    }
}