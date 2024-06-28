import {WritableSignal} from "@angular/core";
import {ShoppingCart} from "./ShoppingCart";

export interface ShoppingCartSignalState {
  $privateUserShoppingCart: WritableSignal<ShoppingCart>;
}
