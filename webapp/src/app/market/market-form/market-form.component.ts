import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Market } from 'src/app/shared/models/market';
import { MarketService } from 'src/app/shared/services/market.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-market-form',
  templateUrl: './market-form.component.html',
  styleUrls: ['./market-form.component.scss']
})
export class MarketFormComponent implements OnInit {

  marketForm: FormGroup;
  market: Market = new Market();
  users: User[];
  products: Product[];

  constructor(
    private fb: FormBuilder,
    private marketService: MarketService,
    private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {
    const marketId = this.route.snapshot.params['id'];
    this.getUsers();
    this.getProducts();
    this.buildForm();
    if (marketId) {
      this.getMarket(marketId);
    } else {
      this.title.setTitle(`New Market | Hulk Store`);
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
    this.marketForm = this.fb.group({
      user: ['', Validators.required],
      product: [''],
      products: this.fb.array([])
    });
  }

  addProduct(): void {
    const product = this.marketForm.get('product').value;
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
    (<FormArray>this.marketForm.get('products')).push(product);
  }

  getFormProducts() {
    return (<FormArray>this.marketForm.get('products')).controls;
  }

  getMarket(id: string) {
    this.marketService.getById(id).subscribe(market => {
      this.market = <Market>market;
      this.updateForm(this.market);
      this.title.setTitle(`Market - #${market.id} - ${market.user.firstName} ${market.user.lastName} | Hulk Store`);
    }, error => this.warning(`Doesn't exist`, error));
  }

  updateForm(market: Market) {
    console.log(market.user);
    this.marketForm.patchValue({
      user: market.user
    });

    this.market.products.forEach(product => {
      this.pushProduct(product);
    });
  }

  save() {
    const market = Object.assign({}, this.marketForm.value);
    delete market.product;
    Object.assign(this.market, market);

    if (this.market.id) {
      this.update(this.market);
    } else {
      this.add(this.market);
    }
  }

  add(market: Market) {
    this.marketService.add(market).subscribe(() => {
      this.router.navigate(['/market']);
    }, error => this.warning('could not save', error));
  }

  update(market: Market) {
    this.marketService.update(market).subscribe(() => {
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

    return '$' + Math.round(total * 100) / 100;
  }

  equals(user1: User, user2: User) {
    return user1.id === user2.id;
  }

}
