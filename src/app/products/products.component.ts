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


this.searchProduct();
  }
  searchProduct(){
this.appState.setProductState({
  status: "LOADING"
})

this.productService.searchProduct(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize)
  .subscribe({
      next: (resp) => {
       let products=resp.body as Product[];
        let totalProducts:number =parseInt(resp.headers.get('X-Total-Count')!);
       // this.appState.productState.totalProduct=totalProducts;

      let  totalPage: number= Math.floor(totalProducts/this.appState.productState.pageSize);
if(totalProducts % this.appState.productState.pageSize!=0){
  // this.appState.productState.totalPage=this.appState.productState.totalPage+1;
++totalPage;
}
this.appState.setProductState({
products: products,totalProducts: totalProducts,totalPage:totalPage,status:"LOADED"
})

        },
      error : err => { this.appState.setProductState({
        status: "ERROR",
        errorMessage: err
      })

      }
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
  this.searchProduct();
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
    this.searchProduct()
  }

  handleEdite(product: Product) {
this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}

