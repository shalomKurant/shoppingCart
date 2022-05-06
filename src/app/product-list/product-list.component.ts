import { Component, Input, OnInit} from '@angular/core';
import { IProduct } from '../types/Product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products!: IProduct[];

  constructor() { }

  ngOnInit(): void { }
}
