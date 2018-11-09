import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  orderForm: FormGroup;
  order: Order = new Order();
  users: User[];
  products: Product[];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {
    const orderId = this.route.snapshot.params['id'];
    this.getUsers();
    this.getProducts();
    this.buildForm();
    if (orderId) {
      this.getOrder(orderId);
    } else {
      this.title.setTitle(`New Order | Hulk Store`);
    }
  }

  getUsers() {
    this.userService.getAll()
      .subscribe(users => this.users = users);
  }

  getProducts() {
    this.productService.getAll()
      .subscribe(products => {
        this.products = products.filter((prod) => prod.quantity !== 0);
      });
  }

  buildForm(): void {
    this.orderForm = this.fb.group({
      user: ['', Validators.required],
      product: [''],
      products: this.fb.array([])
    });
  }

  addProduct(): void {
    const product = this.orderForm.get('product').value;
    this.pushProductFormArray(this.fb.group({
      id: product.id,
      name: product.name,
      quantity: 1,
      price: product.price
    }));
  }

  pushProduct(product): void {
    this.pushProductFormArray(this.fb.group({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price
    }));
  }

  pushProductFormArray(product: FormGroup) {
    (<FormArray>this.orderForm.get('products')).push(product);
  }

  getFormProducts() {
    return (<FormArray>this.orderForm.get('products')).controls;
  }

  getOrder(id: string) {
    this.orderService.getById(id).subscribe(order => {
      this.order = <Order>order;
      this.updateForm(this.order);
      this.title.setTitle(`Order - #${order.id} - ${order.user.firstName} ${order.user.lastName} | Hulk Store`);
    }, error => this.warning(`Doesn't exist`, error));
  }

  updateForm(order: Order) {
    console.log(order.user);
    this.orderForm.patchValue({
      user: order.user
    });

    this.order.products.forEach(product => {
      this.pushProduct(product);
    });
  }

  save() {
    const order = Object.assign({}, this.orderForm.value);
    delete order.product;
    Object.assign(this.order, order);

    if (this.order.id) {
      this.update(this.order);
    } else {
      this.add(this.order);
    }
  }

  add(order: Order) {
    this.orderService.add(order).subscribe(() => {
      this.router.navigate(['/market']);
    }, error => this.warning('could not save', error));
  }

  update(order: Order) {
    this.orderService.update(order).subscribe(() => {
      this.router.navigate(['/market']);
    }, error => this.warning('could not save', error));
  }

  warning(text: string, error) {
    alert(text);
    console.log(error);
  }

  getTotal() {
    const products = this.getFormProducts();
    let total = 0;
    products.forEach(element => {
      const product = element.value;
      total += Math.round(product.quantity * product.price * 100) / 100;
    });

    return '$' + total;
  }

  equals(user1: User, user2: User) {
    return user1.id === user2.id;
  }

}
