import {WritableSignal} from "@angular/core";
import {GiftCardDto} from "../../../../shared/interfaces/GiftCard";
import {SlugNameDto} from "./SlugNameDto";

export interface AdminGiftCardSignalState {
  $privateGiftCardsList: WritableSignal<GiftCardDto[]>;
  $privateGiftCardToDelete: WritableSignal<GiftCardDto | null>;
}
