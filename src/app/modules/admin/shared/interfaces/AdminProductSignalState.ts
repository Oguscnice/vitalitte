import { WritableSignal } from "@angular/core";
import { ProductDto } from "../../../../shared/interfaces/Product";

export interface AdminProductSignalState {
  $privateProductToDelete: WritableSignal<ProductDto | null>;
}
