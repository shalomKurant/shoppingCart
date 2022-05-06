import { IFilter } from "./IFilter";

export interface IFieldFilter {
  field: string;
  filters?: IFilter[];
}
