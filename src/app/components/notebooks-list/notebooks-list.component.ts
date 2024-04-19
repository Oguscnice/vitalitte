import { NgFor, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';

@Component({
  standalone: true,
  imports: [ NgFor, TitleCasePipe, RouterLink ],
  selector: 'app-notebooks-list',
  template: `<div class="notebooks-list flex column center"
                  *ngFor="let notebook of notebooksListChild">
                <h5>{{notebook.name | titlecase}}</h5>
                <div class="image-and-filter-color flex column pointer"
                    [routerLink]="'/carnets/' + notebook.slug">
                  <img src="{{notebook.mainPicture}}"
                       alt="Photo d'un carnet"/>
                  <div class="filter-color"></div>
                </div>
                <p>{{notebook.introduction}}</p>
              </div>`,
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent {

  @Input() notebooksListChild! : NotebookDto[]

}
