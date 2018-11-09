import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  subcribeProducts: Subscription;
  products: Product[];

  constructor(private productService: ProductService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Products | Hulk Store');
    this.subcribeProducts = this.productService.getAll()
      .subscribe(products => this.products = products);
  }

  ngOnDestroy(): void {
    this.subcribeProducts.unsubscribe();
  }

}
