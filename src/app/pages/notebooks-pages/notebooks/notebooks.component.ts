import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';

@Component({
  standalone: false,
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss']
})
export class NotebooksComponent extends BaseComponent{

  private apiRequestsService = inject(ApiRequestsService);
  protected backgroundImageParentCreations = '../../../assets/images/figma/carnet02.jpg';
  protected notebooks! : NotebookDto[]

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
}
