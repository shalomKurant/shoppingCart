import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [ProductListComponent]
})
export class ProductModule { }
