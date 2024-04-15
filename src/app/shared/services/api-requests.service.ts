import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaterialDto } from '../interfaces/Material';
import { URLAPI } from '../variables/Others';
import { NotebookDto } from '../interfaces/Notebook';
import { CategoryDto } from '../interfaces/Category';
import { CollectionDto } from '../interfaces/Collection';
import { WorkshopDto } from '../interfaces/Workshop';
import { CreateInscription } from '../interfaces/Inscription';
import { ResponseEntity } from '../interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {

  private http = inject(HttpClient);

  getAllMaterials(): Observable<MaterialDto[]>{
    return this.http.get<MaterialDto[]>(URLAPI + "/materials")
  }

  getAllNotebooks(): Observable<NotebookDto[]>{
    return this.http.get<NotebookDto[]>(URLAPI + "/notebooks")
  }

  getNotebookBySlug(notebookSlug : NotebookDto['slug']): Observable<NotebookDto>{
    return this.http.get<NotebookDto>(URLAPI + "/notebooks/" + notebookSlug)
  }

  getNotebooksByCategorySlug(categorySlug : CategoryDto['slug']): Observable<NotebookDto[]>{
    return this.http.get<NotebookDto[]>(URLAPI + "/notebooks/category/" + categorySlug)
  }

  getNotebooksByCollectionSlug(collectionSlug : CollectionDto['slug']): Observable<NotebookDto[]>{
    return this.http.get<NotebookDto[]>(URLAPI + "/notebooks/collection/" + collectionSlug)
  }

  getAllCategories(): Observable<CategoryDto[]>{
    return this.http.get<CategoryDto[]>(URLAPI + "/categories")
  }

  getAllCollections(): Observable<CollectionDto[]>{
    return this.http.get<CollectionDto[]>(URLAPI + "/collections")
  }

  getAllWorkshops(): Observable<WorkshopDto[]>{
    return this.http.get<WorkshopDto[]>(URLAPI + "/workshops")
  }

  getWorkshopBySlug(workshopSlug : WorkshopDto['slug']): Observable<WorkshopDto>{
    return this.http.get<WorkshopDto>(URLAPI + "/workshops/" + workshopSlug)
  }

  postInscription(inscription : CreateInscription): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/inscriptions", inscription)
  }

  getInscriptionsCounterByWorkshop(workshopDtoSlug : WorkshopDto['slug']): Observable<number>{
    return this.http.get<number>(URLAPI + "/inscriptions/count-by-workshop/" + workshopDtoSlug)
  }
  
}
