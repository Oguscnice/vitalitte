import {DecimalPipe, NgClass, TitleCasePipe} from '@angular/common';
import {Component, inject, Signal, OnInit} from '@angular/core';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {RouterLink} from "@angular/router";
import {CategoryDto} from "../../shared/interfaces/Category";
import {CollectionDto} from "../../shared/interfaces/Collection";
import {ReactiveFormsModule} from "@angular/forms";
import {FilterNotebooksPipe} from "../../shared/services/pipes/filter-notebooks.pipe";

@Component({
  standalone: true,
  imports: [TitleCasePipe, DecimalPipe, NgClass, RouterLink, ReactiveFormsModule, FilterNotebooksPipe],
  selector: 'app-shopping-notebooks-list',
  templateUrl: './shopping-notebooks-list.component.html',
  styleUrls: ['./shopping-notebooks-list.component.scss']
})
export class ShoppingNotebooksListComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  shoppingCart = inject(ShoppingCartService);
  quantityIncreased: boolean = false;
  quantityDecreased: boolean = false;
  cartToAnimate: string = "";

  notebooks: Signal<NotebookDto[]> = this.dataSignal.$notebooks;
  categories: Signal<CategoryDto[]> = this.dataSignal.$categories;
  collections: Signal<CollectionDto[]> = this.dataSignal.$collections;
  categorySelected: CategoryDto | null = null;
  collectionSelected: CollectionDto | null = null;
  isCategoryDropdownOpen: boolean = false;
  isCollectionDropdownOpen: boolean  = false;
  isMaterialsDropdownOpen: boolean  = false;

  ngOnInit(): void {
    this.dataSignal.getAllNotebooks();
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
  }

  onCategorySelected(category: CategoryDto | null): void {
    this.categorySelected = this.categorySelected === category ? null : category;
  }

  onCollectionSelected(collection: CollectionDto | null): void {
    this.collectionSelected = this.collectionSelected === collection ? null : collection;
  }

  isCategoryOrCollectionPresent(object: CategoryDto | CollectionDto): boolean {
    let notebookFiltered = this.notebooks();
    if (this.categorySelected && this.collectionSelected) {
      notebookFiltered = this.notebooks().filter(notebook => (notebook.categoryDto.slug === this.categorySelected!.slug) && (notebook.collectionDto.slug === this.collectionSelected!.slug));
    } else if (this.categorySelected) {
      notebookFiltered = this.notebooks().filter(notebook => notebook.categoryDto.slug === this.categorySelected!.slug);
    } else if (this.collectionSelected) {
      notebookFiltered = this.notebooks().filter(notebook => notebook.collectionDto.slug === this.collectionSelected!.slug);
    }
    return notebookFiltered.some(notebook => notebook.categoryDto.slug === object.slug || notebook.collectionDto.slug === object.slug);
  }

  toggleDropdown(dropdownClicked : 'Collection' | 'Category' | 'Materials'): void {
    const actualValue = this[`is${dropdownClicked}DropdownOpen`];
    this.isCategoryDropdownOpen = false;
    this.isCollectionDropdownOpen = false;
    this.isMaterialsDropdownOpen = false;
    this[`is${dropdownClicked}DropdownOpen`] = !actualValue;
  }

  increase(notebook: NotebookDto): void {
    this.quantityIncreased = true;
    this.quantityDecreased = false;
    this.cartToAnimate = notebook.slug;
    this.shoppingCart.addItem(notebook, 'notebooks');
    setTimeout(() => {
      this.quantityIncreased = false;
    }, 200);
  }

  decrease(notebook: NotebookDto): void {
    this.quantityIncreased = false;
    this.quantityDecreased = true;
    this.cartToAnimate = notebook.slug;
    this.shoppingCart.subtractItem(notebook, 'notebooks')
    setTimeout(() => {
      this.quantityDecreased = false;
    }, 200);
  }
}
