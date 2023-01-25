import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UserLoginService } from '../../services/UserLoginService';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  getValue = ""
  user = null;
  permissions = []
  allModulesList = [
    'withdrawal',
    'kyc',
    'users',
    'withdrawalJourney',
    'kycJourney',
    'manageAdminUsers',
    'manageRoles',
    'deposit',
  ]
  disabled = {
    'withdrawal': true,
    'kyc': true,
    'users': true,
    'withdrawalJourney': true,
    'kycJourney': true,
    'manageAdminUsers': true,
    'manageRoles': false,
    'deposit': true,
  }

  constructor(private accountService: UserLoginService, private router: Router, private location: LocationStrategy) {
    history.pushState(null, null, window.location.href);
    location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    })
  }

  ngOnInit(): void {
    let storageUserData = JSON.parse(sessionStorage.user)
    this.user = storageUserData.user_name;
    this.permissions = storageUserData.permissions
    this.hasAnyPermission()
    sessionStorage.setItem('depositPer', "" + this.disabled.deposit);
    sessionStorage.setItem('withdrawalPer', "true");
    sessionStorage.setItem('kycPer', "" + this.disabled.kyc);
    sessionStorage.setItem('usersPer', "" + this.disabled.users);
    sessionStorage.setItem('withdrawalJourneyPer', "" + this.disabled.withdrawalJourney);
    sessionStorage.setItem('kycJourneyPer', "" + this.disabled.kycJourney);
    sessionStorage.setItem('manageAdminUsersPer', "" + this.disabled.manageAdminUsers);
    sessionStorage.setItem('manageRolesPer', "" + this.disabled.manageRoles);
    this.getValue = sessionStorage.getItem('depositPer');
  }

  hasAnyPermission = () => {
    this.allModulesList.map((moduleName) => {
      let index = this.permissions.findIndex(permissions => permissions.module === moduleName)
      if (index >= 0 && this.permissions[index].permissions !== undefined) {
        this.disabled[moduleName] = this.permissions[index].permissions.length === 0
      }
    })
  }
}