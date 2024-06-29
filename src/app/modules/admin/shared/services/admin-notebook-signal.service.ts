import { Injectable, inject, signal } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import { ApiNotebookAdminService } from './api/api-notebook-admin.service';
import { DataSignalService } from '../../../../shared/services/data-signal.service';
import { CreateNotebook } from '../interfaces/Notebook';
import { NotebookDto } from '../../../../shared/interfaces/Notebook';
import { AdminNotebookSignalState } from '../interfaces/AdminNotebookSignalState';
import { AnguilleSignalService } from '../../../../shared/services/anguille-signal.service';
import { ModalSignalService } from '../../../../shared/services/modal-signal.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminNotebookSignalService extends BaseComponent {

  private apiNotebookAdmin = inject(ApiNotebookAdminService);
  private dataSignalService = inject(DataSignalService);
  private anguilleSignal = inject(AnguilleSignalService);
  private modalSignal = inject(ModalSignalService);
  private router = inject(Router);

  private readonly state: AdminNotebookSignalState = {
    $privateNotebookToDelete: signal<NotebookDto | null>(null),
  } as const;

  public readonly $notebookToDelete = this.state.$privateNotebookToDelete.asReadonly();

  setNotebookToDelete(value: NotebookDto | null): void {
    this.state.$privateNotebookToDelete.set(value);
  }

  postNotebook(newNotebook : CreateNotebook): void{
    this.subscriptions.push(
      this.apiNotebookAdmin.post(newNotebook).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignalService.getAllNotebooks();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  putNotebook(notebookToEdit : NotebookDto): void {
    this.subscriptions.push(
      this.apiNotebookAdmin.put(notebookToEdit).subscribe({
        next: () => {
          const MESSAGE = `Carnet : ${notebookToEdit.name} mise à jour avec succès`;

          this.subscriptions.push(
            this.modalSignal.showModal(MESSAGE, false).subscribe({
              next: () => this.router.navigate(['/admin/gestion-des-carnets']),
              error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
            })
          )
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  changeAvailabilityNotebook(notebookToChangeAvailability : NotebookDto): void {
    this.subscriptions.push(
      this.apiNotebookAdmin.changeAvailability(notebookToChangeAvailability).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignalService.getAllNotebooks();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDeleteNotebook(notebook: NotebookDto): void {

    this.setNotebookToDelete(notebook);
    const MESSAGE = `Confirmez-vous vouloir supprimer le Carnet : ${notebook.name} ?`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice) => userChoice ? this.deleteNotebook() : this.setNotebookToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  deleteNotebook(): void {
    if (this.$notebookToDelete) {
      this.subscriptions.push(
        this.apiNotebookAdmin.delete(this.$notebookToDelete()!.slug).subscribe({
          next: (res) => {
            this.anguilleSignal.changeMessage(res.message);
            this.setNotebookToDelete(null);
            this.dataSignalService.getAllNotebooks();
          },
          error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
        })
      )
    }
  }
}
