import { FilterType } from "./FilterType";
import { IFilter } from "./IFilter";

export class Product implements IProduct {
  constructor(public id: number,
              public title: string,
              public price: number,
              public category: string,
              public description: string,
              public image: string,
              public rating: {
                  rate: number;
                  count: number;
              },
              public amount: number = 0) {}

    public shouldDisplay(filters: any): boolean {
      for (const [fieldName, fieldFilters] of Object.entries(filters)) {
        for (const filter of <IFilter[]> fieldFilters) {
          const fieldValue = this.getFieldValue(fieldName);
          const sholdHideProduct = !this.shouldShowProduct(filter, fieldValue);
          if (sholdHideProduct) {
            return false;
          }
        }
      }
      return true;
    }

  // TODO Find better way 
  private getFieldValue(fieldName: string): number | string {
    if (fieldName === 'rating') {
      return this.rating.rate;
    }
    return (<any> this)[fieldName];
  }

  private shouldShowProduct(filter: IFilter, productValue: number | string): boolean {
    switch (filter.type) {
      case FilterType.EQUAL:
          return filter.value === productValue;
      case FilterType.GREATER_THAN: 
        return productValue > filter.value;
      case FilterType.LESS_THAN: 
        return productValue < filter.value;
      case FilterType.FREE_TEXT: 
        return (<string> productValue).includes(<string> filter.value);
      default:
        console.log("unsupported Filter");
        break;
    }
    return true;
  }
}

export interface IProduct {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    amount: number;

    shouldDisplay(filters: any): boolean;
}