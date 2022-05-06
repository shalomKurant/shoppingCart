import { FilterType } from "./FilterType";


export interface IFilter {
  value: number | string;
  type: FilterType;
  label: string;
  isSelected?: boolean;
}
