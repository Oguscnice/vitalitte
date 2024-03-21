import { ApiRequestsService } from './../../../../shared/services/api-requests.service';
import { ApiMaterialAdminService } from './../../services/api-material-admin.service';
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CreateMaterial } from '../../interfaces/Material';

@Component({
  selector: 'app-manage-materials',
  template: ` <app-return-admin-home/>
              <app-post-material
                [materialTypes]="materialTypes"
                (newMaterial)="postMaterial($event)"
              >
              </app-post-material>
              <app-edit-delete-material
                [materials]="materials"
                [materialTypes]="materialTypes"
                
                (materialToEdit)="putMaterial($event)"
                (materialSlugToDelete)="deleteMaterial($event)"
              >
              </app-edit-delete-material>
              <anguille [message]="messageResponseFromBackend"/>`,
  styleUrls: ['./manage-materials.component.scss']
})
export class ManageMaterialsComponent extends BaseComponent{

  constructor(
    private apiMaterialAdminService : ApiMaterialAdminService,
    private apiRequestsService : ApiRequestsService
  ){
    super()
  }

  materials! : MaterialDto[];
  materialTypes : string[] = [];

  ngOnInit(): void {
    this.getAllMaterials();
    this.getAllMaterialsTypes();
  }

  getAllMaterials(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllMaterials().subscribe({
        next: (materials) => this.materials = materials,
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
          this.materials = this.materials.filter(material => material.slug !== materialSlug)
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
