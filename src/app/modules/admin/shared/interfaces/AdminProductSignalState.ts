import { WritableSignal } from "@angular/core";
import { ProductDto } from "../../../../shared/interfaces/Product";
import {BehaviorSubject} from "rxjs";
import {PublicationDto} from "../../../../shared/interfaces/Publication";

export interface AdminProductSignalState {
  $privateProductToDelete: WritableSignal<ProductDto | null>;
  $privateProductDtoBySlug: BehaviorSubject<ProductDto | null>;
}
