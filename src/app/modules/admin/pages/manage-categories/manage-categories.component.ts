import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ApiCategoryAdminService } from '../../services/api-category-admin.service';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { CategoryDto } from 'src/app/shared/interfaces/Category';

@Component({
  selector: 'app-manage-categories',
  template: ` <app-return-admin-home/>
              <app-post-category (newCategoryName)="postCategory($event)"></app-post-category>
              <app-edit-delete-category
                [categories]="categories"

                (categoryEdited)="putCategory($event)"
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
  ){
    super()
  }

  categories! : CategoryDto[];

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  getAllCategories(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllCategories().subscribe({
        next: (categories) => this.categories = categories,
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
}
