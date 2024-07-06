import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import {Component, inject, OnInit, Signal} from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import {AdminGiftCardSignalService} from "../../../shared/services/admin-giftcard-signal.service";

@Component({
  selector: 'app-edit-delete-giftCard',
  standalone: true,
  imports: [ NgClass, CounterZeroIfEmpty, DatePipe, DecimalPipe, RouterLink ],
  templateUrl: 'edit-delete-giftCard.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class EditDeleteGiftCardComponent implements OnInit {

  private adminGiftCardsSignal = inject(AdminGiftCardSignalService);

  giftCards: Signal<GiftCardDto[]> = this.adminGiftCardsSignal.$giftCards;

  isTableVisible: boolean = true;

  ngOnInit(): void {
    this.adminGiftCardsSignal.getAllGiftCards();
  }

  delete = (giftcard : GiftCardDto) => this.adminGiftCardsSignal.confirmationModalForDeleteGiftCard(giftcard);
}
