import { Component } from '@angular/core';
import { ReturnAdminHomeComponent } from '../../return-admin-home/return-admin-home.component';
import { AnguilleComponent } from 'src/app/components/anguille/anguille.component';
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
              <app-slug-name-dto-post [type]="'Catégorie'"/>
              <app-slug-name-dto-edit-delete [type]="'Catégories'"/>

              `,
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class ManageCategoriesComponent {
}
