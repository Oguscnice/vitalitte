import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaterialDto } from '../interfaces/Material';
import { URLAPI } from '../variables/others';
import { NotebookDto } from '../interfaces/Notebook';
import { CategoryDto } from '../interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private http: HttpClient) {}

  getAllMaterials(): Observable<MaterialDto[]>{
    return this.http.get<MaterialDto[]>(URLAPI + "/materials")
  }

  getAllMaterialsTypes(): Observable<string[]>{
    return this.http.get<string[]>(URLAPI + "/materials/types")
  }

  getAllNotebooks(): Observable<NotebookDto[]>{
    return this.http.get<NotebookDto[]>(URLAPI + "/notebooks")
  }


  getNotebookBySlug(notebookSlug : NotebookDto['slug']): Observable<NotebookDto>{
    return this.http.get<NotebookDto>(URLAPI + "/notebooks/" + notebookSlug)
  }

  getAllCategories(): Observable<CategoryDto[]>{
    return this.http.get<CategoryDto[]>(URLAPI + "/categories")
  }
  
}
