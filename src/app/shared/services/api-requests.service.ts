import { GoogleReviews, Review } from '../interfaces/GoogleReviews';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaterialDto } from '../interfaces/Material';
import { NotebookDto } from '../interfaces/Notebook';
import { CategoryDto } from '../interfaces/Category';
import { CollectionDto } from '../interfaces/Collection';
import { WorkshopDto } from '../interfaces/Workshop';
import { CreateInscription, InscriptionDto } from '../interfaces/Inscription';
import { ResponseEntity } from '../interfaces/ResponseEntity';
import { PublicationDto } from '../interfaces/Publication';
import {Page, PaginationReviewsFiltered, PaginationWithSearchValue} from '../interfaces/Page';
import {DeliveryOptionDto} from "../interfaces/DeliveryOptionDto";
import {GiftCardDto} from "../interfaces/GiftCard";
import {VITALITTE_PROJECT} from "../variables/AppConfig";
import {CategoryAndCollection} from "../interfaces/CategoryAndCollection";
import {CreateReview, ReviewDto} from "../interfaces/Review";

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {

  private http = inject(HttpClient);

  //-------------------
  //-----Matériels-----
  //-------------------

  getAllMaterials(): Observable<MaterialDto[]> {
    return this.http.get<MaterialDto[]>(VITALITTE_PROJECT.back.url + "/materials")
  }

  getMaterialBySlug(materialSlug: MaterialDto['slug']): Observable<MaterialDto> {
    return this.http.get<MaterialDto>(VITALITTE_PROJECT.back.url + "/materials/" + materialSlug)
  }

  getAllMaterialsTypes(): Observable<string[]>{
    return this.http.get<string[]>(VITALITTE_PROJECT.back.url + "/materialTypes")
  }

  //-------------------
  //------Carnets------
  //-------------------

  getAllNotebooks(): Observable<NotebookDto[]> {
    return this.http.get<NotebookDto[]>(VITALITTE_PROJECT.back.url + "/notebooks")
  }

  getNotebookBySlug(notebookSlug : NotebookDto['slug']): Observable<NotebookDto> {
    return this.http.get<NotebookDto>(VITALITTE_PROJECT.back.url + "/notebooks/" + notebookSlug)
  }

  getNotebooksByCategorySlug(categorySlug: CategoryDto['slug']): Observable<NotebookDto[]> {
    return this.http.get<NotebookDto[]>(VITALITTE_PROJECT.back.url + "/notebooks/category/" + categorySlug)
  }

  getNotebooksByCollectionSlug(collectionSlug: CollectionDto['slug']): Observable<NotebookDto[]> {
    return this.http.get<NotebookDto[]>(VITALITTE_PROJECT.back.url + "/notebooks/collection/" + collectionSlug)
  }

  getNotebooksByCategoryAndCollection(categoryAndCollection: CategoryAndCollection): Observable<NotebookDto[]> {
    return this.http.post<NotebookDto[]>(VITALITTE_PROJECT.back.url + "/notebooks/filtered-by-category-collection", categoryAndCollection)
  }

  //-------------------
  //-----Catégories----
  //-------------------

  getAllCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(VITALITTE_PROJECT.back.url + "/categories")
  }

  //-------------------
  //----Collections----
  //-------------------

  getAllCollections(): Observable<CollectionDto[]> {
    return this.http.get<CollectionDto[]>(VITALITTE_PROJECT.back.url + "/collections")
  }

  //-------------------
  //-----Workshops-----
  //-------------------

  getWorkshopsIsAvailable(value : boolean): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(VITALITTE_PROJECT.back.url + "/workshops/is-available/" + value.toString())
  }

  getWorkshopsByDateToCome(): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(VITALITTE_PROJECT.back.url + "/workshops/date-to-come")
  }

  getWorkshopsByPastDate(pagination : PaginationWithSearchValue): Observable<Page<WorkshopDto>> {
    return this.http.post<Page<WorkshopDto>>(VITALITTE_PROJECT.back.url + "/workshops/past-date/paginated", pagination)
  }

  getCounterWorkshopInscriptions(workshopSlug : WorkshopDto['slug']): Observable<number> {
    return this.http.get<number>(VITALITTE_PROJECT.back.url + "/inscriptions/count-by-workshop/" + workshopSlug)
  }

  getWorkshopBySlug(workshopSlug : WorkshopDto['slug']): Observable<WorkshopDto> {
    return this.http.get<WorkshopDto>(VITALITTE_PROJECT.back.url + "/workshops/" + workshopSlug)
  }

  //-------------------
  //----Inscriptions---
  //-------------------

  postInscription(inscription : CreateInscription): Observable<InscriptionDto> {
    return this.http.post<InscriptionDto>(VITALITTE_PROJECT.back.url + "/inscriptions", inscription)
  }

  changeQuantityInscription(addOrRemove: 'add-participant' | 'remove-participant',inscription : InscriptionDto): Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/inscriptions/" + addOrRemove, inscription)
  }

  confirmInscriptionBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/inscriptions/confirm", inscriptionSlug)
  }

  getInscriptionBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<InscriptionDto> {
    return this.http.get<InscriptionDto>(VITALITTE_PROJECT.back.url + "/inscriptions/" + inscriptionSlug)
  }

  deleteInscriptionBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(VITALITTE_PROJECT.back.url + "/inscriptions/" + inscriptionSlug)
  }

  //-------------------
  //----Publications---
  //-------------------

  getPublicationsSpotlighted(value : string): Observable<PublicationDto[]> {
    return this.http.get<PublicationDto[]>(VITALITTE_PROJECT.back.url + "/publications/isSpotlighted/" + value)
  }

  getPublicationBySlug(publicationSlug : PublicationDto['slug']): Observable<PublicationDto> {
    return this.http.get<PublicationDto>(VITALITTE_PROJECT.back.url + "/publications/" + publicationSlug)
  }

  getPublicationPaginated(paginationWithSearchValue: PaginationWithSearchValue): Observable<Page<PublicationDto>> {
    return this.http.post<Page<PublicationDto>>(VITALITTE_PROJECT.back.url + "/publications/paginated", paginationWithSearchValue)
  }

  //-------------------
  //-----GiftCards-----
  //-------------------

  checkGiftCard(code : string): Observable<GiftCardDto> {
    return this.http.get<GiftCardDto>(VITALITTE_PROJECT.back.url + "/giftCards/user/" + code)
  }

  //-------------------
  //-----Matériels-----
  //-------------------

  getDeliveryOptionAvailable(): Observable<DeliveryOptionDto[]> {
    return this.http.get<DeliveryOptionDto[]>(VITALITTE_PROJECT.back.url + "/delivery-option/is-available")
  }

  //-------------------
  //------Reviews------
  //-------------------

  postReview(review: CreateReview): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(VITALITTE_PROJECT.back.url + "/reviews", review)
  }

  getReviewsByStatus(paginationReviewsFiltered: PaginationReviewsFiltered): Observable<Page<ReviewDto>> {
    return this.http.post<Page<ReviewDto>>(VITALITTE_PROJECT.back.url + "/reviews/paginated", paginationReviewsFiltered)
  }

  // //-------------------
  // //--Google-Reviews---
  // //-------------------
  //
  // private googleAccountId : string = "";
  // private googleLocationId : string = "";
  //
  // // getGoogleReviews(): Observable<any> {
  // getGoogleReviews(): Observable<GoogleReviews[]> {
  //   return this.http.get<GoogleReviews[]>(`https://mybusiness.googleapis.com/v4/accounts/${this.googleAccountId}/locations/${this.googleLocationId}/reviews`)
  // }
  //
  // getOneReview(reviewId : number): Observable<any> {
  // // getOneReview(reviewId : number): Observable<Review> {
  //   return this.http.get<Review>(`https://mybusiness.googleapis.com/v4/accounts/${this.googleAccountId}/locations/${this.googleLocationId}/reviews/` + reviewId)
  // }
}
