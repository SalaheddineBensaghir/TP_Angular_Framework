import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements  OnInit{
  constructor(private productService:ProductService,private router : Router,public appState: AppStateService) {
  }
 // products$!: Observable<Array<Product>>;




  ngOnInit(): void{


this.getProduct();
  }
  getProduct(){


this.productService.getProduct(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize)
  .subscribe({
      next: (resp) => {
        this.appState.productState.products=resp.body as Product[];
        let totalProducts : number=parseInt(resp.headers.get('X-Total-Count')!);
        console.log(totalProducts);

this.appState.productState.totalPage= Math.floor(totalProducts/this.appState.productState.pageSize);
if(totalProducts % this.appState.productState.pageSize!=0){
  this.appState.productState.totalPage=this.appState.productState.totalPage+1;
}

        },
      error : err => console.log(err)
    })
    // this.products$=this.productService.getProduct();

  }
  handleCheckProduct(product: Product) {
this.productService.checkProduct(product)      .subscribe(
        {
          next: updatedProduct =>{
            // this.products.map(p=>{
            //   if(p.id==product.id){
            //     return updatedProduct
            //   } else return  p;
            // })
            product.checked=!product.checked;

          }
        }
      )
    // product.checked=!product.checked;
  }

  handleDelete(product: Product) {
    if(confirm("test "))
this.productService.deleteProduct(product).subscribe({
  next:value => {
   //this.getProduct();
    this.appState.productState.products=this.appState.productState.products.filter((p:any )=>p.id!=product.id);
  }
})
  }

//   searchProduct() {
//     this.appState.productState.currentPage=1;
//     this.appState.productState.totalPage=0;
// this.productService.getProduct(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize).subscribe({
//   next : value =>
//   {this.appState.productState.products=value;
//
//   }
// })  }

  handleGotoPage(page: number) {
   this.appState.productState.currentPage=page;
    this.getProduct()
  }

  handleEdite(product: Product) {
this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}

