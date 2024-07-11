import {WritableSignal} from "@angular/core";
import {ShoppingCart} from "./ShoppingCart";
import {DeliveryOptionDto} from "./DeliveryOptionDto";
import {GiftCardDto} from "./GiftCard";
import {BehaviorSubject} from "rxjs";

export interface ShoppingCartSignalState {
  $privateUserShoppingCart: WritableSignal<ShoppingCart>;
  $privateDeliveryOption: WritableSignal<DeliveryOptionDto | null>;
  $privateGiftCardActive: WritableSignal<GiftCardDto | null>;
  $privateShoppingCartSignalChanges: BehaviorSubject<number>;
}
