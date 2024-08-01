import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FileInfo } from '../interfaces/FileInfo';
import { FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { BaseComponent } from '../../../../base.component';

const URLIMGBBAPI = 'https://api.imgbb.com/1/upload';
const IMGBBKEYAPI = '49cbf58ff3fbd4e523c118ce8b987119';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService extends BaseComponent {

  private http = inject(HttpClient);

  public readonly SIZE_MAX: number = 16 * 1048576; /* 1048576 = 1Mo*/
  public readonly imageMaterialDefault: string = 'https://i.ibb.co/vDJmDQ9/atelier.jpg'
  public readonly imageMaterialDefaultThumbnail: string = 'https://i.ibb.co/jHLGHWt/atelier.jpg'
  public readonly imageProductDefault: string = 'https://i.ibb.co/PtWCfpG/carnet01.jpg'
  public readonly imageProductDefaultThumbnail: string = 'https://i.ibb.co/ZNgTksz/carnet01.jpg'
  public readonly imageActivityDefault: string = 'https://i.ibb.co/R3fBXmH/atelier01.jpg'
  public readonly imageActivityDefaultThumbnail: string = 'https://i.ibb.co/2vxszQK/atelier01.jpg'
  public readonly imagePublicationDefault: string = 'https://i.ibb.co/7nXhnLY/publication.jpg'
  public readonly imagePublicationDefaultThumbnail: string = 'https://i.ibb.co/GW0mWNx/publication.jpg'

  public fileSize!: number;

  private fileUpload(event: Event): Observable<FileInfo | null> {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    const FILE_SEND: File | undefined = INPUT_ELEMENT.files?.[0];

    if (FILE_SEND) {
      const formData: FormData = new FormData();
      formData.append('key', IMGBBKEYAPI);
      formData.append('image', FILE_SEND, FILE_SEND.name);
      const HEADERS = new HttpHeaders();
      return this.http.post<FileInfo>(URLIMGBBAPI, formData, { headers: HEADERS })
    } else {
      return of(null); // Return an observable with null if no file is selected
    }
  }

  onFileSelected(event: Event, form: FormGroup): Observable<FileInfo | null> {
    return this.fileUpload(event).pipe(
      map(fileInfo => {
        if (fileInfo) {
          this.setImages(form, fileInfo);
        }
        return fileInfo;
      })
    );
  }

  private setImages(form: FormGroup, fileInfo : FileInfo): void {

    const pictureUrl = fileInfo.data.display_url;
    let pictureUrlThumbnail;

    // Si le retour d'imgBB contient une miniature on la mets
    if (fileInfo.data.thumb.url) {
      pictureUrlThumbnail = fileInfo.data.thumb.url;
    // Sinon si le retour contient une moyenne on la mets
    } else if (fileInfo.data.medium.url) {
      pictureUrlThumbnail = fileInfo.data.medium.url;
    // Si le retour contient aucune des 2 on met l'image d'origine
    // on couvre toute les possibilités
    } else {
      pictureUrlThumbnail = fileInfo.data.display_url;
    }
    this.patchImage(form, pictureUrl, pictureUrlThumbnail)
  }

  public patchImage(form: FormGroup, urlPicture: string, urlPictureThumbnail: string): void {
    form.get('picture')!.setValue(urlPicture);
    form.get('pictureThumbnail')!.setValue(urlPictureThumbnail);
  }
}
