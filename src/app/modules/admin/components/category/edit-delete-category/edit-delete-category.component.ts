import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CategoryEditable } from '../../../interfaces/EditableObject';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-edit-delete-category',
  templateUrl: './edit-delete-category.component.html',
  styles: [`
            @import "../../../scss/admin-general.scss";
          `]
})
export class EditDeleteCategoryComponent {

  @Input() categories! : CategoryDto[];
  @Input() categoriesEditable! : CategoryEditable[];
  @Output() categoryToEdit: EventEmitter<CategoryDto> = new EventEmitter();
  @Output() categorySlugToDelete: EventEmitter<CategoryDto['slug']> = new EventEmitter();

  isTableVisible: boolean = false;

  categorySlugSelected! : CategoryDto['slug']

  modalVisible : boolean = false;
  modalText! : string;

  canEdit(category: CategoryEditable): void {
    category.canEdit = true;
  }

  cancelEditing(categoryEditing: CategoryEditable): void {
    categoryEditing.canEdit = false;
    for(let category of this.categories){
      if(category.slug === categoryEditing.slug){
        categoryEditing.name = category.name
      }
    }
  }

  changeInputValue(event: KeyboardEvent, category: CategoryEditable): void {
    const inputElement = event.target as HTMLInputElement;
    category.name = inputElement.value;
  }

  edit(categoryToEdit : CategoryEditable): void{
    let categoryEdited: CategoryDto = {
      ...categoryToEdit
    }
    this.categoryToEdit.emit(categoryEdited);
  }

  delete(categorySlug : CategoryDto['slug']): void {
    this.categorySlugSelected = categorySlug;
    this.modalText = `Confirmer vouloir supprimer la catégorie : "${categorySlug}"`
    this.modalVisible = true;
  }

  responseForModal(response : boolean): void{
    this.modalVisible = false;
    if(response){
      this.categorySlugToDelete.emit(this.categorySlugSelected)
    }
  }
}
