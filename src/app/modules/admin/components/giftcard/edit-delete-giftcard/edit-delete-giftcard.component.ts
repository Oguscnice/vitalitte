import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';

@Component({
  selector: 'app-edit-delete-giftcard',
  standalone: true,
  imports: [ NgClass, NgIf, NgFor, CounterZeroIfEmpty, DatePipe, DecimalPipe, RouterLink ],
  templateUrl: './edit-delete-giftcard.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class EditDeleteGiftcardComponent {

  @Input() giftcards! : GiftCardDto[];
  @Output() giftCardToDelete: EventEmitter<GiftCardDto> = new EventEmitter();

  isTableVisible: boolean = true;

  delete = (giftcard : GiftCardDto) => this.giftCardToDelete.emit(giftcard);
}
