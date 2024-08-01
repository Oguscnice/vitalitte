import { WritableSignal } from "@angular/core";
import { SlugNameDto } from "./SlugNameDto";
import { ProductDto } from "../../../../shared/interfaces/Product";

export interface AdminDataSignalState {
  $privateItemToDelete: WritableSignal<SlugNameDto | null>;
  $productsImpactedByItemToDelete: WritableSignal<ProductDto[]>;
}
