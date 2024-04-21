import { Component, Input } from '@angular/core';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';

@Component({
  selector: 'app-edit-delete-giftcard',
  standalone: true,
  imports: [],
  templateUrl: './edit-delete-giftcard.component.html',
  styleUrl: './edit-delete-giftcard.component.scss'
})
export class EditDeleteGiftcardComponent {
  @Input() giftcards! : GiftCardDto[];
}
