import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [
    // { id: 1, productId: 1, productName: 'Test 1', qty: 2, price: 100 },
    // { id: 2, productId: 2, productName: 'Test 2', qty: 3, price: 200 }
    // { id: 3, productId: 3, productName: 'Test 3', qty: 2, price: 300 }
  ];

  cartTotal;

  constructor(private msg: MessengerService) { }

  ngOnInit() {

    this.msg.getMsg().subscribe((producto: Product) => {
      // console.log(producto);
      this.addProductToCart(producto);
    });

  }

  addProductToCart(producto: Product) {

    let productExists = false;

    for (const i in this.cartItems) {
      if (this.cartItems[i].productId === producto.id) {
        this.cartItems[i].qty++;
        productExists = true;
        break;
      }
    }
    if (!productExists) {
      this.cartItems.push({
        productId: producto.id,
        productName: producto.name,
        qty: 1,
        price: producto.price
      });
    }

    // if (this.cartItems.length === 0) {
    //   this.cartItems.push({
    //     productId: producto.id,
    //     productName: producto.name,
    //     qty: 1,
    //     price: producto.price
    //   });
    // } else {
    //   for (const i in this.cartItems) {
    //     if (this.cartItems[i].productId === producto.id) {
    //       this.cartItems[i].qty++;
    //       break;
    //     } else {

    //       this.cartItems.push({
    //         productId: producto.id,
    //         productName: producto.name,
    //         qty: 1,
    //         price: producto.price
    //       });
    //     }
    //   }
    // }

    // se le da valor a cartotal para que haga la suma correta con el operador de asignacion de adicion 
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      console.log(this.cartTotal);
      this.cartTotal += (item.qty * item.price);
      console.log(this.cartTotal);
    });
  }

}
