import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileInfo } from '../interfaces/FileInfo';
import { IMGBBKEYAPI, URLIMGBBAPI } from '../variables/Other';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {}

  readonly SIZE_MAX: number = 16 * 1048576; /* 1048576 = 1Mo*/
  imageMaterialDefault: string = 'https://i.ibb.co/vDJmDQ9/atelier.jpg'
  imageNotebookDefault: string = 'https://i.ibb.co/PtWCfpG/carnet01.jpg'
  imageActivityDefault: string = 'https://i.ibb.co/R3fBXmH/atelier01.jpg'
  imagePublicationDefault: string = 'https://i.ibb.co/7nXhnLY/publication.jpg'

  fileUpload(newFile: Event): Promise<FileInfo> {
    return new Promise((resolve, reject) => {
      const inputElement = newFile.target as HTMLInputElement;
      const fileSend: File | undefined = inputElement.files?.[0];

      if (fileSend) {
        const formData: FormData = new FormData();
        formData.append('key', IMGBBKEYAPI);
        formData.append('image', fileSend, fileSend.name);
        const headers = new HttpHeaders();

        this.http.post(URLIMGBBAPI, formData, { headers: headers }).subscribe(
          (data: any) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }
}
