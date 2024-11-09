import {Injectable} from '@angular/core';
import {FileDto} from "../interfaces/FileDto";
import {from, map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private allMimeTypes = ['jpg', 'jpeg', 'png', 'bmp', 'svg', 'webp'];
  picture: FileDto | null = null;
  pictureUrl: string | ArrayBuffer | null | undefined = null;
  readonly imageMaterialDefault: ImageDefault = {
    url: 'https://i.ibb.co/vDJmDQ9/atelier.jpg',
    fileName: 'atelier.jpg'
  };
  readonly imageProductDefault: ImageDefault = {
    url: 'https://i.ibb.co/PtWCfpG/carnet01.jpg',
    fileName: 'carnet01.jpg'
  };

  readonly imageActivityDefault: ImageDefault = {
    url: 'https://i.ibb.co/R3fBXmH/atelier01.jpg',
    fileName: 'atelier01.jpg'
  };

  readonly imagePublicationDefault: ImageDefault = {
    url: 'https://i.ibb.co/7nXhnLY/publication.jpg',
    fileName: 'publication.jpg'
  };

  patchImage(imageDefault: ImageDefault): Observable<FileDto> {
    return from(fetch(imageDefault.url)).pipe(
      switchMap(response => from(response.blob())),
      switchMap(blob => {
        const reader = new FileReader();
        return new Observable<string>(observer => {
          reader.onloadend = () => {
            observer.next(reader.result as string);
            observer.complete();
          };
          reader.onerror = error => observer.error(error);
          reader.readAsDataURL(blob);
        });
      }),
      map(base64String => ({
        slug: "",
        fileData: base64String.split(',')[1],
        fileName: imageDefault.fileName
      }))
    );
  }

  onFileChange(event: Event, mainOrSecondaryPicture: 'picture' | 'secondaryPicture', updatePictureBySlug?: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.pictureUrl = e.target?.result;
        const base64String = (e.target?.result as string).split(',')[1];

        if (mainOrSecondaryPicture === 'picture') {
          this.picture = {
            slug: updatePictureBySlug ?? "",
            fileName: file.name,
            fileData: base64String
          };
        } else if (mainOrSecondaryPicture === 'secondaryPicture') {
          // this.mainFile = file;
        }
      };
      reader.readAsDataURL(file);
      if (updatePictureBySlug) {

      }
    }
  }

  getAllTypeAccepted(): string {
    const types_Adapted = this.allMimeTypes.map((type) => '.' + type);
    return types_Adapted.join(', ');
  }

  private getImageMimeType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return "data:image/" + (extension ?? 'png') + ";base64,";
  }

  getDataForImageSrc(fileDto: FileDto): string {
    return this.getImageMimeType(fileDto.fileName) + fileDto.fileData;
  }

  resetAllValues(): void {
    this.pictureUrl = null;
    this.picture = null;
  }
}

export interface ImageDefault {
  url: string;
  fileName: string;
}
