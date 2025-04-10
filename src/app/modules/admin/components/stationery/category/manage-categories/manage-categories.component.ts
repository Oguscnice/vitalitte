import { Component } from '@angular/core';
import {PostCategoryComponent} from "../../../category/post-category/post-category.component";
import {EditDeleteCategoryComponent} from "../../../category/edit-delete-category/edit-delete-category.component";

@Component({
  standalone : true,
  imports: [
    PostCategoryComponent,
    EditDeleteCategoryComponent
  ],
  selector: 'app-manage-categories',
  template: `
    <h3>Gestion des Catégories</h3>
    <app-post-category/>
    <app-edit-delete-category/>
`,
  styles: [` @use "../../../../scss/admin-general"; `]
})
export class ManageCategoriesComponent {
}
