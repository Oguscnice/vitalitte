import { ApiWorkshopAdminService } from './../../services/api-workshop-admin.service';
import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { CreateWorkshop } from '../../interfaces/Workshop';

@Component({
  selector: 'app-manage-workshops',
  standalone: false,
  templateUrl: './manage-workshops.component.html',
  styleUrl: './manage-workshops.component.scss'
})
export class ManageWorkshopsComponent extends BaseComponent {

  private apiWorkshopAdminService = inject(ApiWorkshopAdminService);

  modalVisible : boolean = false;
  modalText! : string;

  workshopToDelete! : WorkshopDto;

  ngOnInit(): void {
    this.getAllWorkshops();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  getAllWorkshops(): void{
    this.subscriptions.push(
      // this.apiRequestsService.getAllMaterials().subscribe({
      //   next: (materials) => this.materials = materials,
      //   error: (err) => (this.changeMessage(err.error.message))
      // })
    )
  }

  showModal(workshopToDelete : WorkshopDto): void {
    this.workshopToDelete = workshopToDelete;
    this.modalText = `Confirmer vouloir supprimer l'atelier : "${workshopToDelete.title}"`
    this.modalVisible = true;
  }

  responseForModal(response : boolean): void{
    this.modalVisible = false;
    if(response){
      this.deleteWorkshop(this.workshopToDelete.slug);
    }
  }

  post(newWorkshop : CreateWorkshop): void {
    this.subscriptions.push(
      this.apiWorkshopAdminService.post(newWorkshop).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
console.log(res);
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  deleteWorkshop(workshopSlug : WorkshopDto['slug']): void {
    this.subscriptions.push(
      // this.apiMaterialAdminService.delete(materialSlug).subscribe({
      //   next: (res) => {
      //     this.changeMessage(res.message);
      //     this.materials = this.materials.filter(material => material.slug !== materialSlug)
      //   },
      //   error: (err) => (this.changeMessage(err.error.message))
      // })
    )
  }
}
