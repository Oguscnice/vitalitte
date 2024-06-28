import { CreateGiftCardUsed } from "../../../../shared/interfaces/GiftCardUsed";

export interface GiftCardUsedDto extends CreateGiftCardUsed {
  createdAt: Date
}
