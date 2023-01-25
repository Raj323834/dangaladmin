import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  user = '';
  getValue = "";

  permissions = [];

  constructor(location: LocationStrategy) {
    history.pushState(null, null, window.location.href);
    location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }
  alert = ""
  showAlertModal = false;
  showAlertBox = (alert) => {
    this.alert = alert;
    this.showAlertModal = true
  }
  closeAlertModal = () => {
    this.showAlertModal = false
    this.alert = ""
  }
  ngOnInit(): void {
    let storageUserData = JSON.parse(sessionStorage.user)
    this.user = storageUserData.user_name;

   
    if (storageUserData.role.length == 0) {
      this.showAlertBox('You are not assigned any permissions to access this tool. Please ask Admin to assign you role.')
    }

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  Logout() {
    sessionStorage.removeItem('user');
  }
}
