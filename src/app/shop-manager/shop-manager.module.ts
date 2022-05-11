import { NgModule } from '@angular/core';
import { FilterModule } from '../filter/filter.module';
import { ShopManagerComponent } from './shop-manager.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductModule } from '../product/product.module';
import { CartModule } from '../cart/cart.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ShopManagerComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    ProductModule,
    CartModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [ShopManagerComponent]
})
export class ShopManagerModule { }
