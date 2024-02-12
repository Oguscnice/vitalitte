import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { NOTEBOOKS } from 'src/app/shared/variables/notebooks';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss']
})
export class NotebooksComponent extends BaseComponent{

  notebooksListParent = NOTEBOOKS
  titleParentNotebooks = "Carnets Artisanaux"
  backgroundImageParentNotebooks = "../../../assets/images/figma/carnet03.jpg"

}
