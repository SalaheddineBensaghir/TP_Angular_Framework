import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public  productState:any = {
    products : [] ,
    keyword : "" ,
    totalPage: 0,
    pageSize:3,
    currentPage:1,
    totalProduct:0
  }

  constructor() { }
}
