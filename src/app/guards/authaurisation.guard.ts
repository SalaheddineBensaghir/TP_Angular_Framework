
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {Observable, retry} from "rxjs";
import {AppStateService} from "../services/app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthaurisationGuard  {
  constructor(private appState : AppStateService,private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |boolean|UrlTree{

    if (!this.appState.authState.roles.include("ADMIN")) {

      return false;
    } else {
      return true
    }


  }
}
