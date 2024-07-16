import { WritableSignal } from "@angular/core";
import { CategoryDto } from "./Category";
import { CollectionDto } from "./Collection";
import { NotebookDto } from "./Notebook";
import { MaterialDto } from "./Material";
import { BehaviorSubject } from "rxjs";
import {WorkshopDto} from "./Workshop";
import {WorkshopDisponibilities} from "../../modules/admin/shared/interfaces/Workshop";
import {PublicationDto} from "./Publication";
import {GiftCardDto} from "./GiftCard";
import {DeliveryOptionDto} from "./DeliveryOptionDto";

export interface DataSignalState {
  $privateCategoryList: WritableSignal<CategoryDto[]>;
  $privateCollectionList: WritableSignal<CollectionDto[]>;
  $privateNotebookList: WritableSignal<NotebookDto[]>;
  $privateMaterialTypeList: WritableSignal<string[]>;
  $privateMaterialList: WritableSignal<MaterialDto[]>;
  $privateNotebookBySlug: BehaviorSubject<NotebookDto | null>;
  $privateWorkshopBySlug: BehaviorSubject<WorkshopDto | null>;
  $privateMaterialBySlug: BehaviorSubject<MaterialDto | null>;
  $privatePublicationBySlug: BehaviorSubject<PublicationDto | null>;
  $privateWorkshopsDateToCome: WritableSignal<WorkshopDto[]>;
  $privateWorkshopsPastDate: WritableSignal<WorkshopDto[]>;
  $privateCounterWorkshopsPastDate: BehaviorSubject<number>;
  $privateCounterRegistrationsReservedWorkshops: WritableSignal<WorkshopDisponibilities[]>;
  $privatePublications: WritableSignal<PublicationDto[]>;
  $privatePublicationsSpotlighted: WritableSignal<PublicationDto[]>;
  $privateCounterPublications: BehaviorSubject<number>;
  $privateIsExpiredGiftCard: WritableSignal<boolean>;
  $privateDeliveryOptions: WritableSignal<DeliveryOptionDto[]>;
}
