import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.scss']
})
export class MarketListComponent implements OnInit, OnDestroy {

  subcribeOrders: Subscription;
  orders: Order[];

  constructor(private orderService: OrderService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Market | Hulk Store');
    this.subcribeOrders = this.orderService.getAll()
      .subscribe(orders => this.orders = orders);
  }

  ngOnDestroy(): void {
    this.subcribeOrders.unsubscribe();
  }

}
