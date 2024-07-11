import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NotebookDto } from '../../../../../shared/interfaces/Notebook';
import { VITALITTE_PROJECT } from '../../../../../shared/variables/AppConfig';
import { CreateNotebook } from '../../interfaces/Notebook';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ApiNotebookAdminService {

  private http = inject(HttpClient);

  getAll(): Observable<NotebookDto[]>{
    return this.http.get<NotebookDto[]>(VITALITTE_PROJECT.back.url + "/notebooks")
  }

  post(notebook : CreateNotebook): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(VITALITTE_PROJECT.back.url + "/notebooks", notebook)
  }

  put(notebook : NotebookDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/notebooks/" + notebook.slug, notebook)
  }

  changeAvailability(notebook : NotebookDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/notebooks/availability", notebook)
  }

  delete(notebookSlug : NotebookDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(VITALITTE_PROJECT.back.url + "/notebooks/" + notebookSlug)
  }
}
