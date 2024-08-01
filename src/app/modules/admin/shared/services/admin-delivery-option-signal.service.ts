import {inject, Injectable, signal} from '@angular/core';
import {AnguilleSignalService} from "../../../../shared/services/anguille-signal.service";
import {ModalSignalService} from "../../../../shared/services/modal-signal.service";
import {ApiDeliveryOptionAdminService} from "./api/api-delivery-option-admin.service";
import {AdminDeliveryOptionSignalState} from "../interfaces/AdminDeliveryOptionSignalState";
import {DeliveryOptionDto} from "../../../../shared/interfaces/DeliveryOptionDto";
import {CreateDeliveryOption} from "../interfaces/CreateDeliveryOption";
import {BaseComponent} from "../../../../base.component";

@Injectable({
  providedIn: 'root'
})
export class AdminDeliveryOptionSignalService extends BaseComponent {

  private anguilleSignal = inject(AnguilleSignalService);
  private modalSignal = inject(ModalSignalService);
  private apiDeliveryOptionAdmin = inject(ApiDeliveryOptionAdminService);

  private readonly state: AdminDeliveryOptionSignalState = {
    $privateDeliveryOptions: signal<DeliveryOptionDto[]>([]),
    $privateDeliveryOptionToDelete: signal<DeliveryOptionDto | null>(null),
  } as const;

  public readonly $deliveryOptions = this.state.$privateDeliveryOptions.asReadonly();
  public readonly $deliveryOptionToDelete = this.state.$privateDeliveryOptionToDelete.asReadonly();

  private setDeliveryOptions(deliveryOptions: DeliveryOptionDto[]): void {
    this.state.$privateDeliveryOptions.set(deliveryOptions);
  }

  private setDeliveryOptionToDelete(value: DeliveryOptionDto | null): void {
    this.state.$privateDeliveryOptionToDelete.set(value);
  }

  getAll(): void {
    this.subscriptions.push(
      this.apiDeliveryOptionAdmin.getAll().subscribe({
        next: (deliveryOptions) => this.setDeliveryOptions(deliveryOptions),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  post(newDeliveryOption: CreateDeliveryOption): void {
    this.subscriptions.push(
      this.apiDeliveryOptionAdmin.post(newDeliveryOption).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.getAll();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  put(deliveryOptionUpdated: DeliveryOptionDto): void {
    this.subscriptions.push(
      this.apiDeliveryOptionAdmin.put(deliveryOptionUpdated).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.getAll();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  changeAvailability(deliveryOption: DeliveryOptionDto): void {
    this.subscriptions.push(
      this.apiDeliveryOptionAdmin.changeAvailability(deliveryOption).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.getAll();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  changeExpress(deliveryOption: DeliveryOptionDto): void {
    this.subscriptions.push(
      this.apiDeliveryOptionAdmin.changeExpress(deliveryOption).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.getAll();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDeleteDeliveryOption(deliveryOption: DeliveryOptionDto): void {

    this.setDeliveryOptionToDelete(deliveryOption);
    const MESSAGE = `Confirmez-vous vouloir supprimer l'option de livraison : ${deliveryOption.name} ?`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice) => userChoice ? this.delete() : this.setDeliveryOptionToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  delete(): void {
    this.subscriptions.push(
      this.apiDeliveryOptionAdmin.delete(this.$deliveryOptionToDelete()!).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.getAll();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
