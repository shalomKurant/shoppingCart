import { Injectable } from '@angular/core';
import { IProduct, Product } from '../types/Product';
import { LocaStorageAccessService } from './local-storage-access.service';

const productsApi = "https://fakestoreapi.com/products";

@Injectable({
  providedIn: 'root'
})
export class ProductProviderService {

  constructor(private LocaStorageAccessService: LocaStorageAccessService) { }

  public async getProduct(): Promise<IProduct[]> {
    const response: Response = await fetch(productsApi);
    const jsonResponse: IProduct[] = await response.json();
    return this.createObjectList(jsonResponse);
  }

  private createObjectList(productsResponse: IProduct[]): IProduct[] {
    const userList: IProduct[] = this.LocaStorageAccessService.getList();
    return productsResponse.map((product: IProduct) => {
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