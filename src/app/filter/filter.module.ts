import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { FiltersComponent } from './filters/filters.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    FiltersComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,
  ],
  exports: [FiltersComponent]
})
export class FilterModule { }
