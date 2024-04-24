import { CreateGiftCard } from "src/app/modules/admin/interfaces/GiftCard";

export interface GiftCardDto extends CreateGiftCard {
  slug: string
}