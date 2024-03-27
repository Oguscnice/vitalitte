import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { URLAPI } from 'src/app/shared/variables/Others';
import { CreateNotebook } from '../interfaces/Notebook';
import { ResponseEntity } from 'src/app/shared/interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ApiNotebookAdminService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<NotebookDto[]>{
    return this.http.get<NotebookDto[]>(URLAPI + "/notebooks")
  }

  post(notebook : CreateNotebook): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/notebooks", notebook)
  }

  put(notebook : NotebookDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/notebooks/" + notebook.slug, notebook)
  }
  
  delete(notebookSlug : NotebookDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/notebooks/" + notebookSlug)
  }
}
