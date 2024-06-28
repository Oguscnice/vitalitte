import {inject, Injectable, Signal, signal} from '@angular/core';
import {DataSignalService} from "../../../../shared/services/data-signal.service";
import {ApiPublicationAdminService} from "./api/api-publication-admin.service";
import {AnguilleSignalService} from "../../../../shared/services/anguille-signal.service";
import {ModalSignalService} from "../../../../shared/services/modal-signal.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {AdminPublicationSignalState} from "../interfaces/AdminPublicationSignalState";
import {PublicationDto} from "../../../../shared/interfaces/Publication";
import {CreatePublication} from "../interfaces/Publication";
import {BaseComponent} from "../../../../base.component";

@Injectable({
  providedIn: 'root'
})
export class AdminPublicationSignalService extends BaseComponent {

  private dataSignal: DataSignalService = inject(DataSignalService);
  private apiPublicationAdmin = inject(ApiPublicationAdminService);
  private anguilleSignal: AnguilleSignalService = inject(AnguilleSignalService);
  private modalSignal: ModalSignalService = inject(ModalSignalService);

  private readonly state: AdminPublicationSignalState = {
    $privatePublicationToDelete: signal<PublicationDto | null>(null)
  } as const;

  public readonly $publicationToDelete: Signal<PublicationDto | null> = this.state.$privatePublicationToDelete.asReadonly();

  setPublicationToDelete(publication: PublicationDto | null): void {
    this.state.$privatePublicationToDelete.set(publication);
  }

  post(newPublication : CreatePublication): void {
    this.subscriptions.push(
      this.apiPublicationAdmin.post(newPublication).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getPublicationsPaginated();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  put(publication : PublicationDto): void {
    this.subscriptions.push(
      this.apiPublicationAdmin.put(publication).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getPublicationsPaginated();
          this.dataSignal.setPublicationBySlug(null);
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  changeSpotlight(publicationToChangeAvailability : PublicationDto): void {
    this.subscriptions.push(
      this.apiPublicationAdmin.changeSpotlighted(publicationToChangeAvailability).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getPublicationsPaginated();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDeletePublication(publication: PublicationDto): void {
    this.setPublicationToDelete(publication);
    const MESSAGE: string = `Confirmez-vous vouloir supprimer la publication : ${publication.title} ?`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice: boolean): void => userChoice ? this.delete() : this.setPublicationToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  delete(): void {
    this.subscriptions.push(
      this.apiPublicationAdmin.delete(this.$publicationToDelete()!.slug).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getPublicationsPaginated();
          this.setPublicationToDelete(null);
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
