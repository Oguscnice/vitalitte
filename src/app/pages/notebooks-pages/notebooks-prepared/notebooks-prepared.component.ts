import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import {Component, inject, OnInit, Signal} from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import {CategoryDto} from "../../../shared/interfaces/Category";
import {CollectionDto} from "../../../shared/interfaces/Collection";
import {CategoryAndCollection} from "../../../shared/interfaces/CategoryAndCollection";
import {DataSignalService} from "../../../shared/services/data-signal.service";

@Component({
  selector: 'app-notebooks-prepared',
  templateUrl: './notebooks-prepared.component.html',
  styleUrls: ['./notebooks-prepared.component.scss']
})
export class NotebooksPreparedComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  titleParentNotebooks = "Carnets Artisanaux"
  backgroundImageParentNotebooks = "../../../assets/images/figma/carnet03.jpg"

  notebooks$: Signal<NotebookDto[]> = this.dataSignal.$notebooks;
  categories$: Signal<CategoryDto[]> = this.dataSignal.$categories;
  collections$: Signal<CollectionDto[]> = this.dataSignal.$collections;

  categorySelected: CategoryDto | null = null;
  collectionSelected: CollectionDto | null = null;

  ngOnInit(): void {
    this.dataSignal.getAllNotebooks();
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
  }

  onCategoryClicked(category: CategoryDto | null): void {
    this.categorySelected = category?.name === this.categorySelected?.name ? null : category;
    this.dataSignal.getAllNotebooksByCategoryAndCollection(this.categoryAndCollectionObject());
  }

  onCollectionClicked(collection: CollectionDto | null): void {
    this.collectionSelected = collection?.name === this.collectionSelected?.name ? null : collection;
    this.dataSignal.getAllNotebooksByCategoryAndCollection(this.categoryAndCollectionObject());
  }

  categoryAndCollectionObject(): CategoryAndCollection {
    return {
      category: this.categorySelected,
      collection: this.collectionSelected
    }
  }

}
