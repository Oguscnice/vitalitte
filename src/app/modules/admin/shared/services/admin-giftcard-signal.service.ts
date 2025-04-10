import {inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AnguilleSignalService} from "../../../../shared/services/anguille-signal.service";
import {AdminGiftCardSignalState} from "../interfaces/AdminGiftCardSignalState";
import {GiftCardDto} from "../../../../shared/interfaces/GiftCard";
import {ApiGiftcardService} from "./api/api-giftcard.service";
import {CreateGiftCard} from "../interfaces/CreateGiftCard";
import {BaseComponent} from "../../../../base.component";
import {ModalSignalService} from "../../../../shared/services/modal-signal.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGiftCardSignalService extends BaseComponent {

  private anguilleSignal = inject(AnguilleSignalService);
  private apiGiftcardService = inject(ApiGiftcardService);
  private modalSignal = inject(ModalSignalService);

  private readonly state: AdminGiftCardSignalState = {
    $privateGiftCardsList: signal<GiftCardDto[]>([]),
    $privateGiftCardToDelete: signal<GiftCardDto | null>(null),
  }

  public readonly $giftCards: Signal<GiftCardDto[]> = this.state.$privateGiftCardsList.asReadonly();
  public readonly $giftCardToDelete: Signal<GiftCardDto | null> = this.state.$privateGiftCardToDelete.asReadonly();

  private setGiftCards(giftCards: GiftCardDto[]): void {
    this.state.$privateGiftCardsList.set(giftCards);
  }

  private setGiftCardToDelete(giftCard: GiftCardDto | null): void {
    this.state.$privateGiftCardToDelete.set(giftCard);
  }

  getAllGiftCards(): void {
    this.subscriptions.push(
      this.apiGiftcardService.getAll().subscribe({
        next: (giftcards) => this.setGiftCards(giftcards),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  post(newGiftCard : CreateGiftCard): void {
    this.subscriptions.push(
      this.apiGiftcardService.post(newGiftCard).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.getAllGiftCards();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDeleteGiftCard(giftCard: GiftCardDto): void {
    this.setGiftCardToDelete(giftCard);
    const MESSAGE: string = `Confirmez-vous vouloir supprimer la carte cadeau : ${giftCard.code} ?`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice) => userChoice ? this.delete() : this.setGiftCardToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  private delete(): void {
    this.subscriptions.push(
      this.apiGiftcardService.delete(this.$giftCardToDelete()!.code).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.getAllGiftCards();
          this.setGiftCardToDelete(null);
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
