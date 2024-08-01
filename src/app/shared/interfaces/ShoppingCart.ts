import {ProductDto} from "./Product";
import {InscriptionDto} from "./Inscription";

export interface ShoppingCartItem<T> {
  item: T;
  quantity: number;
}

export interface ShoppingCart {
  products:  ShoppingCartItem<ProductDto>[],
  inscriptions: ShoppingCartItem<InscriptionDto>[],
}

export type KeyShoppingCart = 'products' | 'inscriptions';
