import { ApiRequestsService } from './../../../../shared/services/api-requests.service';
import { ApiMaterialAdminService } from './../../services/api-material-admin.service';
import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CreateMaterial } from '../../interfaces/Material';

@Component({
  standalone: false,
  selector: 'app-manage-materials',
  template: `
              <app-return-admin-home/>

              <h2>Gestion des Matériaux</h2>

              <app-post-material [materialTypes]="materialTypes"
                                 (newMaterial)="postMaterial($event)">
              </app-post-material>

              <app-edit-delete-material
                [materials]="materials"
                [materialTypes]="materialTypes"
                
                (materialToEdit)="putMaterial($event)"
                (changeAvailabilityMaterial)="changeAvailabilityMaterial($event)"
                (changeAvailabilityForCustomizationMaterial)="changeAvailabilityForCustomizationMaterial($event)"
                (materialToDelete)="showModal($event)">
              </app-edit-delete-material>

              <anguille [message]="messageResponseFromBackend"/>

              <app-modal [modalVisible]="modalVisible"
                         [modalText]="modalText"
                         [multipleChoice]="true"
                        
                         (responseForModal)="responseForModal($event)">
              </app-modal>`,
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class ManageMaterialsComponent extends BaseComponent {

  private apiRequestsService = inject(ApiRequestsService);
  private apiMaterialAdminService = inject(ApiMaterialAdminService);

  materials! : MaterialDto[];
  materialTypes : string[] = [];
  materialToDelete? : MaterialDto

  modalVisible : boolean = false;
  modalText! : string;

  ngOnInit(): void {
    this.getAllMaterials();
    this.getAllMaterialsTypes();
    
  }

  getAllMaterials(): void {
    this.subscriptions.push(
      this.apiRequestsService.getAllMaterials().subscribe({
        next: (materials) => this.materials = materials,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllMaterialsTypes(): void {
    this.subscriptions.push(
      this.apiMaterialAdminService.getAllMaterialsTypes().subscribe({
        next: (materialsTypes) => this.materialTypes = materialsTypes,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  showModal(materialToDelete : MaterialDto): void {
    this.materialToDelete = materialToDelete;
    this.modalText = `Confirmer vouloir supprimer le matériel : "${materialToDelete.name}"`
    this.modalVisible = true;
  }

  responseForModal(response : boolean): void{
    this.modalVisible = false;
    if(response){
      this.deleteMaterial(this.materialToDelete!.slug);
    }
  }

  postMaterial(newMaterial : CreateMaterial): void {
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

  putMaterial(materialToEdit : MaterialDto): void {
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

  changeAvailabilityMaterial(materialToChangeAvaibility: MaterialDto): void {
    this.subscriptions.push(
      this.apiMaterialAdminService.changeAvailability(materialToChangeAvaibility).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          for(let material of this.materials){
            if(material.slug === materialToChangeAvaibility.slug){
              material.available = !material.available
            }
          }

        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  changeAvailabilityForCustomizationMaterial(materialToChangeAvaibilityForCustomization: MaterialDto): void {
    this.subscriptions.push(
      this.apiMaterialAdminService.changeAvailabilityForCustomization(materialToChangeAvaibilityForCustomization).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          for(let material of this.materials){
            if(material.slug === materialToChangeAvaibilityForCustomization.slug){
              material.availableForCustomization = !material.availableForCustomization
            }
          }
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  deleteMaterial(materialSlug : MaterialDto['slug']): void {
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
