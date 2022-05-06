import { Input, Component, OnInit  } from '@angular/core';
import { FilterCreatorService } from '../services/filter-creator.service';
import { IProduct } from '../types/Product';
import { IFieldFilter } from "../types/IFieldFilter";

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() products!: IProduct[];
  public filterOptions?: IFieldFilter[];

  constructor(private FilterCreatorService: FilterCreatorService) { }

  ngOnInit(): void {
    this.filterOptions = this.FilterCreatorService.getFilterOptions();
  }
}