import { Component, OnInit } from '@angular/core';
import { FilterCreatorService } from '../services/filter-creator.service';
import { ProductProviderService } from '../services/product-provider.service';
import { IProduct } from '../types/Product';

@Component({
  selector: 'shop-manager',
  templateUrl: './shop-manager.component.html',
  styleUrls: ['./shop-manager.component.scss']
})
export class ShopManagerComponent implements OnInit {

  public products: IProduct[] = [];
  public isListLoading: boolean = true;
  public searchTextValue: string = "";
  public sholdShowError: boolean = false;

  constructor(private ProductProviderService: ProductProviderService, 
              private FilterCreatorService: FilterCreatorService) { }

  ngOnInit(): void {
    this.sholdShowError = false;
    this.getProductList();
  }

  public searchText(): any {
    this.FilterCreatorService.applySearchTextFilter(this.searchTextValue);
  }

  private async getProductList(): Promise<void> {
    try {
      this.products = await this.ProductProviderService.getProduct();
    } catch (error) {
      this.sholdShowError = true;
    }
    this.isListLoading = false;
  }
}
