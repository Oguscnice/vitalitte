import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { ReturnAdminHomeComponent } from '../../return-admin-home/return-admin-home.component';
import { AnguilleComponent } from 'src/app/shared/components/anguille/anguille.component';
import { SlugNameDtoPostComponent } from '../../slug-name-dto/slug-name-dto-post/slug-name-dto-post.component';
import { SlugNameDtoEditDeleteComponent } from '../../slug-name-dto/slug-name-dto-edit-delete/slug-name-dto-edit-delete.component';

@Component({
  standalone : true,
  imports: [
    ReturnAdminHomeComponent,
    SlugNameDtoPostComponent,
    SlugNameDtoEditDeleteComponent,
    SlugNameDtoEditDeleteComponent,
    AnguilleComponent
  ],
  selector: 'app-manage-categories',
  template: ` <h3>Gestion des Catégories</h3>
  
              <app-slug-name-dto-post
                [type]="'Catégorie'"
                (newItemName)="postCategory($event)" />
              <app-slug-name-dto-edit-delete
                [items]="categories"
                [type]="'Catégories'"

                (itemEdited)="putCategory($event)"
                (itemToDelete)="deleteCategory($event)">
              </app-slug-name-dto-edit-delete>
              `,
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class ManageCategoriesComponent {

  @Input()  categories! : CategoryDto[]
  
  @Output() categoryNamePost: EventEmitter<CategoryDto['name']> = new EventEmitter();
  @Output() categoryPut: EventEmitter<CategoryDto> = new EventEmitter();
  @Output() categoryDelete: EventEmitter<CategoryDto> = new EventEmitter();

  postCategory = (categoryName: CategoryDto['name']) => this.categoryNamePost.emit(categoryName);
  putCategory = (categoryToEdit: CategoryDto) => this.categoryPut.emit(categoryToEdit);
  deleteCategory = (category: CategoryDto) => this.categoryDelete.emit(category);
}
