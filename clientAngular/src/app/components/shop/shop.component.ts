import {Component, OnInit,ViewChild, NgModule,EventEmitter} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgbModal,NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {componentFactoryName} from '@angular/compiler';
import {ProductsService} from "../../services/products.service";
import { AttachSession } from 'protractor/built/driverProviders';
import { parse } from 'querystring';
import { FormControl } from "@angular/forms";




@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [NgbModalConfig, NgbModal]
})


export class ShopComponent implements OnInit {



  constructor(
    private authService: AuthService,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private productService: ProductsService
  ) {
    config.backdrop = 'static'
    config.keyboard = false
  }


  products = [];
  

   //busqueda
  filterPost =""
  
  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        res => {
          this.products = res

        },
        err => console.log(err)
      )

  }



  open(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }


  titulo = ""
  precio = ""
  uDispo = ""
  product = ""

  parameters(titulo, precio, uDispo, product) {

    this.titulo = titulo
    this.precio = precio
    this.uDispo = uDispo
    this.product = product

  }

  productsCart = []

  //Carrito de compras
  show: boolean = false

  numberNoti : number = null

  total = 0

 


  cartDiv(name, precio, value, id) {
    var object1 = {
      id: id,
      titulo: name,
      precio: precio,
      cantidad: parseInt(value),
      total: null

    }

    var state = null
    var found = false;

    if (object1.cantidad == 0) {
      alert('Inserta una cantidad por favor')
      state = 0;
    } else {
      state = 1;

    }

    if (this.productsCart.length == 0 && state == 1) {
      object1.total = parseInt(value) * precio;
      this.productsCart.push(object1)
      this.show = true
      this.numberNoti = this.numberNoti + 1
    } else {


      for (let i = 0; i < this.productsCart.length; i++) {
        if (this.productsCart[i].id === id) {

          found = true;
          break;
        }
      }

      if (!found) {
        object1.total = parseInt(value) * precio;
        this.productsCart.push(object1)
        this.numberNoti = this.numberNoti + 1
      } else {
        var foundIndex = this.productsCart.findIndex(x => x.id == id);
        this.productsCart[foundIndex].cantidad = this.productsCart[foundIndex].cantidad + parseInt(value);
        this.productsCart[foundIndex].total = this.productsCart[foundIndex].cantidad * precio

      }
    
    

    }

    console.log(this.productsCart)

    
    var sum = this.productsCart.reduce((a, {total}) => a + total,0)
 
    this.total = sum
    
 
  }

  pay(){
    if (this.productsCart.length != 0) {
    var count = 0
    
    for (let i = 0; i < this.productsCart.length; i++) {
      this.productService.updateProducts(this.productsCart[i])
      .subscribe(
        res =>{
          console.log(res)
          count++
          console.log(this.productsCart.length)
            if (count == this.productsCart.length) {
              console.log(count)
              this.productService.getProducts()
              .subscribe(
                res => {
                  this.products = res
                  count = 0
                  this.productsCart = []
                  this.show = false
                  this.numberNoti = null
                  this.total = 0
                },
                err => console.log(err)
              )
            }
        },err => console.log(err)
      )
      
    }
    }else alert('Inserta almenos un producto')
    

  }

 

  
}















