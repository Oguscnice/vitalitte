import { TransformToEditableService } from './../../services/transform-to-editable.service';
import { ApiRequestsService } from './../../../../shared/services/api-requests.service';
import { ApiMaterialAdminService } from './../../services/api-material-admin.service';
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { CreateMaterial, MaterialDto } from 'src/app/shared/interfaces/Material';
import { MaterialEditable } from '../../interfaces/EditableObject';

@Component({
  selector: 'app-manage-materials',
  template: `<app-post-material
                [materialTypes]="materialTypes"
                (newMaterial)="postMaterial($event)"
              >
              </app-post-material>
              <app-edit-delete-material
                [materialsEditableChild]="materialsEditable"
                [materialTypes]="materialTypes"
                
                (materialToEdit)="putMaterial($event)"
                (materialSlugToDelete)="deleteMaterial($event)"
              >
              </app-edit-delete-material>
              <anguille [message]="messageResponseFromBackend" />`,
  styleUrls: ['./manage-materials.component.scss']
})
export class ManageMaterialsComponent extends BaseComponent{

  constructor(
    private apiMaterialAdminService : ApiMaterialAdminService,
    private apiRequestsService : ApiRequestsService,
    private transformToEditableService : TransformToEditableService
  ){
    super()
  }

  materialsEditable! : MaterialEditable[];
  materialTypes : string[] = [];

  override ngOnInit(): void {
    this.getAllMaterials();
    this.getAllMaterialsTypes();
  }

  getAllMaterials(): void{
    this.subscriptions.push(
      this.apiRequestsService.geAllMaterials().subscribe({
        next: (materials) => this.materialsEditable = this.transformToEditableService.materialDtoToEditable(materials),
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllMaterialsTypes(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllMaterialsTypes().subscribe({
        next: (materialsTypes) => this.materialTypes = materialsTypes,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  postMaterial(newMaterial : CreateMaterial): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.post(newMaterial).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllMaterials();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  putMaterial(materialToEdit : MaterialDto): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.put(materialToEdit).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllMaterials();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  deleteMaterial(materialSlug : MaterialDto['slug']): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.delete(materialSlug).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.materialsEditable = this.materialsEditable.filter(material => material.slug !== materialSlug)
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
