import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventManagerService } from '../services/event-manager.service';
import { FilterCreatorService } from '../services/filter-creator.service';
import { Product } from '../models/Product';
import { IFieldFilter } from '../types/IFieldFilter';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() item!: Product;
  private cartObservable!: BehaviorSubject<Product>;

  constructor(private EventManagerService: EventManagerService,
              private FilterCreatorService: FilterCreatorService) { }

  ngOnInit(): void {
    this.cartObservable = this.EventManagerService.getCartObservable();
    this.getRatingArray();
  }

  public shouldShow(): boolean {
    const filters: Map<string, IFieldFilter> = this.FilterCreatorService.activeFilters;
    return this.item.matchesFilter(filters)
  }

  public addToCart(): void {
    this.cartObservable.next(this.item);
  }
  
  public getRatingArray(): void {
    this.item.rating.rate = Math.floor(this.item.rating.rate); 
  }
}
