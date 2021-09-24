import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class GlobalAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateAuthenticatedUser();
  }

  private validateAuthenticatedUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser().then(
        (currentAuthenticatedUser) => {
          if (currentAuthenticatedUser) {
            resolve(true);
          } else {
            //console.error('[GUARD] - Navigation blocked [1]');
            reject(false);
            this.router.navigateByUrl('/auth');
          }
        },
        (currentAuthenticatedUserError) => {
            // reject the request and navigate to the login page 
            // if the user is not authenticated
            //console.error('[GUARD] - Navigation blocked [2] :: ', currentAuthenticatedUserError);
            reject(false);
            //TODO: navigate to auth
            this.router.navigateByUrl('/auth');
        }
      ).catch((currentAuthenticatedUserError) => {
        //console.error('[GUARD] - Navigation blocked [3] :: ', currentAuthenticatedUserError);
        reject(false);
        //TODO: navigate to auth
        this.router.navigateByUrl('/auth');
      })
    })
  }
  
}
