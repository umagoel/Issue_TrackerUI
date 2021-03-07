import { AppStore } from 'src/app/app.store';
import { Principal } from './principal.service';
import { AuthServerProvider } from './auth-session.service';
import { AuthPayload } from './auth-payload';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Dictionary } from "lodash";
import { User } from "./User";
import { Account } from './account';

// import * as SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient, private router: Router ,
     private authServerProvider: AuthServerProvider, private principal : Principal,
     private store: AppStore) {}

  public login(credentials: AuthPayload): Promise<Account> {
    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        () => {
          this.principal.identity(true).then((account) => {
            resolve(account);
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public logout(): void {
    // const socket = new SockJS('/api/alert-websocket');
    // const stompClient = Stomp.over(socket);

    this.authServerProvider.logout().subscribe(() => {
      // if (stompClient.status === 'CONNECTED') {
      // stompClient.disconnect();
      // }
      this.principal.authenticate(null);
      this.http.get('/api/account').subscribe(()=>console.log(''))
      this.store.updateStore('showDashboardNav', false)
      this.router.navigate([ "login"]);
    });
  }

  // public resetPasswordInit(values: MailCaptcha): Observable<void> {
  // return this.http.post<void>('api/account/reset-password/init', values);
  // }

  // public resetPasswordFinish(keyPassword: KeyPassword): Observable<void> {
  // return this.http.post<void>('api/account/reset-password/finish', keyPassword);
  // }

  public getUserByKey(key: string): Observable<User> {
    return this.http.post<User>(`api/account/signup-init`, key);
  }

  public signupFinish(keyPassword: any): Observable<void> {
    return this.http.post<void>("api/account/signup-finish", keyPassword);
  }

  // public changePassword(changePassword: ChangePassword): Observable<void> {
  // return this.http.post<void>('api/account/change-password', changePassword);
  // }

  public updateUser(user: User): Observable<User> {
    return this.http.post<User>("api/account", user);
  }

  public getUserAuthentication(
    emailID: string
  ): Observable<Dictionary<string>> {
    return this.http.post<Dictionary<string>>(
      `/api/getAuthentication`,
      emailID
    );
  }
}
