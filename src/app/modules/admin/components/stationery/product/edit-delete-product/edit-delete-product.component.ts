import { AdminProductSignalService } from '../../../../shared/services/admin-product-signal.service';
import { NgClass } from '@angular/common';
import {Component, OnInit, inject, Signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProductDto } from '../../../../../../shared/interfaces/Product';
import { DataSignalService } from '../../../../../../shared/services/data-signal.service';
import {PaginationSignalService} from "../../../../../../shared/services/pagination-signal.service";

@Component({
  imports: [ NgClass, RouterLink ],
  selector: 'app-edit-delete-product',
  templateUrl: './edit-delete-product.component.html',
  styles: [`
    @use "../../../../scss/admin-general.scss";
    @use "../../../../scss/admin-toggle.scss";
    @use "../../../../scss/admin-table.scss";
    @use "../../../../../../scss/table.scss";
  `]
})
export class EditDeleteProductComponent implements OnInit {

  private adminProductSignal = inject(AdminProductSignalService);
  private dataSignalService = inject(DataSignalService);
  private paginationSignal = inject(PaginationSignalService);
  private route = inject(ActivatedRoute);

  productsDto$ = this.dataSignalService.$productsDto;
  productType!: ProductDto['productType'];

  isTableVisible: boolean = true;

  ngOnInit(): void {
    this.findProductTypeUrl();
  }

  private findProductTypeUrl(): void {
    this.route.params.subscribe((params) => {
      this.productType = params['productType'];
      this.paginationSignal.setProductType(this.productType);
      this.dataSignalService.getAllProductsByCategoryAndCollection();
    });
  }

  changeAvailability = (productDto : ProductDto) => this.adminProductSignal.changeAvailability(productDto);
  onDeleteClick = (productDto: ProductDto) => this.adminProductSignal.confirmationModalForDelete(productDto);
}
