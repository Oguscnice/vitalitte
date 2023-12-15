import { Component, Input } from '@angular/core';
import { Notebook } from 'src/app/shared/interfaces/Notebook';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent {

  @Input() notebooksListChild! : Notebook[]

}
