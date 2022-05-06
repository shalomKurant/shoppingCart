import { Injectable } from '@angular/core';
import { Product } from '../types/Product';

const localStorageKey = "PRODUCTS";

@Injectable({
  providedIn: 'root'
})
export class LocaStorageAccessService {

  constructor() { }

  public save(product: Product): void {
      const savedList: Product[] = this.getList();
      const newList: Product[] = savedList.filter(item => item.id !== product.id);
      newList.push(product);
      this.saveList(newList);
  }

  public remove(product: Product): void {
    const savedList: Product[] = this.getList();
    const newList: Product[] = savedList.filter(item => item.id !== product.id);
    this.saveList(newList);
  }

  public getList(): Product[] {
    const list = localStorage.getItem(localStorageKey);
    return list ? JSON.parse(list) : [];
  }

  private saveList(list: Product[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  }
}