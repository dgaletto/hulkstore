import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  product: Product = new Product();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.buildForm();
    if (productId) {
      this.getProduct(productId);
    } else {
      this.title.setTitle(`New product | Hulk Store`);
    }
  }

  buildForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  getProduct(id: string) {
    this.productService.getById(id).subscribe(product => {
      this.product = <Product>product;
      this.updateForm(this.product);
      this.title.setTitle(`Product - ${product.name} | Hulk Store`);
    }, error => this.warning(`Doesn't exist`, error));
  }

  updateForm(product: Product) {
    this.productForm.patchValue({
      name: product.name,
      quantity: product.quantity,
      price: product.price
    });
  }

  save() {
    Object.assign(this.product, this.productForm.value);

    if (this.product.id) {
      this.update(this.product);
    } else {
      this.add(this.product);
    }
  }

  add(product: Product) {
    this.productService.add(product).subscribe( () => {
      this.router.navigate(['/product']);
    }, error => this.warning('could not save', error));
  }

  update(product: Product) {
    this.productService.update(product).subscribe(() => {
      this.router.navigate(['/product']);
    }, error => this.warning('could not save', error));
  }

  warning(text: string, error) {
    alert(text);
    console.log(error);
  }

}
