import { Injectable } from '@angular/core';
import { ILocalStorageProducrInfo } from '../types/ILocalStorageProducrInfo';

const localStorageKey = "PRODUCTS";
@Injectable({
  providedIn: 'root'
})
export class LocaStorageAccessService {

  constructor() { }

  public save(product: ILocalStorageProducrInfo): void {
      const savedList: ILocalStorageProducrInfo[] = this.getList();
      const newList: ILocalStorageProducrInfo[] = savedList.filter(item => item.id !== product.id);
      newList.push(product);
      this.saveList(newList);
  }

  public remove(product: ILocalStorageProducrInfo): void {
    const savedList: ILocalStorageProducrInfo[] = this.getList();
    const newList: ILocalStorageProducrInfo[] = savedList.filter(item => item.id !== product.id);
    this.saveList(newList);
  }

  public getList(): ILocalStorageProducrInfo[] {
    const list = localStorage.getItem(localStorageKey);
    return list ? JSON.parse(list) : [];
  }

  private saveList(list: ILocalStorageProducrInfo[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  }
}