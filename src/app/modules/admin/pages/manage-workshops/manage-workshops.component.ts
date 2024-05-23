import { ApiWorkshopAdminService } from './../../services/api-workshop-admin.service';
import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { CreateWorkshop } from '../../interfaces/Workshop';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';

@Component({
  selector: 'app-manage-workshops',
  standalone: false,
  template: `
              <app-return-admin-home/>

              <h2>Gestion des Ateliers</h2>

              <app-post-workshop (newWorkshop)="post($event)"/>

              <app-edit-delete-workshop [workshops]="workshops"
              
                                        (changeAvailabilityWorkshop)="changeAvailability($event)"
                                        (workshopToDelete)="showModal($event)">
              </app-edit-delete-workshop>
              
              <anguille [message]="messageResponseFromBackend"/>
              
              <app-modal [modalVisible]="modalVisible"
                        [modalText]="modalText"
                        [multipleChoice]="true"
                        
                        (responseForModal)="responseForModal($event)">
              </app-modal>`,
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class ManageWorkshopsComponent extends BaseComponent {

  private apiWorkshopAdminService = inject(ApiWorkshopAdminService);
  private apiRequestsService = inject(ApiRequestsService);

  modalVisible : boolean = false;
  multipleChoice! : boolean;
  modalText! : string;
  
  workshops! : WorkshopDto[];
  workshopToDelete! : WorkshopDto;

  ngOnInit(): void {
    this.getAllWorkshops();
  }

  getAllWorkshops(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllWorkshops().subscribe({
        next: (workshops) => this.workshops = workshops,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  showModal(workshopToDelete : WorkshopDto): void {
    this.workshopToDelete = workshopToDelete;
    this.modalText = `Confirmer vouloir supprimer l'atelier : ${workshopToDelete.title}`
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
        next: (res) => this.changeMessage(res.message),
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  changeAvailability(workshopToChangeAvaibility : WorkshopDto): void {
    this.subscriptions.push(
      this.apiWorkshopAdminService.changeAvailability(workshopToChangeAvaibility).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          for(let workshop of this.workshops){
            if(workshop.slug === workshopToChangeAvaibility.slug){
              workshop.available = !workshop.available
            }
          }
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  deleteWorkshop(workshopSlug : WorkshopDto['slug']): void {
    this.subscriptions.push(
      this.apiWorkshopAdminService.delete(workshopSlug).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.workshops = this.workshops.filter(workshop => workshop.slug !== workshopSlug)
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
