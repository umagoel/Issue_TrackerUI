import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "./User";
import { AuthService } from "./auth.service";
import { Account } from './account';

@Injectable()
export class Principal {
  private _userIdentity: User;
  // private _clientConfig: ClientConfig;
  private _lastModifiedCodeValue: Date;
  private authenticated: boolean;
  private authenticationState: Subject<User> = new Subject<User>();

  constructor(private account: AuthService) {
    this.authenticated = false;
  }

  public authenticate(identity: User): void {
    this._userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this._userIdentity);
  }

  public get userIdentity(): User {
    return this._userIdentity;
  }


  public set userIdentity(userIdentity: User) {
    this._userIdentity = userIdentity;
  }

  public get lastModifiedCodeValue(): Date {
    return this._lastModifiedCodeValue;
  }

  public set lastModifiedCodeValue(lastModifiedCodeValue: Date) {
    this._lastModifiedCodeValue = lastModifiedCodeValue;
  }

  public get emailId(): string {
    return this._userIdentity.emailId;
  }

  public get username(): string {
    return this._userIdentity ? this._userIdentity.firstName : null;
  }

  get siteKey(): string {
    return "6Lfz6kAUAAAAANEE79CH3Scu75EaQQMrAomZxLse";
  }

  public hasAnyAuthority(authorities: string[]): Promise<boolean> {
    return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
  }

  public hasAnyAuthorityDirect(authorities: string[]): boolean {
    if (
      !this.authenticated ||
      !this._userIdentity ||
      !this._userIdentity.role
    ) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this._userIdentity.role.indexOf(authorities[i]) !== -1) {
        return true;
      }
    }

    return false;
  }

  public hasAuthority(authority: string): Promise<boolean> {
    if (!this.authenticated) {
      return Promise.resolve(false);
    }

    return this.identity().then(
      (id) =>
        Promise.resolve(
          id.authorities && id.authorities.indexOf(authority) !== -1
        ),
      () => Promise.resolve(false)
    );
  }

  public identity(force?: boolean): Promise<any> {
    if (force === true) {
      this._userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity da
    // ta from the server.
    // if we have, reuse it by immediately resolving
    if (this._userIdentity) {
      return Promise.resolve(this._userIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return new Promise<Account>((resolve, reject) => {
      this.account
        .get()
        .toPromise()
        .then((account) => {
          if (account) {
            this._userIdentity = account.user;
            this.authenticated = true;
          } else {
            this._userIdentity = null;
            this.authenticated = false;
          }
          this.authenticationState.next(this._userIdentity);
          resolve(account);
        })
        .catch(() => {
          this._userIdentity = null;
          this.authenticated = false;
          this.authenticationState.next(this._userIdentity);
          reject(null);
        });
    });
    /*return this.account
.get()
.toPromise()
.then(account => {
if (account) {
this._userIdentity = account.user;
this._clientConfig = account.config;
this._lastModifiedCodeValue = account.lastModifiedCodeValue;
this.authenticated = true;
} else {
this._userIdentity = null;
this.authenticated = false;
}
this.authenticationState.next(this._userIdentity);
return account;
})
.catch(() => {
this._userIdentity = null;
this.authenticated = false;
this.authenticationState.next(this._userIdentity);
return null;
});*/
  }

  public getUser(): Promise<User> {
    return new Promise((res, rej) => {
      if (this._userIdentity) {
        res(this._userIdentity);
        return;
      }
      rej({});
    });
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public isIdentityResolved(): boolean {
    return this._userIdentity !== undefined;
  }

  public getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

}
