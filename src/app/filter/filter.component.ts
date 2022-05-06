import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FilterCreatorService } from '../services/filter-creator.service';
import { IFieldFilter } from "../types/IFieldFilter";
import { IFilter } from "../types/IFilter";

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() fieldFilter!: IFieldFilter;

  constructor(private FilterCreatorService: FilterCreatorService) { }

  ngOnInit(): void {}

  onFilterChange(event: MatCheckboxChange, filter: IFilter) {
    filter.isSelected = event.checked;
    this.FilterCreatorService.applayFilter(this.fieldFilter.field, filter);
  }
}
