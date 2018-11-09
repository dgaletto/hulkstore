import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductFormComponent],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
