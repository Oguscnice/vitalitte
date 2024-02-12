import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { Notebook } from 'src/app/shared/interfaces/Notebook';
import { NOTEBOOKS } from 'src/app/shared/variables/notebooks';

@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.scss']
})
export class CreationsComponent extends BaseComponent{

  titleParentCreations = 'Ateliers';
  backgroundImageParentCreations = '../../../assets/images/figma/carnet02.jpg';

  userChoice : 'notebook' | 'workshop' = 'notebook';

  notebooksListPage : Notebook[] = NOTEBOOKS

  override ngOnInit(): void {
    super.ngOnInit();
    this.filterNotebooksList()
  }

  filterNotebooksList(){
    this.notebooksListPage = 
        this.notebooksListPage.sort(() =>
            Math.random() - 0.5).slice(0, 3);
  }

  userChoiceSelected(choice : 'notebook' | 'workshop') : void{
    this.userChoice = choice
  }
}
