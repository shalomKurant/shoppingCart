import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [CartComponent]
})
export class CartModule { }
