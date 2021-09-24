import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-managed-auth',
  templateUrl: './managed-auth.component.html',
  styleUrls: ['./managed-auth.component.css']
})
export class ManagedAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navigateFederatedLogin() {
    console.log('auth uri :: ', this.generateLWAUri());
    window.location.href = this.generateLWAUri();
  }

  private generateLWAUri(): string {
    const authData = environment.authData;
    const baseUri: string = 'https://' + authData.AppWebDomain + '/login?';
    const clientId: string = 'client_id=' + authData.UserPoolWebClientId;
    const responseType = '&response_type=code';
    const scope = '&scope=' + authData.TokenScopesArray.join('+');
    const redirectUri = '&redirect_uri=' + authData.RedirectUriSignIn
    return baseUri + clientId + responseType + scope + redirectUri;
  }


}
