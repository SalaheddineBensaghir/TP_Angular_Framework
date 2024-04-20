import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private  appState: AppStateService,private loadingService: LoadingService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // this.appState.setProductState({
    //   status: "LOADING"
    // })
    this.loadingService.showLoadingSpiner();
    let req1=req.clone({
      headers: req.headers.set("Authorization","Bearer JWT")
    });

    return next.handle(req1).pipe(
      finalize(()=>{
// //this.appState.setProductState({
//
//         status: ""
// })
        this.loadingService.hideLoadingSpiner();
    })
  );
  }}
