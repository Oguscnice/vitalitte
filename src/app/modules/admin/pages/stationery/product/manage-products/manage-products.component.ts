import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductDto} from "../../../../../../shared/interfaces/Product";

@Component({
  standalone: false,
  selector: 'app-manage-products',
  template: `
              <app-return-admin-home/>
              <h2> Gestion des {{ productType | enumProductTypeFormat:'plural' | titlecase }} </h2>
              <app-post-product/>
              <app-edit-delete-product/>
            `,
  styles: [``]
})
export class ManageProductsComponent implements OnInit {

  private route = inject(ActivatedRoute);

  productType!: ProductDto['productType'];

  ngOnInit(): void {
    this.findProductTypeUrl();
  }

  private findProductTypeUrl(): void {
    this.route.params.subscribe((params) => this.productType = params['productType']);
  }
}
