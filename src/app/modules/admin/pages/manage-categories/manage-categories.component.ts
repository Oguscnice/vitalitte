import { TransformToEditableService } from './../../services/transform-to-editable.service';
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ApiCategoryAdminService } from '../../services/api-category-admin.service';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CategoryEditable } from '../../interfaces/EditableObject';

@Component({
  selector: 'app-manage-categories',
  template: ` <app-return-admin-home/>
              <app-post-category (newCategoryName)="postCategory($event)"></app-post-category>
              <app-edit-delete-category
                [categories]="categories"
                [categoriesEditable]="categoriesEditable"

                (categoryToEdit)="putCategory($event)"
                (categorySlugToDelete)="deleteCategory($event)"
                >
              </app-edit-delete-category>
              <anguille [message]="messageResponseFromBackend"/>
              `,
  styles: [`
            @import "../../scss/admin-general.scss";
          `]
})
export class ManageCategoriesComponent extends BaseComponent {

  constructor(
    private apiCategoryAdminService : ApiCategoryAdminService,
    private apiRequestsService : ApiRequestsService,
    private transformToEditableService : TransformToEditableService
  ){
    super()
  }

  categories! : CategoryDto[];
  categoriesEditable! : CategoryEditable[];

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  getAllCategories(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
          this.categoriesEditable = this.transformToEditableService.categoriesDtoToEditable(categories);
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
          this.categoriesEditable = this.categories;
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
