import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from 'src/app/model/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _roles: string[] = [];

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'BSEP-Project',
        clientId: 'bsep-project'
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  get roles(): string[] {
    return this._roles;
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';
      this._roles = this.keycloak.tokenParsed?.realm_access?.roles || []; // Extract roles from token
    }
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout({redirectUri: 'https://localhost:4200'});
  }
}
