import {Component, inject, OnInit} from '@angular/core';
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";
import {BaseComponent} from "../../../base.component";
import {CategoryDto} from "../../../shared/interfaces/Category";
import {CollectionDto} from "../../../shared/interfaces/Collection";
import {FileService} from "../../../shared/services/file.service";

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
  private router = inject(Router);
  fileService = inject(FileService);

  backgroundImageParentCreations = '../../../assets/images/figma/carnet02.jpg';
  productsDto$ = this.dataSignal.$productsDto;
  productType$ = this.paginationSignal.$productType;
  categoriesDto$ = this.dataSignal.$categories;
  collectionsDto$ = this.dataSignal.$collections;
  categorySelected: CategoryDto | null = null;
  collectionSelected: CollectionDto | null = null;
  isCollectionDropdownOpen: boolean  = false;

  ngOnInit(): void {
    this.findProductTypeUrl();
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
  }

  private findProductTypeUrl(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.paginationSignal.setProductType(params['productType']);
        this.subscribeToVerificationProductType();
      })
    )
  }

  private subscribeToVerificationProductType(): void {
    this.subscriptions.push(
      this.dataSignal.checkIfProductTypeExists(this.productType$()).subscribe({
        // si le type de produit est reconnu, alors on reste sur la page
        next: () => true,
        // sinon on est redirigé
        error: (err) => this.router.navigate(['/page-404']),
      })
    )
  }

  toggleDropdown(dropdownClicked : 'Collection'): void {
    this[`is${dropdownClicked}DropdownOpen`] = !this[`is${dropdownClicked}DropdownOpen`];
  }

  onCategorySelected(category: CategoryDto | null): void {
    this.categorySelected = this.categorySelected?.slug === category?.slug ? null : category;
    this.refreshProducts(this.categorySelected, 'categoryDto');
    if (this.collectionSelected !== null) {
      this.onCollectionSelected(null);
    }
  }

  isCategorySelected(categoryDto: CategoryDto): boolean {
    return categoryDto.slug === this.categorySelected?.slug;
  }

  onCollectionSelected(collection: CollectionDto | null): void {
    this.collectionSelected = this.collectionSelected?.slug === collection?.slug ? null : collection;
    this.refreshProducts(this.collectionSelected, "collectionDto");
  }

  private refreshProducts(catOrColl: CategoryDto | CollectionDto | null, key: "categoryDto" | "collectionDto"): void {
    this.paginationSignal.setCategoryDtoAndCollectionDto(catOrColl, key);
    this.dataSignal.getAllProductsByCategoryAndCollection();
  }

  isCategoryOrCollectionPresent(object: CategoryDto | CollectionDto): boolean {
    if (!this.productsDto$() || this.productsDto$().length === 0 || (this.categorySelected === null && this.collectionSelected === null)) {
      return true;
    }
    return this.productsDto$().some(product => product.categoryDto.slug === object.slug || product.collectionDto.slug === object.slug);
  }
}
