import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';

@Component({
  selector: 'app-notebooks-prepared',
  templateUrl: './notebooks-prepared.component.html',
  styleUrls: ['./notebooks-prepared.component.scss']
})
export class NotebooksPreparedComponent extends BaseComponent{

  private apiRequestsService = inject(ApiRequestsService);

  notebooksListParent! : NotebookDto[];
  titleParentNotebooks = "Carnets Artisanaux"
  backgroundImageParentNotebooks = "../../../assets/images/figma/carnet03.jpg"

  ngOnInit(): void{
    this.getAllNotebooks();
  }

  getAllNotebooks(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllNotebooks().subscribe({
        next: (materials) => this.notebooksListParent = materials,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
