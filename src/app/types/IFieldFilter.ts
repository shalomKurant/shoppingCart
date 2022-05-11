import { IFilter } from "./IFilter";
import { Operator } from "./Operator";

export interface IFieldFilter {
  field: string;
  filters: IFilter[];
  operator: Operator;
  displayName?: string;
}