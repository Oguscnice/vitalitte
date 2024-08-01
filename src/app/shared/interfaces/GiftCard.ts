import { CreateGiftCard } from "../../modules/admin/shared/interfaces/CreateGiftCard";

export interface GiftCardDto extends CreateGiftCard {
  slug: string
}
