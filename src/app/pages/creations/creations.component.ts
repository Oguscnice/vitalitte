import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';

@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.scss']
})
export class CreationsComponent extends BaseComponent{

  constructor(
    private apiRequestsService : ApiRequestsService
  ){
    super()
  }

  titleParentCreations = 'Ateliers';
  backgroundImageParentCreations = '../../../assets/images/figma/carnet02.jpg';

  userChoice : 'notebook' | 'workshop' = 'notebook';

  notebooks! : NotebookDto[]

  ngOnInit(): void {
    this.getAllNotebooks();
  }

  getAllNotebooks(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllNotebooks().subscribe({
        next: (notebooks) => {
          this.notebooks = notebooks;
          this.filterNotebooksList();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  filterNotebooksList(){
    this.notebooks = 
        this.notebooks.sort(() =>
            Math.random() - 0.5).slice(0, 3);
  }

  userChoiceSelected(choice : 'notebook' | 'workshop') : void{
    this.userChoice = choice
  }
}
