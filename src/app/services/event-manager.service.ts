import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../types/Product';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  private cartObservable!: BehaviorSubject<IProduct>;

  constructor() {
    this.initObservable();
   }

   public getCartObservable(): BehaviorSubject<IProduct> {
    return this.cartObservable;
  }

  private initObservable(): void {
    this.cartObservable = new BehaviorSubject<IProduct>(null!);
  }
}
