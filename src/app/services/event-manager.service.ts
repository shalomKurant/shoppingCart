import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../types/Product';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  private cartObservable!: BehaviorSubject<Product>;

  constructor() {
    this.initObservable();
   }

   public getCartObservable(): BehaviorSubject<Product> {
    return this.cartObservable;
  }

  private initObservable(): void {
    this.cartObservable = new BehaviorSubject<Product>(null!);
  }
}
