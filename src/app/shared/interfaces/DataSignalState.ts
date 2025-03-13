import { WritableSignal } from "@angular/core";
import { CategoryDto } from "./Category";
import { CollectionDto } from "./Collection";
import { ProductDto } from "./Product";
import { MaterialDto } from "./Material";
import { BehaviorSubject } from "rxjs";
import {WorkshopDto} from "./Workshop";
import {WorkshopDisponibilities} from "../../modules/admin/shared/interfaces/Workshop";
import {PublicationDto} from "./Publication";
import {DeliveryOptionDto} from "./DeliveryOptionDto";
import {ReviewDto} from "./Review";

export interface DataSignalState {
  $privateCategoryList: WritableSignal<CategoryDto[]>;
  $privateCollectionList: WritableSignal<CollectionDto[]>;
  $privateProductDtoList: WritableSignal<ProductDto[]>;
  $privateProductDtoBySlug: BehaviorSubject<ProductDto | null>;
  $privateMaterialTypeList: WritableSignal<string[]>;
  $privateMaterialList: WritableSignal<MaterialDto[]>;
  $privateWorkshopBySlug: BehaviorSubject<WorkshopDto | null>;
  $privatePublicationBySlug: BehaviorSubject<PublicationDto | null>;
  $privateWorkshopsDateToCome: WritableSignal<WorkshopDto[]>;
  $privateWorkshopsPastDate: WritableSignal<WorkshopDto[]>;
  $privateCounterWorkshopsPastDate: BehaviorSubject<number>;
  $privateCounterRegistrationsReservedWorkshops: WritableSignal<WorkshopDisponibilities[]>;
  $privatePublications: WritableSignal<PublicationDto[]>;
  $privatePublicationsSpotlighted: WritableSignal<PublicationDto[]>;
  $privateIsExpiredGiftCard: WritableSignal<boolean>;
  $privateDeliveryOptions: WritableSignal<DeliveryOptionDto[]>;
  $privateReviews: WritableSignal<ReviewDto[]>
}
