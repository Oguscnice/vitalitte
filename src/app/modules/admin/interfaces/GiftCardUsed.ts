import { CreateGiftCardUsed } from "src/app/shared/interfaces/GiftCardUsed";

export interface GiftCardUsedDto extends CreateGiftCardUsed {
  createdAt: Date
}