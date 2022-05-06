import { Injectable } from '@angular/core';
import { Product } from '../types/Product';
import { LocaStorageAccessService } from './local-storage-access.service';

const productsApi = "https://fakestoreapi.com/products";

@Injectable({
  providedIn: 'root'
})
export class ProductProviderService {

  constructor(private LocaStorageAccessService: LocaStorageAccessService) { }

  public async getProduct(): Promise<Product[]> {
    const response: Response = await fetch(productsApi);
    const jsonResponse: Product[] = await response.json();
    return this.createObjectList(jsonResponse);
  }

  private createObjectList(productsResponse: Product[]): Product[] {
    const userList: Product[] = this.LocaStorageAccessService.getList();
    return productsResponse.map((product: Product) => {
      const userProduct = userList.find(item => item.id === product.id);
      return new Product(
        product.id, 
        product.title, 
        product.price, 
        product.category, 
        product.description, 
        product.image, 
        product.rating, 
        userProduct ? userProduct.amount : product.amount);
    });
  }
}