import { AppStore } from 'src/app/app.store';
import { Principal } from './principal.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private principal: Principal, private store: AppStore){

  }
  canActivate(): Observable<boolean> | boolean  {

    return new Observable<boolean>(observer=>{
      this.principal.identity()
        .then(()=>{
          this.store.updateStore('showDashboardNav', true);
          observer.next(true);
          observer.complete();
        }).catch(()=>{
          this.store.updateStore('showDashboardNav', false);
          observer.error(false);
          observer.complete();
        })
      return observer;
    });
    // return true;
  }

}
