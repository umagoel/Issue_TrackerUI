import { Issue } from './issue';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  // baseUrl = '/api/issue';

  constructor(private _http:HttpClient) { }
  getAll(): Observable<Array<Issue>>{
    return this._http.get<Array<Issue>>(`api/issue/all`)
  }
}
