import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ApiNotebookAdminService } from '../../services/api-notebook-admin.service';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { TransformToEditableService } from '../../services/transform-to-editable.service';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CreateNotebook } from '../../interfaces/Notebook';

@Component({
  selector: 'app-manage-notebooks',
  template: ` <app-return-admin-home/>
              <app-post-notebook
                [materialTypes]="materialTypes"
                [materials]="materials"
                [categories]="categories"
                
                (newNotebook)="postNotebook($event)">
              </app-post-notebook>
              <app-edit-delete-notebook></app-edit-delete-notebook>
            `,
  styleUrls: ['./manage-notebooks.component.scss']
})
export class ManageNotebooksComponent extends BaseComponent{

  constructor(
    private apiNotebookAdminService : ApiNotebookAdminService,
    private apiRequestsService : ApiRequestsService,
    private transformToEditableService : TransformToEditableService
  ){
    super()
  }

  materialTypes! : string[];
  materials! : MaterialDto[];
  notebooks! : NotebookDto[];
  categories! : CategoryDto[];

  ngOnInit(): void {
    this.getAllMaterials();
    this.getAllMaterialsTypes();
    this.getAllNotebooks();
    this.getAllCategories();
  }

  getAllMaterialsTypes(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllMaterialsTypes().subscribe({
        next: (materialsTypes) => this.materialTypes = materialsTypes,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllNotebooks(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllNotebooks().subscribe({
        next: (notebooks) => this.notebooks = notebooks,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllMaterials(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllMaterials().subscribe({
        next: (materials) => this.materials = materials,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllCategories(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllCategories().subscribe({
        next: (categories) => this.categories = categories,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  postNotebook(newNotebook : CreateNotebook): void{
    this.subscriptions.push(
      this.apiNotebookAdminService.post(newNotebook).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllNotebooks();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  putNotebook(notebookToEdit : NotebookDto): void{
    this.subscriptions.push(
      this.apiNotebookAdminService.put(notebookToEdit).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllNotebooks();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  deleteNotebook(notebookSlug : NotebookDto['slug']): void{
    this.subscriptions.push(
      this.apiNotebookAdminService.delete(notebookSlug).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.notebooks = this.notebooks.filter(notebook => notebook.slug !== notebookSlug)
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
