import { Injectable } from '@angular/core';
import { IFieldFilter } from "../types/IFieldFilter";
import { Operator } from "../types/Operator";
import { IFilter } from "../types/IFilter";
import { FilterType } from "../types/FilterType";

const freeSearchField = "title";

@Injectable({
  providedIn: 'root'
})
export class FilterCreatorService {
  public filterOptions: IFieldFilter[] = [];
  public activeFilters: Map<string, IFieldFilter> = new Map();

  constructor() {
    this.filterOptions = this.getFilterOptions();
    this.initActiveFiltersObject();
  }

  public applayFilter(fieldName: string, filter: IFilter): void {
    const currentFieldFilter: IFilter[] = this.activeFilters.get(fieldName)!.filters;
    if (filter.isSelected) {
      this.activeFilters.get(fieldName).filters.push(filter);
    } else {
      this.removeActiveFilter(currentFieldFilter, filter);
    }
  }

  public applySearchTextFilter(searchTextValue: string): void {
    const filter: IFilter = {
      label: FilterType.FREE_TEXT,
      type: FilterType.FREE_TEXT,
      value: searchTextValue,
      isSelected: searchTextValue.length ? true : false
    }
    this.removeActiveFilter(this.activeFilters.get(freeSearchField).filters, filter);
    this.applayFilter(freeSearchField, filter);
  }

  private removeActiveFilter(fieldFilters: IFilter[], filterToRemove: IFilter): void {
    const indexFilterToRemove = fieldFilters.findIndex(f => f.label === filterToRemove.label);
    fieldFilters.splice(indexFilterToRemove, 1);
  }

  private initActiveFiltersObject(): void {
    this.filterOptions.forEach(option => {
      this.activeFilters.set(option.field, {
        field: option.field,
        filters: [],
        operator: option.operator
      });
    });
    this.activeFilters.set(freeSearchField, {
      field: freeSearchField,
      operator: Operator.AND,
      filters: [
        {
          type: FilterType.FREE_TEXT,
          label: "",
          value: ""
        }
    ]})
  }

  public getFilterOptions(): IFieldFilter[] {
    return [
      {
        field: "price",
        operator: Operator.AND,
        filters: [
          {
            type: FilterType.GREATER_THAN,
            value: 100,
            label: "> 100"
          },
          {
            type: FilterType.LESS_THAN,
            value: 200,
            label: "< 200"
          }
        ]
      },
      {
        field: "rate",
        displayName: "rating",
        operator: Operator.OR,
        filters: [
          {
            type: FilterType.EQUAL,
            value: 1,
            label: "1"
          },
          {
            type: FilterType.EQUAL,
            value: 3,
            label: "3"
          },
          {
            type: FilterType.EQUAL,
            value: 5,
            label: "5"
          }
        ]
      } 
    ]
  }
}
