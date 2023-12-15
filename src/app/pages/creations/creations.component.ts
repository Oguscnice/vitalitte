import { Component } from '@angular/core';
import { Notebook } from 'src/app/shared/interfaces/Notebook';
import { NOTEBOOKS } from 'src/app/shared/variables/notebooks';

@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.scss']
})
export class CreationsComponent {
  titleParentCreations = 'Ateliers';
  backgroundImageParentCreations = '../../../assets/images/figma/carnet02.jpg';

  userChoice : 'notebook' | 'workshop' = 'notebook';

  notebooksListParent : Notebook[] = NOTEBOOKS

  ngOninit(){
    this.filterNotebooksList()
  }

  filterNotebooksList(){
    this.notebooksListParent = this.notebooksListParent.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  userChoiceSelected(choice : 'notebook' | 'workshop') : void{
    this.userChoice = choice
  }
}
