import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ApiCategoryAdminService } from '../../services/api-category-admin.service';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { ApiCollectionAdminService } from '../../services/api-collection-admin.service';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';

@Component({
  selector: 'app-manage-categories-collections',
  template: ` <app-return-admin-home/>
              <h2>Gestion des Catégories et des Collections</h2>
              <div class="flex space-between">
                <app-manage-categories [categories]="categories"
                
                                      (categoryNamePost)="postCategory($event)"
                                      (categoryPut)="putCategory($event)"
                                      (categoryDelete)="modalConfirmation($event, 'catégorie')">
                </app-manage-categories>
                <app-manage-collections [collections]="collections"
                
                                        (collectionNamePost)="postCollection($event)"
                                        (collectionPut)="putCollection($event)"
                                        (collectionDelete)="modalConfirmation($event, 'collection')">
                </app-manage-collections>
              </div>
              <anguille [message]="messageResponseFromBackend"/>
              <app-modal [modalVisible]="modalVisible"
                         [modalText]="modalText"
                         [multipleChoice]="true"
                        
                         (responseForModal)="responseForModal($event)">
              </app-modal>`,
    styles: [`div {
                flex-direction: column;
                width: 100%;
              }
            // Breackpoint list
            // Mobiles vers Tablettes :
            @media screen and (min-width: 768px) {
              div {
                flex-direction: row;
              }
            }`]
})
export class ManageCategoriesCollectionsComponent extends BaseComponent {

  private apiCategoryAdminService = inject(ApiCategoryAdminService);
  private apiCollectionAdminService = inject(ApiCollectionAdminService);
  private apiRequestsService = inject(ApiRequestsService);

  categories! : CategoryDto[];
  collections! : CollectionDto[];
  itemToDelete! : CategoryDto | CollectionDto;
  notebookImpacted: NotebookDto[] | null = null;
  itemType! : 'catégorie' | 'collection'

  modalVisible : boolean = false;
  modalText! : string;

  constructor(){
    super()
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCollections();
  }

  getAllCategories(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllCategories().subscribe({
        next: (categories) => this.categories = categories,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllCollections(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllCollections().subscribe({
        next: (collections) => this.collections = collections,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  modalConfirmation(itemToDelete : CategoryDto | CollectionDto, itemType : 'catégorie' | 'collection'): void{
    this.itemToDelete = itemToDelete;
    this.itemType = itemType
    if(itemType === 'catégorie'){
      this.getNotebooksByCategorySlug(itemToDelete.slug);
    }else if(itemType === 'collection'){
      this.getNotebooksByCollectionSlug(itemToDelete.slug);
    }
  }

  responseForModal(response : boolean): void{
    this.modalVisible = false;
    if(response){
      if(this.itemType === 'catégorie'){
        this.notebookImpacted = null;
        this.deleteCategory(this.itemToDelete.slug);
      }else if(this.itemType === 'collection'){
        this.deleteCollection(this.itemToDelete.slug);
      }
    }
  }

  getNotebooksByCategorySlug(categorySlug : CategoryDto['slug']): void{
    this.subscriptions.push(
      this.apiRequestsService.getNotebooksByCategorySlug(categorySlug).subscribe({
        next: (notebooks) => {
          this.notebookImpacted = notebooks;
          this.modalText = 'Confirmer vouloir supprimer la Catégorie : ' + this.itemToDelete.name
            + (this.notebookImpacted.length > 0 ? '. Il y a ' +  this.notebookImpacted.length + ' carnet(s) impacté(s)' : '')
          this.modalVisible = true;
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getNotebooksByCollectionSlug(collectionSlug : CollectionDto['slug']): void{
    this.subscriptions.push(
      this.apiRequestsService.getNotebooksByCollectionSlug(collectionSlug).subscribe({
        next: (notebooks) => {
          this.notebookImpacted = notebooks;
          this.modalText = 'Confirmer vouloir supprimer la Collection : ' + this.itemToDelete.name
            + (this.notebookImpacted.length > 0 ? '. Il y a ' +  this.notebookImpacted.length + ' carnet(s) impacté(s)' : '')
          this.modalVisible = true;
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  postCategory(newCategoryName : CategoryDto['name']): void{
    this.subscriptions.push(
      this.apiCategoryAdminService.post(newCategoryName).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllCategories();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  putCategory(categoryToEdit : CategoryDto): void{
    this.subscriptions.push(
      this.apiCategoryAdminService.put(categoryToEdit).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllCategories();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  deleteCategory(categorySlug : CategoryDto['slug']): void{
    this.subscriptions.push(
      this.apiCategoryAdminService.delete(categorySlug).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.categories = this.categories.filter(category => category.slug !== categorySlug);
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  postCollection(newCollectionName : CollectionDto['name']): void{
    this.subscriptions.push(
      this.apiCollectionAdminService.post(newCollectionName).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllCollections();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  putCollection(collectionToEdit : CollectionDto): void{
    this.subscriptions.push(
      this.apiCollectionAdminService.put(collectionToEdit).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllCollections();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  deleteCollection(collectionSlug : CollectionDto['slug']): void{
    this.subscriptions.push(
      this.apiCategoryAdminService.delete(collectionSlug).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.collections = this.collections.filter(collection => collection.slug !== collectionSlug);
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
