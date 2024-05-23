import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';

@Component({
  standalone: true,
  imports: [ TitleCasePipe, RouterLink ],
  selector: 'app-notebooks-list',
  template: `
              @for (notebook of notebooksListChild; track notebook) {
                <div class="notebooks-list flex column center">
                  <h5>{{notebook.name | titlecase}}</h5>
                  <div class="image-and-filter-color flex column pointer"
                      [routerLink]="'/carnets/' + notebook.slug">
                    <img src="{{notebook.mainPicture}}" alt="Photo d'un carnet"/>
                    <div class="filter-color"></div>
                  </div>
                  <div [innerHTML]="notebook.introduction"></div>
                </div>
              }
              `,
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent {

  @Input() notebooksListChild! : NotebookDto[]

}
