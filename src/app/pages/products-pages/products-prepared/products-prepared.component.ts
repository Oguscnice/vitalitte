import {Component, inject, OnInit} from '@angular/core';
import {CategoryDto} from "../../../shared/interfaces/Category";
import {CollectionDto} from "../../../shared/interfaces/Collection";
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products-prepared',
  templateUrl: './products-prepared.component.html',
  styleUrls: ['./products-prepared.component.scss']
})
export class ProductsPreparedComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private paginationSignal = inject(PaginationSignalService);
  private route = inject(ActivatedRoute);

  backgroundImageParentProducts = "../../../assets/images/figma/carnet03.jpg"

  productsDto$ = this.dataSignal.$productsDto;
  categories$ = this.dataSignal.$categories;
  collections$ = this.dataSignal.$collections;
  products$ = this.dataSignal.$productsDto;
  productType$ = this.paginationSignal.$productType;

  categorySelected: CategoryDto | null = null;
  collectionSelected: CollectionDto | null = null;

  ngOnInit(): void {
    this.findProductTypeUrl();
    this.dataSignal.getAllProductsByCategoryAndCollection();
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
  }

  private findProductTypeUrl(): void {
    this.route.params.subscribe((params) => {
      this.paginationSignal.setProductType(params['productType']);
      this.dataSignal.getAllProductsByCategoryAndCollection();
    });
  }

  onCategoryClicked(category: CategoryDto): void {
    this.categorySelected = category.name === this.categorySelected?.name ? null : category;
    this.paginationSignal.setCategoryDtoAndCollectionDto(category, 'categoryDto');
    this.dataSignal.getAllProductsByCategoryAndCollection();
  }

  onCollectionClicked(collection: CollectionDto): void {
    this.collectionSelected = collection.name === this.collectionSelected?.name ? null : collection;
    this.paginationSignal.setCategoryDtoAndCollectionDto(this.collectionSelected, 'collectionDto');
    this.dataSignal.getAllProductsByCategoryAndCollection();
  }
}
