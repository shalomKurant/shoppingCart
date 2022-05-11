import { Component, OnInit } from '@angular/core';
import { FilterCreatorService } from '../services/filter-creator.service';
import { ProductProviderService } from '../services/product-provider.service';
import { Product } from '../models/Product';

@Component({
  selector: 'shop-manager',
  templateUrl: './shop-manager.component.html',
  styleUrls: ['./shop-manager.component.scss']
})
export class ShopManagerComponent implements OnInit {

  public products: Product[] = [];
  public isListLoading: boolean = true;
  public searchTextValue: string = "";
  public shouldShowError: boolean = false;

  constructor(private ProductProviderService: ProductProviderService, 
              private FilterCreatorService: FilterCreatorService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  public searchText(): any {
    this.FilterCreatorService.applySearchTextFilter(this.searchTextValue);
  }

  private async getProductList(): Promise<void> {
    try {
      this.products = await this.ProductProviderService.getProducts();
    } catch (error) {
      this.shouldShowError = true;
    }
    this.isListLoading = false;
  }
}
