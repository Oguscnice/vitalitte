import { Component, Input } from '@angular/core';
import { Notebook } from 'src/app/shared/interfaces/Notebook';

@Component({
  selector: 'app-notebooks-list',
  template: `<div class="notebooks-list flex column center"
                  *ngFor="let notebook of notebooksListChild">
                <h5>{{notebook.title | titlecase}}</h5>
                <div class="image-and-filter-color flex column pointer"
                    [routerLink]="'/carnets/' + notebook.slug">
                  <img
                  src="{{notebook.mainPicture}}"
                  alt="Photo d'un carnet"
                  />
                  <div class="filter-color"></div>
                </div>
                <p>{{notebook.introduction}}</p>
              </div>`,
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent {

  @Input() notebooksListChild! : Notebook[]

}
