import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './market.component';
import { MarketListComponent } from './market-list/market-list.component';
import { MarketFormComponent } from './market-form/market-form.component';

const routes: Routes = [
  {
    path: '',
    component: MarketComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: MarketListComponent
      },
      {
        path: 'add',
        component: MarketFormComponent
      },
      {
        path: ':id',
        component: MarketFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule { }
