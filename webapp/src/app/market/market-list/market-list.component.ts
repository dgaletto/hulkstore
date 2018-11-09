import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Market } from 'src/app/shared/models/market';
import { MarketService } from 'src/app/shared/services/market.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.scss']
})
export class MarketListComponent implements OnInit, OnDestroy {

  subcribeMarkets: Subscription;
  markets: Market[];

  constructor(private marketService: MarketService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Market | Hulk Store');
    this.subcribeMarkets = this.marketService.getAll()
      .subscribe(markets => this.markets = markets);
  }

  ngOnDestroy(): void {
    this.subcribeMarkets.unsubscribe();
  }

}
