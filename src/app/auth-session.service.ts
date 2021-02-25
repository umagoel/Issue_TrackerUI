import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthServerProvider {
  constructor(private http: HttpClient) {}

  public login(credentials: any): Observable<any> {
    const data =
      "username=" +
      encodeURIComponent(credentials.email) +
      "&password=" +
      encodeURIComponent(credentials.password) +
      "&submit=Login";
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    return this.http.post("/api/authentication", data, { headers, responseType: 'text' });
    // .pipe(catchError(this.errorHandler));
  }
  // public errorHandler(error: HttpErrorResponse) {
  //   return throwError(error.message || "server error.");
  // }
  public logout(): Observable<void> {
    return this.http.post<void>("api/logout", {});
  }
}
