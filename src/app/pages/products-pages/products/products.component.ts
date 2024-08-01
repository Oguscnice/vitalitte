import {Component, inject, OnInit} from '@angular/core';
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {ActivatedRoute} from "@angular/router";
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";

@Component({
  standalone: false,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private paginationSignal = inject(PaginationSignalService);
  private route = inject(ActivatedRoute);

  backgroundImageParentCreations = '../../../assets/images/figma/carnet02.jpg';
  products$ = this.dataSignal.$productsDto;
  productType$ = this.paginationSignal.$productType;

  ngOnInit(): void {
    this.findProductTypeUrl();
  }

  private findProductTypeUrl(): void {
    this.route.params.subscribe((params) => {
      this.paginationSignal.setProductType(params['productType']);
      this.dataSignal.get3RandomProducts();
    });
  }
}
