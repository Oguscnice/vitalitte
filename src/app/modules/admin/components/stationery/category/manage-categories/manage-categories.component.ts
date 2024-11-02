import { Component } from '@angular/core';
import { ReturnAdminHomeComponent } from '../../../return-admin-home/return-admin-home.component';
import { AnguilleComponent } from '../../../../../../components/anguille/anguille.component';
import { SlugNameDtoPostComponent } from '../../../slug-name-dto/slug-name-dto-post/slug-name-dto-post.component';
import { SlugNameDtoEditDeleteComponent } from '../../../slug-name-dto/slug-name-dto-edit-delete/slug-name-dto-edit-delete.component';
import {PostCategoryComponent} from "../../../category/post-category/post-category.component";
import {EditDeleteCategoryComponent} from "../../../category/edit-delete-category/edit-delete-category.component";

@Component({
  standalone : true,
  imports: [
    ReturnAdminHomeComponent,
    SlugNameDtoPostComponent,
    SlugNameDtoEditDeleteComponent,
    SlugNameDtoEditDeleteComponent,
    AnguilleComponent,
    PostCategoryComponent,
    EditDeleteCategoryComponent
  ],
  selector: 'app-manage-categories',
  template: `
    <h3>Gestion des Catégories</h3>
    <app-post-category/>
    <app-edit-delete-category/>
`,
  styles: [` @import "../../../../scss/admin-general"; `]
})
export class ManageCategoriesComponent {
}
