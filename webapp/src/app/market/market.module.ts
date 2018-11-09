import { NgModule } from '@angular/core';
import { MarketComponent } from './market.component';
import { MarketRoutingModule } from './market-routing.module';
import { OrderFormComponent } from './order-form/order-form.component';
import { MarketListComponent } from './market-list/market-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MarketComponent, OrderFormComponent, MarketListComponent],
  imports: [
    SharedModule,
    MarketRoutingModule
  ]
})
export class MarketModule { }
