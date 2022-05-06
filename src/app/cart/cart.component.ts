import { Component, Input, OnInit} from '@angular/core';
import { EventManagerService } from '../services/event-manager.service';
import { LocaStorageAccessService } from '../services/local-storage-access.service';
import { Product } from '../types/Product';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  @Input() products!: Product[];

  public cartProducts!: Product[];
  
  constructor(private EventManagerService: EventManagerService, 
              private LocaStorageAccessService: LocaStorageAccessService) { }

  ngOnInit(): void {
    this.EventManagerService.getCartObservable().subscribe((newProduct: Product) => {
      if (!newProduct) return;

      this.onProductAdded(newProduct);
    })
    const userProducts = this.LocaStorageAccessService.getList();
    this.cartProducts = this.products.filter(product => userProducts.find(userProduct => userProduct.id === product.id))
  }

  public getProductPrice(product: Product): number {
    return product.amount * product.price;
  }

  public getTotalPrice(): number {
    return this.cartProducts.reduce((total, next) => {
      return total + this.getProductPrice(next);
    }, 0)
  }

  public removeItem(product: Product): void {
    product.amount = 0;
    const indexProductToRemove: number = this.cartProducts.indexOf(product);
    this.cartProducts.splice(indexProductToRemove, 1);
    this.LocaStorageAccessService.remove(product);
  }

  private onProductAdded(newProduct: Product): void {
    const existingProduct = this.cartProducts.find(product => product.id === newProduct.id);
    if (existingProduct) {
      existingProduct.amount++;
    } else {
      newProduct.amount = 1;
      this.cartProducts.push(newProduct);
    }
    this.LocaStorageAccessService.save(newProduct);
  }

  public updateAmount(product: Product, actionType: string): void {
    if (actionType === 'increase') {
      product.amount++;
    } else {
      product.amount--;
      if (!product.amount) {
        this.removeItem(product);
        return;
      }
    }
    this.LocaStorageAccessService.save(product);
  } 
}
