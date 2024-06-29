import { CreateGiftCard } from "../../modules/admin/shared/interfaces/GiftCard";

export interface GiftCardDto extends CreateGiftCard {
  slug: string
}
