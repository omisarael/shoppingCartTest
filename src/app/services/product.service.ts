import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { productsUrl } from 'src/app/config/api';

// const apiUrl = 'http://localhost:3000/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // products: Product[] = [

  //   new Product( 1, 'Product 1', 'this product 1 description', 100, 'https://pbs.twimg.com/media/DxNrZkaXQAUm2Mq.jpg'),
  //   new Product( 2, 'Product 2', 'this product 2 description', 200, 'https://pbs.twimg.com/media/DxNrZkaXQAUm2Mq.jpg' ),
  //   new Product( 3, 'Product 3', 'this product 3 description', 300, 'https://pbs.twimg.com/media/DxNrZkaXQAUm2Mq.jpg' )
  // ];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }
}
