import {inject, Injectable, signal} from '@angular/core';
import {AnguilleSignalService} from "../../../../shared/services/anguille-signal.service";
import {ModalSignalService} from "../../../../shared/services/modal-signal.service";
import {AdminWorkshopSignalState} from "../interfaces/AdminWorkshopSignalState";
import {WorkshopDto} from "../../../../shared/interfaces/Workshop";
import {BaseComponent} from "../../../../base.component";
import {ApiWorkshopAdminService} from "./api/api-workshop-admin.service";
import {CreateWorkshop} from "../interfaces/Workshop";
import { Router } from '@angular/router';
import {DataSignalService} from "../../../../shared/services/data-signal.service";
import {Pagination} from "../../../../shared/interfaces/Pagination";
import {PaginationSignalService} from "../../../../shared/services/pagination-signal.service";

@Injectable({
  providedIn: 'root'
})
export class AdminWorkshopSignalService extends BaseComponent {

  private anguilleSignal = inject(AnguilleSignalService);
  private modalSignal = inject(ModalSignalService);
  private dataSignal = inject(DataSignalService);
  private apiWorkshopAdmin = inject(ApiWorkshopAdminService);
  private paginationSignal = inject(PaginationSignalService);
  private router = inject(Router);

  private readonly state: AdminWorkshopSignalState = {
    $privateWorkshopToDelete: signal<WorkshopDto | null>(null),
  } as const;

  public readonly $workshopToDelete = this.state.$privateWorkshopToDelete.asReadonly();

  setWorkbookToDelete(value: WorkshopDto | null): void {
    this.state.$privateWorkshopToDelete.set(value);
  }

  post(workshop : CreateWorkshop): void {
    this.subscriptions.push(
      this.apiWorkshopAdmin.post(workshop).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getWorkshopsByDateToCome();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  put(editedWorkshop : WorkshopDto): void {
    this.subscriptions.push(
      this.apiWorkshopAdmin.put(editedWorkshop).subscribe({
        next: (res) => {
          const MESSAGE = `Materiel : ${editedWorkshop.title} mise à jour avec succès`;
          this.subscriptions.push(
            this.modalSignal.showModal(res.message, false).subscribe({
              next: () => this.router.navigate(['/admin/gestion-des-ateliers']),
              error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
            })
          )
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  changeAvailability(workshopToChangeAvailability : WorkshopDto): void {
    this.subscriptions.push(
      this.apiWorkshopAdmin.changeAvailability(workshopToChangeAvailability).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getWorkshopsByDateToCome();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDeleteWorkshop(workshop: WorkshopDto): void {

    this.setWorkbookToDelete(workshop);
    const MESSAGE = `Confirmez-vous vouloir supprimer l'Atelier : ${workshop.title} ?`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice) => userChoice ? this.deleteWorkshop() : this.setWorkbookToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  deleteWorkshop(): void {
    this.subscriptions.push(
      this.apiWorkshopAdmin.delete(this.$workshopToDelete()!.slug).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.setWorkbookToDelete(null);
          this.dataSignal.getWorkshopsByDateToCome();
          this.dataSignal.getWorkshopsByPastDate();
          },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
