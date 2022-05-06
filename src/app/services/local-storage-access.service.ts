import { Injectable } from '@angular/core';
import { IProduct } from '../types/Product';

const localStorageKey = "PRODUCTS";

@Injectable({
  providedIn: 'root'
})
export class LocaStorageAccessService {

  constructor() { }

  public save(product: IProduct): void {
      const savedList: IProduct[] = this.getList();
      const newList: IProduct[] = savedList.filter(item => item.id !== product.id);
      newList.push(product);
      this.saveList(newList);
  }

  public remove(product: IProduct): void {
    const savedList: IProduct[] = this.getList();
    const newList: IProduct[] = savedList.filter(item => item.id !== product.id);
    this.saveList(newList);
  }

  public getList(): IProduct[] {
    const list = localStorage.getItem(localStorageKey);
    return list ? JSON.parse(list) : [];
  }

  private saveList(list: IProduct[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  }
}