import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';

@Component({
  standalone: false,
  selector: 'app-notebook-selected',
  templateUrl: './notebook-selected.component.html',
  styleUrls: ['./notebook-selected.component.scss']
})
export class NotebookSelectedComponent extends BaseComponent{

  protected route = inject(ActivatedRoute);
  protected apiRequestsService = inject(ApiRequestsService);

  notebookSlug! : NotebookDto['slug']
  notebookSelected! : NotebookDto

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.notebookSlug = params['notebookSlug'];
      this.findNotebook()
    });
  }

  findNotebook(): void {
    this.subscriptions.push(
      this.apiRequestsService.getNotebookBySlug(this.notebookSlug).subscribe({
        next: (notebook) => this.notebookSelected = notebook,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
