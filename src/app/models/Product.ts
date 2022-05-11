import { FilterType } from "../types/FilterType";
import { IFieldFilter } from "../types/IFieldFilter";
import { Operator } from "../types/Operator";
import { IFilter } from "../types/IFilter";

export class Product {
  private valueTypeFilterFunction: Map<FilterType, (value: number | string, checkValue: number | string) => boolean>;
  
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
              public amount: number = 0) {
    this.initializeTypeFilterFunction();
  }

  public matchesFilter(filters: Map<string, IFieldFilter>): boolean {
    for (const fieldFilters of Array.from(filters.values())) {
        const fieldValue = this.getFieldValue(fieldFilters.field, this);
        const valueNatchesFilter = !this.valueMatchesFilterValues(fieldFilters, fieldValue); 
        if (valueNatchesFilter) {
          return false;
        }
    }
    return true;
  }

  private valueMatchesFilterValues(fieldFilter: IFieldFilter, productValue: number | string): boolean {
    if (!fieldFilter.filters.length) return true;

    if (fieldFilter.operator === Operator.OR) {
      return fieldFilter.filters.some(filter => this.valueTypeFilterFunction.get(filter.type)(productValue, filter.value));
    }
    return fieldFilter.filters.every(filter => this.valueTypeFilterFunction.get(filter.type)(productValue, filter.value));
  }

  private getFieldValue(fieldName: string, productObject: Product): any {
    for (const propertyName in productObject) {
        if (propertyName === fieldName) {
            return (<any> productObject)[propertyName];
        }
        if ((<any> productObject)[propertyName] instanceof Object) {
            return this.getFieldValue(fieldName, (<any> productObject)[propertyName]);
        } 
    }
  }

  private initializeTypeFilterFunction(): void {
    this.valueTypeFilterFunction = new Map<FilterType, (checkValue: number | string, value: number | string) => boolean>([
      [FilterType.EQUAL, (checkValue, value) => value === checkValue],
      [FilterType.GREATER_THAN, (checkValue, value) => value > checkValue],
      [FilterType.LESS_THAN, (checkValue, value) => value < checkValue],
      [FilterType.FREE_TEXT, (checkValue, value) => checkValue.toString().toUpperCase().includes(value.toString().toUpperCase())],
    ]);
  }
}