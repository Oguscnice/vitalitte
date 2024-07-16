import {Injectable, inject, signal, Signal} from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { DataSignalState } from '../interfaces/DataSignalState';
import { CategoryDto } from '../interfaces/Category';
import { BaseComponent } from 'src/app/base.component';
import { CollectionDto } from '../interfaces/Collection';
import { NotebookDto } from '../interfaces/Notebook';
import { MaterialDto } from '../interfaces/Material';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import { AnguilleSignalService } from './anguille-signal.service';
import {WorkshopDto} from "../interfaces/Workshop";
import {WorkshopDisponibilities} from "../../modules/admin/shared/interfaces/Workshop";
import {PaginationSignalService} from "./pagination-signal.service";
import {PublicationDto} from "../interfaces/Publication";
import {CreateInscription, InscriptionDto} from "../interfaces/Inscription";
import {ShoppingCartService} from "./shopping-cart.service";
import {DeliveryOptionDto} from "../interfaces/DeliveryOptionDto";
import {ModalSignalService} from "./modal-signal.service";
import {ObjectUtilsService} from "./object-utils.service";
import {CategoryAndCollection} from "../interfaces/CategoryAndCollection";

@Injectable({
  providedIn: 'root'
})
export class DataSignalService extends BaseComponent {

  private apiRequests = inject(ApiRequestsService);
  private anguilleSignal = inject(AnguilleSignalService);
  private modalSignal = inject(ModalSignalService);
  private paginationSignal = inject(PaginationSignalService);
  private shoppingCart = inject(ShoppingCartService);
  private objectUtils = inject(ObjectUtilsService);

  private readonly state: DataSignalState = {
    $privateCategoryList: signal<CategoryDto[]>([]),
    $privateCollectionList: signal<CategoryDto[]>([]),
    $privateNotebookList: signal<NotebookDto[]>([]),
    $privateMaterialTypeList: signal<string[]>([]),
    $privateMaterialList: signal<MaterialDto[]>([]),
    $privateWorkshopsDateToCome: signal<WorkshopDto[]>([]),
    $privateWorkshopsPastDate: signal<WorkshopDto[]>([]),
    $privateCounterWorkshopsPastDate: new BehaviorSubject<number>(0),
    $privateCounterRegistrationsReservedWorkshops: signal<WorkshopDisponibilities[]>([]),
    $privatePublications: signal<PublicationDto[]>([]),
    $privatePublicationsSpotlighted: signal<PublicationDto[]>([]),
    $privateCounterPublications: new BehaviorSubject<number>(0),
    $privateNotebookBySlug: new BehaviorSubject<NotebookDto | null>(null),
    $privateWorkshopBySlug: new BehaviorSubject<WorkshopDto | null>(null),
    $privateMaterialBySlug: new BehaviorSubject<MaterialDto | null>(null),
    $privatePublicationBySlug: new BehaviorSubject<PublicationDto | null>(null),
    $privateIsExpiredGiftCard: signal<boolean>(true),
    $privateDeliveryOptions: signal<DeliveryOptionDto[]>([]),
  } as const;

  public readonly $categories: Signal<CategoryDto[]> = this.state.$privateCategoryList.asReadonly();
  public readonly $collections: Signal<CollectionDto[]> = this.state.$privateCollectionList.asReadonly();
  public readonly $notebooks: Signal<NotebookDto[]> = this.state.$privateNotebookList.asReadonly();
  public readonly $materialTypes: Signal<string[]> = this.state.$privateMaterialTypeList.asReadonly();
  public readonly $materials: Signal<MaterialDto[]> = this.state.$privateMaterialList.asReadonly();
  public readonly $notebookBySlug: Observable<NotebookDto | null> = this.state.$privateNotebookBySlug.asObservable();
  public readonly $workshopBySlug: Observable<WorkshopDto | null> = this.state.$privateWorkshopBySlug.asObservable();
  public readonly $materialBySlug: Observable<MaterialDto | null> = this.state.$privateMaterialBySlug.asObservable();
  public readonly $publicationBySlug: Observable<PublicationDto | null> = this.state.$privatePublicationBySlug.asObservable();
  public readonly $workshopsDateToCome: Signal<WorkshopDto[]> = this.state.$privateWorkshopsDateToCome.asReadonly();
  public readonly $workshopsPastDate: Signal<WorkshopDto[]> = this.state.$privateWorkshopsPastDate.asReadonly();
  public readonly $workshopsCounterPastDate: Observable<number> = this.state.$privateCounterWorkshopsPastDate.asObservable();
  public readonly $workshopsRegistrationsReserved: Signal<WorkshopDisponibilities[]> = this.state.$privateCounterRegistrationsReservedWorkshops.asReadonly();
  public readonly $publications: Signal<PublicationDto[]> = this.state.$privatePublications.asReadonly();
  public readonly $publicationsSpotlighted: Signal<PublicationDto[]> = this.state.$privatePublicationsSpotlighted.asReadonly();
  public readonly $publicationsCounter: Observable<number> = this.state.$privateCounterPublications.asObservable();
  public readonly $deliveryOptionAvailable: Signal<DeliveryOptionDto[]> = this.state.$privateDeliveryOptions.asReadonly();

  //-------------------
  //-----CATEGORY------
  //-------------------

  setCategoryList(categories: CategoryDto[]): void {
    this.state.$privateCategoryList.set(categories);
  }

  getAllCategories(): void {
    this.subscriptions.push(
      this.apiRequests.getAllCategories().subscribe({
        next: (categories: CategoryDto[]): void => this.setCategoryList(categories),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  //-------------------
  //-----COLLECTION----
  //-------------------

  setCollectionList(collections: CollectionDto[]): void {
    this.state.$privateCollectionList.set(collections);
  }

  getAllCollections(): void {
    this.subscriptions.push(
      this.apiRequests.getAllCollections().subscribe({
        next: (collections: CollectionDto[]): void => this.setCollectionList(collections),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  //-------------------
  //------MATERIAL-----
  //-------------------

  setMaterialTypeList(materialTypes: string[]): void {
    this.state.$privateMaterialTypeList.set(materialTypes);
  }

  setMaterialList(materials: MaterialDto[]): void {
    this.state.$privateMaterialList.set(materials);
  }

  setMaterialBySlug(material: MaterialDto | null): void {
    this.state.$privateMaterialBySlug.next(material);
  }

  getAllMaterialsTypes(): void{
    this.subscriptions.push(
      this.apiRequests.getAllMaterialsTypes().subscribe({
        next: (materialsTypes: string[]): void => this.setMaterialTypeList(materialsTypes),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getAllMaterials(): void{
    this.subscriptions.push(
      this.apiRequests.getAllMaterials().subscribe({
        next: (materials: MaterialDto[]): void => this.setMaterialList(materials),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getMaterialBySlug(materialSlug: MaterialDto['slug']): void {
    this.subscriptions.push(
      this.apiRequests.getMaterialBySlug(materialSlug).subscribe({
        next: (material: MaterialDto): void => this.setMaterialBySlug(material),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  //-------------------
  //------NOTEBOOK-----
  //-------------------

  setNotebookList(notebooks: NotebookDto[]): void {
    this.state.$privateNotebookList.set(notebooks);
  }

  setNotebookBySlug(notebook: NotebookDto | null): void {
    this.state.$privateNotebookBySlug.next(notebook);
  }

  getAllNotebooks(filter?: boolean): void {
    this.subscriptions.push(
      this.apiRequests.getAllNotebooks().subscribe({
        next: (notebooks: NotebookDto[]) => this.setNotebookList(filter ? this.filterNotebooksList(notebooks) : notebooks),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getAllNotebooksByCategoryAndCollection(categoryAndCollection: CategoryAndCollection): void {
    this.subscriptions.push(
      this.apiRequests.getNotebooksByCategoryAndCollection(categoryAndCollection).subscribe({
        next: (notebooks: NotebookDto[]) => this.setNotebookList(notebooks),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  private filterNotebooksList(notebooks: NotebookDto[]): NotebookDto[] {
    return notebooks.sort(() =>
      Math.random() - 0.5).slice(0, 3);
  }

  getNotebookBySlug(notebookSlug: NotebookDto['slug']): void {
    this.subscriptions.push(
      this.apiRequests.getNotebookBySlug(notebookSlug).subscribe({
        next: (notebook: NotebookDto): void => this.setNotebookBySlug(notebook),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  //-------------------
  //------WORKSHOP-----
  //-------------------

  setWorkshopBySlug(workshop: WorkshopDto | null): void {
    this.state.$privateWorkshopBySlug.next(workshop);
  }

  setWorkshopsDateToCome(workshops: WorkshopDto[]): void {
    this.state.$privateWorkshopsDateToCome.set(workshops);
  }

  setWorkshopsPastDate(workshops: WorkshopDto[]): void {
    this.state.$privateWorkshopsPastDate.set(workshops);
  }

  setWorkshopsCounterPastDate(value: number): void {
    this.state.$privateCounterWorkshopsPastDate.next(value);
  }

  setWorkshopDisponibilities(workshopDisponibilities: WorkshopDisponibilities[]): void {
    this.state.$privateCounterRegistrationsReservedWorkshops.set(workshopDisponibilities);
  }

  getWorkshopBySlug(workshopSlug: WorkshopDto['slug']): void {
    this.subscriptions.push(
      this.apiRequests.getWorkshopBySlug(workshopSlug).subscribe({
        next: (workshop: WorkshopDto) => {
          this.setWorkshopBySlug(null);
          this.setWorkshopBySlug(workshop);
          this.getCounterWorkshopRegistrationsReserved(workshopSlug);
        },
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getWorkshopsByDateToCome(): void {
    this.subscriptions.push(
      this.apiRequests.getWorkshopsByDateToCome().subscribe({
        next: (workshops: WorkshopDto[]): void => {
          this.setWorkshopsDateToCome(workshops);
          workshops.forEach(workshop =>  this.getCounterWorkshopRegistrationsReserved(workshop.slug))
        },
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getWorkshopsByPastDate(): void {
    this.subscriptions.push(
      this.apiRequests.getWorkshopsByPastDate(this.paginationSignal.transformToPaginationWithSearchValue()).subscribe({
        next: (workshops: WorkshopDto[]): void => {
          this.setWorkshopsPastDate(workshops);
          workshops.forEach(workshop =>  this.getCounterWorkshopRegistrationsReserved(workshop.slug))
        },
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getCounterWorkshopsByPastDate(): void {
    this.subscriptions.push(
      this.apiRequests.getCounterWorkshopsByPastDate().subscribe({
        next: (counter: number): void => this.setWorkshopsCounterPastDate(counter),
        error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getCounterWorkshopRegistrationsReserved(workshopSlugToFind: WorkshopDto['slug']): void {
    let DISPONIBILITIES = this.state.$privateCounterRegistrationsReservedWorkshops();
      this.subscriptions.push(
        this.apiRequests.getCounterWorkshopInscriptions(workshopSlugToFind).subscribe({
          next: (counter: number): void => {
            const NEW_DISPONIBILITY: WorkshopDisponibilities = {workshopSlug: workshopSlugToFind, registrationsReserved: counter};
            if (DISPONIBILITIES.some(item => item.workshopSlug === workshopSlugToFind)) {
              DISPONIBILITIES = DISPONIBILITIES.filter(item => item.workshopSlug !== workshopSlugToFind)
            }
            DISPONIBILITIES.push(NEW_DISPONIBILITY);
            this.setWorkshopDisponibilities(DISPONIBILITIES);
          },
          error: (err): void => (this.anguilleSignal.changeMessage(err.error.message))
        })
      );
  }

  //-------------------
  //----PUBLICATION----
  //-------------------

  setPublicationBySlug(publication: PublicationDto | null): void {
    this.state.$privatePublicationBySlug.next(publication);
  }

  setPublications(publications: PublicationDto[]): void {
    this.state.$privatePublications.set(publications);
  }

  setPublicationsSpotligthed(publications: PublicationDto[]): void {
    this.state.$privatePublicationsSpotlighted.set(publications);
  }

  setCounterPublications(value: number): void {
    this.state.$privateCounterPublications.next(value);
  }

  getPublicationsPaginated(): void {
    this.subscriptions.push(
      this.apiRequests.getPublicationPaginated(this.paginationSignal.transformToPaginationWithSearchValue()).subscribe({
        next: (publications) => this.setPublications(publications),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getPublicationsSpotlighted(): void {
    this.subscriptions.push(
      this.apiRequests.getPublicationsSpotlighted('true').subscribe({
        next: (publicationsSpotlighted) => {
          for(const PUBLICATION of publicationsSpotlighted){
            if (PUBLICATION.description.length > 50) {
              PUBLICATION.description = this.truncateString(PUBLICATION.description, 50);
            }
            if (PUBLICATION.title.length > 50) {
              PUBLICATION.title = this.truncateString(PUBLICATION.title, 50);
            }
          }
          this.setPublicationsSpotligthed(publicationsSpotlighted);
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getCounterPublications(): void {
    this.subscriptions.push(
      this.apiRequests.getCounterPublications(this.paginationSignal.transformToPaginationWithSearchValue()).subscribe({
        next: (counter) => this.setCounterPublications(counter),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  //-------------------
  //-----GIFT-CARD-----
  //-------------------

  checkGiftCard(code: string): void {
    this.subscriptions.push(
      this.apiRequests.checkGiftCard(code).subscribe({
        next: (giftCard) => {
          this.shoppingCart.setGiftCardActive(giftCard)
          this.anguilleSignal.changeMessage("Carte cadeau appliquée avec succès.")
        },
        error: (err) => {
          this.anguilleSignal.changeMessage(err.error.message);
          this.shoppingCart.setGiftCardActive(null);
        }
      })
    )
  }

  private truncateString(value : string, length : number): string {
    return value.length > length ? value.slice(0, length) + "..." : value
  }

  //-------------------
  //----INSCRIPTION----
  //-------------------

  postInscription(inscription: CreateInscription): void {
    this.subscriptions.push(
      this.apiRequests.postInscription(inscription).subscribe({
        next: (inscriptionDto) => {
          this.anguilleSignal.changeMessage("Ajouté au Panier avec succès");
          this.getWorkshopBySlug(inscription.workshopDto.slug);
          this.shoppingCart.addItem(inscriptionDto, 'inscriptions');
        },
        error: (err) => this.anguilleSignal.changeMessage(err.error.message)
      })
    )
  }

  changeQuantityInscription(addOrRemove: 'add-participant' | 'remove-participant', inscription: InscriptionDto): Observable<boolean> {
    return this.apiRequests.changeQuantityInscription(addOrRemove, inscription).pipe(
      map(res => {
        return true;
      }),
      catchError(err => {
        this.anguilleSignal.changeMessage(err.error.message);
        return of(false);
      })
    );
  }

  deleteInscriptionBySlug(slug: InscriptionDto['slug']): void {
    this.subscriptions.push(
      this.apiRequests.deleteInscriptionBySlug(slug).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.shoppingCart.setShoppingCart();
        },
        error: (err) => this.anguilleSignal.changeMessage(err.error.message)
      })
    )
  }

  //-------------------
  //--DELIVERY-OPTION--
  //-------------------

  private setDeliveryOptions(deliveryOptions: DeliveryOptionDto[]): void {
    this.state.$privateDeliveryOptions.set(deliveryOptions);
  }

  getDeliveryOptionsAvailable(): void {
    this.subscriptions.push(
      this.apiRequests.getDeliveryOptionAvailable().subscribe({
        next: (deliveryOptions) => this.setDeliveryOptions(deliveryOptions),
        error: (err) => this.anguilleSignal.changeMessage(err.error.message)
      })
    )
  }

  //-------------------
  //---SHOPPING-CART---
  //-------------------

  verifyShoppingCartValidity(): void {
    let cart = this.shoppingCart.$userShoppingCart();
    const MESSAGE_ITEM_CHANGE = "Quelque chose a changé dans votre panier !";

    // on va rechercher via les slugs en BDD et on écrase systématiquement l'objet, pour être sûr de l'avoir à jour.
    for (let notebook of cart.notebooks) {
      this.subscriptions.push(
        this.apiRequests.getNotebookBySlug(notebook.item.slug).subscribe({
          next: (notebookDto: NotebookDto): void => {
            if (!this.objectUtils.compareNotebook(notebookDto, notebook.item)) {
              notebook.item = notebookDto;
              this.shoppingCart.editCartInLocalStorage(cart);
              this.modalSignal.showModal(MESSAGE_ITEM_CHANGE, false).subscribe();
            }
          },
          error: (err): void => this.anguilleSignal.changeMessage(err.error.message)
        })
      )
    }

    for (let inscription of cart.inscriptions) {
      this.subscriptions.push(
        this.apiRequests.getInscriptionBySlug(inscription.item.slug).subscribe({
          next: (inscriptionDto: InscriptionDto): void => {
            if (!this.objectUtils.compareInscription(inscriptionDto, inscription.item)) {
              inscription.item = inscriptionDto;
              this.shoppingCart.editCartInLocalStorage(cart);
              this.modalSignal.showModal(MESSAGE_ITEM_CHANGE, false);
            }
          },
          error: (err): void => {
            this.shoppingCart.deleteItemToShoppingCart(inscription.item, 'inscriptions');
            this.anguilleSignal.changeMessage(err.error.message);
          }
        })
      )
    }
  }
}
