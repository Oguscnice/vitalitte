import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';

@Component({
  selector: 'app-notebook-selected',
  templateUrl: './notebook-selected.component.html',
  styleUrls: ['./notebook-selected.component.scss']
})
export class NotebookSelectedComponent extends BaseComponent{

  notebookSlug! : string
  notebookSelected! : NotebookDto

  constructor(
    public route: ActivatedRoute,
    private apiRequestsService : ApiRequestsService
    ){
    super()
  }

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.notebookSlug = params['notebookSlug'];
      this.findNotebook()
    });
  }

  findNotebook():void{
    this.subscriptions.push(
      this.apiRequestsService.getNotebookBySlug(this.notebookSlug).subscribe({
        next: (notebook) => this.notebookSelected = notebook,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
