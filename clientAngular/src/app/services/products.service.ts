import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private URL = 'http://localhost:4000/api'

  

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<any>(this.URL + '/shop')
  }

  updateProducts(products){
    return this.http.post<any>(this.URL + '/shop-update' , products)
  }
}
