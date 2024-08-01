import {DecimalPipe, NgClass, TitleCasePipe} from '@angular/common';
import {Component, inject, Signal, OnInit} from '@angular/core';
import { ProductDto } from '../../shared/interfaces/Product';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {RouterLink} from "@angular/router";
import {CategoryDto} from "../../shared/interfaces/Category";
import {CollectionDto} from "../../shared/interfaces/Collection";
import {ReactiveFormsModule} from "@angular/forms";
import {CartItemQuantityManagerComponent} from "../cart-item-quantity-manager/cart-item-quantity-manager.component";

@Component({
  standalone: true,
  imports: [TitleCasePipe, DecimalPipe, NgClass, RouterLink, ReactiveFormsModule, CartItemQuantityManagerComponent],
  selector: 'app-shopping-products-list',
  templateUrl: './shopping-products-list.component.html',
  styleUrls: ['./shopping-products-list.component.scss']
})
export class ShoppingProductsListComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  shoppingCartService = inject(ShoppingCartService);
  quantityIncreased: boolean = false;
  quantityDecreased: boolean = false;
  cartToAnimate: string = "";

  productsDto$: Signal<ProductDto[]> = this.dataSignal.$productsDto;
  categoriesDto$: Signal<CategoryDto[]> = this.dataSignal.$categories;
  collectionsDto$: Signal<CollectionDto[]> = this.dataSignal.$collections;
  categorySelected: CategoryDto | null = null;
  collectionSelected: CollectionDto | null = null;
  isCategoryDropdownOpen: boolean = false;
  isCollectionDropdownOpen: boolean  = false;
  isMaterialsDropdownOpen: boolean  = false;

  ngOnInit(): void {
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
    this.dataSignal.getAllProductsByCategoryAndCollection()
  }

  onCategorySelected(category: CategoryDto | null): void {
    this.categorySelected = this.categorySelected === category ? null : category;
  }

  onCollectionSelected(collection: CollectionDto | null): void {
    this.collectionSelected = this.collectionSelected === collection ? null : collection;
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

  toggleDropdown(dropdownClicked : 'Collection' | 'Category' | 'Materials'): void {
    const actualValue = this[`is${dropdownClicked}DropdownOpen`];
    this.isCategoryDropdownOpen = false;
    this.isCollectionDropdownOpen = false;
    this.isMaterialsDropdownOpen = false;
    this[`is${dropdownClicked}DropdownOpen`] = !actualValue;
  }
}
