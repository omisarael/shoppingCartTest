import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { CartItem } from '../models/cart-item';
import { cartUrl } from '../config/api';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  constructor(private http: HttpClient) { }

  getCartItems(): Observable<CartItem[]> {
     // console.log(CartItem[);
    // se obtienen los items del array de cartUrl
    return this.http.get<CartItem[]>(cartUrl).pipe(
      // se utiliza pipe para usar map y obtener un array para poder editarlo
      map((result: any[]) => {
        // se declara variable cartItems de tipo CartItem[] se asingna el valor de vacio
       // ------  cartItems: CartItem[] = []
        // se usa cilo for para cada item del result
        for (let item of result) {
          // por cada item se declara variable productExtist asignando el valor de false
          let productExists = false;
          // console.log(cartItems);
          //  por cada item de reult  se busca por cada item en el array cartItems aquel item que coincida
          // en el productId para que en su qty se le sume 1
          for (let i in this.cartItems) {
            // console.log(cartItems);
            if (this.cartItems[i].productId === item.product.id) {
              this.cartItems[i].qty++;
              // a productExiste se le asigna el valor true
              productExists = true;
              // console.log(cartItems[i]);
              // se rompe ciclo
              break;
            }
          }
          // (!productExists)
          if (productExists === false) {
            // a CartItem se le agrega un nuevo CartItem que contiene e nuevo item
            this.cartItems.push(new CartItem(item.id, item.product));
            // console.log(item.product);
          }
        }
        return this.cartItems;
      })
    );
  }

  addProductToCart(product: Product): Observable<any> {
    // console.log('2-- ejecutando addProductToCart recibiendo el producto seleccionado a su vez agregandolo a cartUrl con post');
    return this.http.post(cartUrl, { product });

  }


}
