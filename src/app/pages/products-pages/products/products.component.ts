import {Component, inject, OnInit} from '@angular/core';
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";
import {Menu} from "../../../shared/interfaces/Menu";
import {toTitleCase} from "../../../shared/function/string-to-title-case";
import {NAVBAR_USER} from "../../../shared/variables/navbar";
import {BaseComponent} from "../../../base.component";

@Component({
  standalone: false,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

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
      this.subscribeToVerificationProductType();
    });
  }

  private subscribeToVerificationProductType(): void {
    this.subscriptions.push(
      this.dataSignal.checkIfProductTypeExists(this.productType$()).subscribe(() => this.dataSignal.get3RandomProducts())
    )
  }
}
