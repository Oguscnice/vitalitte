import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ApiNotebookAdminService } from '../../services/api-notebook-admin.service';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CreateNotebook } from '../../interfaces/Notebook';
import { ApiMaterialAdminService } from '../../services/api-material-admin.service';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';

@Component({
  selector: 'app-manage-notebooks',
  template: ` <app-return-admin-home/>
              <h2>Gestion des Carnets</h2>
              <app-post-notebook
                [materialTypes]="materialTypes"
                [materials]="materials"
                [categories]="categories"
                [collections]="collections"
                
                (newNotebook)="postNotebook($event)">
              </app-post-notebook>
              <app-edit-delete-notebook
                [notebooks]="notebooks"

                (changeAvailabilityNotebook)="changeAvailabilityNotebook($event)"
                (notebookToDelete)="modalConfirmation($event)">
              </app-edit-delete-notebook>
              <anguille [message]="messageResponseFromBackend"/>
              <app-modal [modalVisible]="modalVisible"
                         [modalText]="modalText"
                         [multipleChoice]="true"
                        
                         (responseForModal)="responseForModal($event)">
              </app-modal>
            `,
  styleUrls: ['./manage-notebooks.component.scss']
})
export class ManageNotebooksComponent extends BaseComponent{

  private apiNotebookAdminService = inject(ApiNotebookAdminService);
  private apiRequestsService = inject(ApiRequestsService);
  private  apiMaterialAdminService = inject(ApiMaterialAdminService);

  constructor(){
    super()
  }

  materialTypes! : string[];
  materials! : MaterialDto[];
  categories! : CategoryDto[];
  collections! : CollectionDto[];

  notebooks! : NotebookDto[];
  notebookToDelete : NotebookDto | null = null;

  modalVisible : boolean = false;
  modalText! : string;

  ngOnInit(): void {
    this.getAllMaterials();
    this.getAllMaterialsTypes();
    this.getAllNotebooks();
    this.getAllCategories();
    this.getAllCollections();
  }

  getAllMaterialsTypes(): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.getAllMaterialsTypes().subscribe({
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

  getAllCollections(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllCollections().subscribe({
        next: (collections) => this.collections = collections,
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

  modalConfirmation(notebookToDelete : NotebookDto): void{
    this.notebookToDelete = notebookToDelete;
    this.modalText = 'Confirmer vouloir supprimer le Carnet : ' + this.notebookToDelete.name
    this.modalVisible = true;
  }

  responseForModal(response : boolean): void{
    this.modalVisible = false;
    if(response){
      this.deleteNotebook(this.notebookToDelete!.slug);
    }
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

  changeAvailabilityNotebook(notebookToChangeAvailability : NotebookDto): void {
    this.subscriptions.push(
      this.apiNotebookAdminService.changeAvailability(notebookToChangeAvailability).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          for(let notebook of this.notebooks){
            if(notebook.slug === notebookToChangeAvailability.slug){
              notebook.available = !notebook.available
            }
          }

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
