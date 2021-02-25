import { Account } from './account';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public get(): Observable<Account> {
    return this.http.get<Account>("api/account");
  }

  public save(account: Account): Observable<Account> {
    return this.http.post<Account>("api/account", account);
  }
}
