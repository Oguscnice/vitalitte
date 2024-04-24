import { GiftCardDto } from './GiftCard';

export interface CreateGiftCardUsed {
  firstname : string,
  lastname : string,
  email : string,
  phone : string,
  giftCardDto: GiftCardDto
}