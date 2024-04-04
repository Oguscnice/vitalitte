import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/interfaces/Category';

@Component({
  selector: 'app-edit-delete-category',
  templateUrl: './edit-delete-category.component.html',
  styles: [`
            @import "../../../scss/admin-general.scss";
          `]
})
export class EditDeleteCategoryComponent {

  @Input() categories! : CategoryDto[];
  @Output() categoryEdited: EventEmitter<CategoryDto> = new EventEmitter();
  @Output() categorySlugToDelete: EventEmitter<CategoryDto['slug']> = new EventEmitter();

  isTableVisible: boolean = false;

  categorySlugSelected! : CategoryDto['slug']
  categoryToEdit : CategoryDto | null = null;

  modalVisible : boolean = false;
  modalText! : string;

  canEdit = (categorySelected: CategoryDto) => this.categoryToEdit = {...categorySelected}

  changeNameValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.categoryToEdit!.name = inputElement.value;
  }

  edit = () => this.categoryEdited.emit(this.categoryToEdit!);

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
