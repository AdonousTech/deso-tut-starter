import { Injectable } from '@angular/core';
import { BitcloutIdentityService } from './bitclout-identity.service';

@Injectable({
  providedIn: 'root'
})
export class BitcloutBackendApiHelperService {

    // Store last local node URL in localStorage
  LastLocalNodeKey = 'lastLocalNodeV2';

  // Store last logged in user public key in localStorage
  LastLoggedInUserKey = 'lastLoggedInUser';

  // Store the last identity service URL in localStorage
  LastIdentityServiceKey = 'lastIdentityServiceURL';

 // TODO: Wipe all this data when transition is complete
  LegacyUserListKey = 'userList';
  LegacySeedListKey = 'seedList';

  // Store the identity users in localStorage
  IdentityUsersKey = 'identityUsers';

  constructor(public identityService: BitcloutIdentityService) { }

  SetStorage(key: string, value: any) {
    //console.log('setting storage :: ', key, value);
    localStorage.setItem(key, value ? JSON.stringify(value) : '');
  }

  RemoveStorage(key: string) {
    localStorage.removeItem(key);
  }

  GetStorage(key: string) {
    const data = localStorage.getItem(key);
    if (data === '') {
      return null;
    }

    return JSON.parse(<string>data);
  }

  setIdentityServiceUsers(users: any, publicKeyAdded?: string) {
    this.SetStorage(this.IdentityUsersKey, users);
    this.identityService.identityServiceUsers = users;
    this.identityService.identityServicePublicKeyAdded = <string>publicKeyAdded;
  }

}
