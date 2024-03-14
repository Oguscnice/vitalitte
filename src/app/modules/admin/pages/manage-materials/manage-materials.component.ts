import { ApiMaterialAdminService } from './../../services/api-material-admin.service';
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { EMaterialType } from 'src/app/shared/interfaces/EMaterialType';
import { CreateMaterial, MaterialDto } from 'src/app/shared/interfaces/Material';

@Component({
  selector: 'app-manage-materials',
  template: ` <app-post-material
                [materialTypes]="materialTypes"
                (newMaterial)="postMaterial($event)"
              >
              </app-post-material>
              <app-edit-delete-material
                [materialsChild]="materials"
                [materialTypes]="materialTypes"
                
                (materialToEdit)="putMaterial($event)"
                (materialSlugToDelete)="deleteMaterial($event)"
              >
              </app-edit-delete-material>`,
  styleUrls: ['./manage-materials.component.scss']
})
export class ManageMaterialsComponent extends BaseComponent{

  constructor(
    private apiMaterialAdminService : ApiMaterialAdminService
  ){
    super()
  }

  materials! : MaterialDto[]
  materialTypes : (keyof typeof EMaterialType)[] = [];

  override ngOnInit(): void {
    this.getAllMaterials();
    this.createEnumMaterialTypeArray();
  }

  createEnumMaterialTypeArray(): void{
    for (const [key, value] of Object.entries(EMaterialType)){
      this.materialTypes.push(value)
    }
  }

  getAllMaterials(): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.getAll().subscribe({
        next: (materials) => {
          this.materials = materials;
        },
        error: (err) => (this.messageResponseFromBackend = err.error.message)
      })
    )
  }

  postMaterial(newMaterial : CreateMaterial): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.post(newMaterial).subscribe({
        next: (res) => {
          this.messageResponseFromBackend = res.message;
          this.getAllMaterials();
        },
        error: (err) => (this.messageResponseFromBackend = err.error.message)
      })
    )
  }

  putMaterial(materialToEdit : MaterialDto): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.put(materialToEdit).subscribe({
        next: (res) => {
          this.messageResponseFromBackend = res.message;
          this.getAllMaterials();
        },
        error: (err) => (this.messageResponseFromBackend = err.error.message)
      })
    )
  }

  deleteMaterial(materialSlug : MaterialDto['slug']): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.delete(materialSlug).subscribe({
        next: (res) => {
          this.messageResponseFromBackend = res.message;
          this.materials = this.materials.filter(material => material.slug !== materialSlug)
        },
        error: (err) => (this.messageResponseFromBackend = err.error.message)
      })
    )
  }
}
