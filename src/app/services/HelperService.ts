import { Injectable } from "@angular/core";
import { NetworkService } from "./NetworkService";


@Injectable({ providedIn: 'root' })
export class HelperService {
  static permissions: any;
  static accessPermission = [false, false];
  static READ = 1;
  static WRITE = 2

  constructor(private networkService: NetworkService) { }

  static getModulePermissions(moduleName) {
    this.accessPermission = [false, false];
    let storageUserData = JSON.parse(sessionStorage.user)
    this.permissions = storageUserData.permissions
    for (var i = 0; i < this.permissions.length; ++i) {
      if (this.permissions[i].module == moduleName) {
        for (var j = 0; j < this.permissions[i].permissions.length; ++j) {
          if (this.permissions[i].permissions[j] == 'read') {
            this.accessPermission[HelperService.READ] = true
          }
          if (this.permissions[i].permissions[j] == 'write') {
            this.accessPermission[HelperService.WRITE] = true
          }
        }

      }
    }
    return this.accessPermission;
  }
  
  
 
}


