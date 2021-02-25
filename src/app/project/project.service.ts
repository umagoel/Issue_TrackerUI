import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Project } from '../Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http:HttpClient) { }
  getAll(): Observable<Array<Project>>{
    return this._http.get<Array<Project>>(`api/project/all`)
}
}
