import {NotebookDto} from "./Notebook";
import {InscriptionDto} from "../../modules/admin/shared/interfaces/Inscription";

export interface ShoppingCartItem<T> {
  item: T;
  quantity: number;
}

export interface ShoppingCart {
  notebooks:  ShoppingCartItem<NotebookDto>[],
  inscriptions: ShoppingCartItem<InscriptionDto>[],
}
