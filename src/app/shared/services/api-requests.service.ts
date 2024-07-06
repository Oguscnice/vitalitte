import { GoogleReviews, Review } from '../interfaces/GoogleReviews';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaterialDto } from '../interfaces/Material';
import { URLAPI } from '../variables/Others';
import { NotebookDto } from '../interfaces/Notebook';
import { CategoryDto } from '../interfaces/Category';
import { CollectionDto } from '../interfaces/Collection';
import { WorkshopDto } from '../interfaces/Workshop';
import { CreateInscription, InscriptionDto } from '../interfaces/Inscription';
import { ResponseEntity } from '../interfaces/ResponseEntity';
import { PublicationDto } from '../interfaces/Publication';
import {PaginationWithSearchValue} from '../interfaces/Pagination';
import {DeliveryOptionDto} from "../interfaces/DeliveryOptionDto";
import {GiftCardDto} from "../interfaces/GiftCard";

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {

  private http = inject(HttpClient);

  //-------------------
  //-----Matériels-----
  //-------------------
  getAllMaterials(): Observable<MaterialDto[]> {
    return this.http.get<MaterialDto[]>(URLAPI + "/materials")
  }

  getMaterialBySlug(materialSlug: MaterialDto['slug']): Observable<MaterialDto> {
    return this.http.get<MaterialDto>(URLAPI + "/materials/" + materialSlug)
  }

  getAllMaterialsTypes(): Observable<string[]>{
    return this.http.get<string[]>(URLAPI + "/materials/types")
  }

  //-------------------
  //------Carnets------
  //-------------------

  getAllNotebooks(): Observable<NotebookDto[]> {
    return this.http.get<NotebookDto[]>(URLAPI + "/notebooks")
  }

  getNotebookBySlug(notebookSlug : NotebookDto['slug']): Observable<NotebookDto> {
    return this.http.get<NotebookDto>(URLAPI + "/notebooks/" + notebookSlug)
  }

  getNotebooksByCategorySlug(categorySlug : CategoryDto['slug']): Observable<NotebookDto[]> {
    return this.http.get<NotebookDto[]>(URLAPI + "/notebooks/category/" + categorySlug)
  }

  getNotebooksByCollectionSlug(collectionSlug : CollectionDto['slug']): Observable<NotebookDto[]> {
    return this.http.get<NotebookDto[]>(URLAPI + "/notebooks/collection/" + collectionSlug)
  }

  //-------------------
  //-----Catégories----
  //-------------------

  getAllCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(URLAPI + "/categories")
  }

  //-------------------
  //----Collections----
  //-------------------

  getAllCollections(): Observable<CollectionDto[]> {
    return this.http.get<CollectionDto[]>(URLAPI + "/collections")
  }

  //-------------------
  //-----Workshops-----
  //-------------------

  getWorkshopsIsAvailable(value : boolean): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(URLAPI + "/workshops/isAvailable/" + value.toString())
  }

  getWorkshopsByDateToCome(): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(URLAPI + "/workshops/date-to-come")
  }

  getWorkshopsByPastDate(pagination : PaginationWithSearchValue): Observable<WorkshopDto[]> {
    return this.http.post<WorkshopDto[]>(URLAPI + "/workshops/past-date/paginated", pagination)
  }

  getCounterWorkshopsByPastDate(): Observable<number> {
    return this.http.get<number>(URLAPI + "/workshops/past-date/counter")
  }

  getCounterWorkshopInscriptions(workshopSlug : WorkshopDto['slug']): Observable<number> {
    return this.http.get<number>(URLAPI + "/inscriptions/count-by-workshop/" + workshopSlug)
  }

  getWorkshopBySlug(workshopSlug : WorkshopDto['slug']): Observable<WorkshopDto> {
    return this.http.get<WorkshopDto>(URLAPI + "/workshops/" + workshopSlug)
  }

  //-------------------
  //----Inscriptions---
  //-------------------

  postInscription(inscription : CreateInscription): Observable<InscriptionDto> {
    return this.http.post<InscriptionDto>(URLAPI + "/inscriptions", inscription)
  }

  changeQuantityInscription(addOrRemove: 'add-participant' | 'remove-participant',inscription : InscriptionDto): Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(URLAPI + "/inscriptions/" + addOrRemove, inscription)
  }

  confirmInscriptionBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(URLAPI + "/inscriptions/confirm", inscriptionSlug)
  }

  getInscriptionsCounterByWorkshop(workshopDtoSlug : WorkshopDto['slug']): Observable<number> {
    return this.http.get<number>(URLAPI + "/inscriptions/count-by-workshop/" + workshopDtoSlug)
  }

  deleteInscriptionBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/inscriptions/" + inscriptionSlug)
  }

  //-------------------
  //----Publications---
  //-------------------

  getCounterPublications(paginationWithSearchValue: PaginationWithSearchValue): Observable<number> {
    return this.http.post<number>(URLAPI + "/publications/counter", paginationWithSearchValue)
  }

  getPublicationsSpotlighted(value : string): Observable<PublicationDto[]> {
    return this.http.get<PublicationDto[]>(URLAPI + "/publications/isSpotlighted/" + value)
  }

  getPublicationBySlug(publicationSlug : PublicationDto['slug']): Observable<PublicationDto> {
    return this.http.get<PublicationDto>(URLAPI + "/publications/" + publicationSlug)
  }

  getPublicationPaginated(paginationWithSearchValue: PaginationWithSearchValue): Observable<PublicationDto[]> {
    return this.http.post<PublicationDto[]>(URLAPI + "/publications/paginated", paginationWithSearchValue)
  }

  //-------------------
  //-----GiftCards-----
  //-------------------

  checkGiftCard(code : string): Observable<GiftCardDto> {
    return this.http.get<GiftCardDto>(URLAPI + "/giftCards/" + code)
  }

  //-------------------
  //-----Matériels-----
  //-------------------
  getDeliveryOptionAvailable(): Observable<DeliveryOptionDto[]> {
    return this.http.get<DeliveryOptionDto[]>(URLAPI + "/delivery-option/is-available")
  }

  //-------------------
  //--Google-Reviews---
  //-------------------

  private googleAccountId : string = "";
  private googleLocationId : string = "";

  // getGoogleReviews(): Observable<any> {
  getGoogleReviews(): Observable<GoogleReviews[]> {
    return this.http.get<GoogleReviews[]>(`https://mybusiness.googleapis.com/v4/accounts/${this.googleAccountId}/locations/${this.googleLocationId}/reviews`)
  }

  getOneReview(reviewId : number): Observable<any> {
  // getOneReview(reviewId : number): Observable<Review> {
    return this.http.get<Review>(`https://mybusiness.googleapis.com/v4/accounts/${this.googleAccountId}/locations/${this.googleLocationId}/reviews/` + reviewId)
  }
}
