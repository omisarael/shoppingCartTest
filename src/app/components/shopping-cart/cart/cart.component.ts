import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

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

  constructor(private msg: MessengerService, private cartService: CartService) { }

  ngOnInit() {
    this.handlleSubscription();
    this.loadCartItems();
  }

  handlleSubscription() {
    this.msg.getMsg().subscribe((producto: Product) => { 
      // tslint:disable-next-line:max-line-length
     // console.log('3-- Tengo el producto paara agregarlo a cart desde messenger.service' + ' ' , producto.name, 'ejecutando this.loadCartItems();' );
      this.loadCartItems();
    });
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
     // console.log('4-- ejecutando loadCartItems() y tengo los items desde cartService.getCartItems()', items);
      this.cartItems = items;
      this.calculateCartTotal();
    });
  }

  calculateCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      // console.log(this.cartTotal);
      // se le da valor a cartotal para que haga la suma correta con el operador de asignacion de adicion 
      this.cartTotal += (item.qty * item.price);
      // console.log(this.cartTotal);
    });
  }


}
