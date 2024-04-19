import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { SlugNameDtoPostComponent } from '../../slug-name-dto/slug-name-dto-post/slug-name-dto-post.component';
import { SlugNameDtoEditDeleteComponent } from '../../slug-name-dto/slug-name-dto-edit-delete/slug-name-dto-edit-delete.component';

@Component({
  selector: 'app-manage-collections',
  standalone: true,
  imports: [
    SlugNameDtoPostComponent,
    SlugNameDtoEditDeleteComponent
  ],
  template: ` <h3>Gestion des Collections</h3>
              <app-slug-name-dto-post
                [type]="'Collection'"
                (newItemName)="postCollection($event)" />
              <app-slug-name-dto-edit-delete
                [items]="collections"
                [type]="'Collections'"

                (itemEdited)="putCollection($event)"
                (itemToDelete)="deleteCollection($event)">
              </app-slug-name-dto-edit-delete>
            `,
  styles: [`
            @import "../../../scss/admin-general.scss";
          `]
})
export class ManageCollectionsComponent {

  @Input()  collections! : CollectionDto[]
  
  @Output() collectionNamePost: EventEmitter<CollectionDto['name']> = new EventEmitter();
  @Output() collectionPut: EventEmitter<CollectionDto> = new EventEmitter();
  @Output() collectionDelete: EventEmitter<CollectionDto> = new EventEmitter();

  postCollection = (collectionName: CollectionDto['name']) => this.collectionNamePost.emit(collectionName);
  putCollection = (collectionToEdit: CollectionDto) => this.collectionPut.emit(collectionToEdit);
  deleteCollection = (collection: CollectionDto) => this.collectionDelete.emit(collection);

}
