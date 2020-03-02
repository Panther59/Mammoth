import { Component, OnInit } from '@angular/core';
import { StoreSale } from 'src/app/_models/storeSale';

@Component({
  selector: 'app-store-sale',
  templateUrl: './store-sale.component.html',
  styleUrls: ['./store-sale.component.scss']
})
export class StoreSaleComponent implements OnInit {

  model = new StoreSale();
  constructor() { }

  ngOnInit(): void {
  }

  save() {

  }
}
