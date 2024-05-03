import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MaterialDto } from '../interfaces/Material';
import { URLAPI } from '../variables/Others';
import { NotebookDto } from '../interfaces/Notebook';
import { CategoryDto } from '../interfaces/Category';
import { CollectionDto } from '../interfaces/Collection';
import { WorkshopDto } from '../interfaces/Workshop';
import { CreateInscription, InscriptionDto } from '../interfaces/Inscription';
import { ResponseEntity } from '../interfaces/ResponseEntity';
import { PublicationDto } from '../interfaces/Publication';

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

  getAllWorkshops(): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(URLAPI + "/workshops")
  }

  getWorkshopsIsAvailable(value : boolean): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(URLAPI + "/workshops/isAvailable/" + value.toString())
  }

  getWorkshopsByDateToCome(): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(URLAPI + "/workshops/date-to-come")
  }

  getWorkshopsByPastDate(pageNumber : number): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(URLAPI + "/workshops/past-date/page-" + pageNumber)
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

  postInscription(inscription : CreateInscription): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(URLAPI + "/inscriptions", inscription)
  }

  confirmInscriptionBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(URLAPI + "/inscriptions/confirm", inscriptionSlug)
  }

  getInscriptionsCounterByWorkshop(workshopDtoSlug : WorkshopDto['slug']): Observable<number> {
    return this.http.get<number>(URLAPI + "/inscriptions/count-by-workshop/" + workshopDtoSlug)
  }

  //-------------------
  //----Publications---
  //-------------------

  getAllPublications(): Observable<PublicationDto[]> {
    return this.http.get<PublicationDto[]>(URLAPI + "/publications")
  }

  getAllPublicationsCounter(): Observable<number> {
    return this.http.get<number>(URLAPI + "/publications/count")
  }

  getPublicationsFilteredCounter(value : string): Observable<number> {
    return this.http.get<number>(URLAPI + "/publications/count/" + value)
  }

  getPublicationsSpotlighted(value : string): Observable<PublicationDto[]> {
    return this.http.get<PublicationDto[]>(URLAPI + "/publications/isSpotlighted/" + value)
  }

  getPublicationBySlug(publicationSlug : PublicationDto['slug']): Observable<PublicationDto> {
    return this.http.get<PublicationDto>(URLAPI + "/publications/" + publicationSlug)
  }

  getPublicationPaginated(pageNumber : number): Observable<PublicationDto[]> {
    return this.http.get<PublicationDto[]>(URLAPI + "/publications/page-" + pageNumber)
  }

  getPublicationPaginatedFiltered(pageNumber : number, value : string): Observable<PublicationDto[]> {
    return this.http.get<PublicationDto[]>(URLAPI + "/publications/page-" + pageNumber + "/" + value)
  }


  //-------------------
  //-----GiftCards-----
  //-------------------

  getIsExpiredGiftCard(code : string): Observable<boolean> {
    return this.http.get<boolean>(URLAPI + "/giftCards/is-expired/" + code)
  }
}
