import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private wishListService: WishlistService) { }
  productsList: Product[] = [];
  wishlist: number[] = [];
  ngOnInit() {
    this.loadProducts();
    this.loadWishList();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.productsList = products;
    });
  }

  loadWishList() {
    this.wishListService.getWishList().subscribe(productIds => {
      console.log(productIds);
      this.wishlist = productIds; });
  }

}
