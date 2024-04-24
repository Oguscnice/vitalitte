import { GiftCardDto } from './GiftCard';

export interface CreateGiftCardUsed {
  firstname : string,
  lastaname : number,
  email : Date,
  phone : boolean,
  giftCardDto: GiftCardDto
}