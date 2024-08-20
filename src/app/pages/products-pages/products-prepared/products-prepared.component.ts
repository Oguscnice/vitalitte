import {Component, inject, OnInit, Signal} from '@angular/core';
import {CategoryDto} from "../../../shared/interfaces/Category";
import {CollectionDto} from "../../../shared/interfaces/Collection";
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";
import {ActivatedRoute} from "@angular/router";
import {ProductDto} from "../../../shared/interfaces/Product";
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'app-products-prepared',
  templateUrl: './products-prepared.component.html',
  styleUrls: ['./products-prepared.component.scss']
})
export class ProductsPreparedComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private paginationSignal = inject(PaginationSignalService);
  private route = inject(ActivatedRoute);

  backgroundImageParentProducts = "../../../assets/images/figma/carnet03.jpg"

  productType$ = this.paginationSignal.$productType;
  productsDto$: Signal<ProductDto[]> = this.dataSignal.$productsDto;
  categoriesDto$: Signal<CategoryDto[]> = this.dataSignal.$categories;
  collectionsDto$: Signal<CollectionDto[]> = this.dataSignal.$collections;
  categorySelected: CategoryDto | null = null;
  collectionSelected: CollectionDto | null = null;
  isCategoryDropdownOpen: boolean = false;
  isCollectionDropdownOpen: boolean  = false;

  ngOnInit(): void {
    this.findProductTypeUrl();
    this.dataSignal.getAllProductsByCategoryAndCollection();
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
  }

  private findProductTypeUrl(): void {
    this.route.params.subscribe((params) => {
      this.paginationSignal.setProductType(params['productType']);
      this.subscribeToVerificationProductType();
    });
  }

  private subscribeToVerificationProductType(): void {
    this.subscriptions.push(
      this.dataSignal.checkIfProductTypeExists(this.productType$()).subscribe(() => this.dataSignal.getAllProductsByCategoryAndCollection())
    )
  }

  toggleDropdown(dropdownClicked : 'Collection' | 'Category'): void {
    const actualValue = this[`is${dropdownClicked}DropdownOpen`];
    this.isCategoryDropdownOpen = false;
    this.isCollectionDropdownOpen = false;
    this[`is${dropdownClicked}DropdownOpen`] = !actualValue;
  }

  onCategorySelected(category: CategoryDto | null): void {
    this.categorySelected = this.categorySelected === category ? null : category;
    this.refreshProducts(category, "categoryDto");
  }

  onCollectionSelected(collection: CollectionDto | null): void {
    this.collectionSelected = this.collectionSelected === collection ? null : collection;
    this.refreshProducts(collection, "collectionDto");
  }

  refreshProducts(catOrColl: CategoryDto | CollectionDto | null, key: "categoryDto" | "collectionDto"): void {
    this.paginationSignal.setCategoryDtoAndCollectionDto(catOrColl, key);
    this.dataSignal.getAllProductsByCategoryAndCollection();
  }

  isCategoryOrCollectionPresent(object: CategoryDto | CollectionDto): boolean {
    let productFiltered = this.productsDto$();
    if (this.categorySelected && this.collectionSelected) {
      productFiltered = this.productsDto$().filter(product => (product.categoryDto.slug === this.categorySelected!.slug) && (product.collectionDto.slug === this.collectionSelected!.slug));
    } else if (this.categorySelected) {
      productFiltered = this.productsDto$().filter(product => product.categoryDto.slug === this.categorySelected!.slug);
    } else if (this.collectionSelected) {
      productFiltered = this.productsDto$().filter(product => product.collectionDto.slug === this.collectionSelected!.slug);
    }
    return productFiltered.some(product => product.categoryDto.slug === object.slug || product.collectionDto.slug === object.slug);
  }
}
