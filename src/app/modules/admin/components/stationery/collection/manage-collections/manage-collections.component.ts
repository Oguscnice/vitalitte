import { Component } from '@angular/core';
import { SlugNameDtoPostComponent } from '../../../slug-name-dto/slug-name-dto-post/slug-name-dto-post.component';
import { SlugNameDtoEditDeleteComponent } from '../../../slug-name-dto/slug-name-dto-edit-delete/slug-name-dto-edit-delete.component';

@Component({
  selector: 'app-manage-collections',
  standalone: true,
  imports: [
    SlugNameDtoPostComponent,
    SlugNameDtoEditDeleteComponent
  ],
  template: ` <h3>Gestion des Collections</h3>
              <app-slug-name-dto-post [type]="'Collection'"/>
              <app-slug-name-dto-edit-delete [type]="'Collections'">
            `,
  styles: [`@import "../../../../scss/admin-general";`]
})
export class ManageCollectionsComponent {
}
