import { Component } from '@angular/core';
import { NOTEBOOKS } from 'src/app/shared/variables/notebooks';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss']
})
export class NotebooksComponent {

  notebooksListParent = NOTEBOOKS
  titleParentNotebooks = "Carnets Artisanaux"
  backgroundImageParentNotebooks = "../../../assets/images/figma/carnet03.jpg"

}
