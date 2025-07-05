import {Injectable} from '@angular/core';
import {FileDto, ImageDefault} from "../interfaces/FileDto";
import {from, map, Observable, switchMap} from "rxjs";
import {UTAIDA_PROJECT} from "../variables/AppConfig";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private allMimeTypes = ['jpg', 'jpeg', 'png', 'bmp', 'svg', 'webp'];
  picture: FileDto | null = null;
  secondaryPictures: FileDto[] | null = null;
  readonly imageMaterialDefault: ImageDefault = {
    url: UTAIDA_PROJECT.front.urlImgDefault.material,
    fileName: 'atelier.jpg'
  };
  readonly imageProductDefault: ImageDefault = {
    url: UTAIDA_PROJECT.front.urlImgDefault.product,
    fileName: 'carnet01.jpg'
  };

  readonly imageWorkshopDefault: ImageDefault = {
    url: UTAIDA_PROJECT.front.urlImgDefault.workshop,
    fileName: 'atelier01.jpg'
  };

  readonly imagePublicationDefault: ImageDefault = {
    url: UTAIDA_PROJECT.front.urlImgDefault.publication,
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
      map(base64String => {
        const fileDto: FileDto = {
          slug: "",
          fileData: base64String.split(',')[1],
          fileName: imageDefault.fileName
        };
        this.picture = fileDto;
        return fileDto;
      })
    );
  }

  onFileChange(event: Event, mainOrSecondaryPicture: 'picture' | 'secondaryPicture', updatePictureBySlug?: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const PICTURE = {
          slug: updatePictureBySlug ?? "",
          fileName: file.name,
          fileData: (e.target?.result as string).split(',')[1]
        }
        if (mainOrSecondaryPicture === 'picture') {
          this.picture = PICTURE;
        } else if (mainOrSecondaryPicture === 'secondaryPicture') {
          if (this.secondaryPictures === null) {
            this.secondaryPictures = [];
          }
          this.addOrDeleteSecondaryPicture(PICTURE);
        }
      };
      reader.readAsDataURL(file);
      if (updatePictureBySlug) {

      }
    }
  }

  addOrDeleteSecondaryPicture(secondaryPicture: FileDto): void {
    if (!this.secondaryPictures && this.secondaryPictures === null) {
      this.secondaryPictures = [];
    }

    if (!this.secondaryPictures.some(fileDto => fileDto.fileName === secondaryPicture.fileName)) {
      this.secondaryPictures.push(secondaryPicture)
    } else {
      this.secondaryPictures = this.secondaryPictures.filter(fileDto => fileDto.fileName !== secondaryPicture.fileName);
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
    this.picture = null;
    this.secondaryPictures = null;
  }

  // Pour le add-data-sql
  urlToFile(url: string, filename: string): Observable<FileDto> {
    return from(fetch(url).then(response => response.blob())).pipe(
      switchMap(blob => {
        const reader = new FileReader();
        return new Observable<FileDto>(observer => {
          reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            observer.next({
              slug: "",
              fileData: base64String,
              fileName: filename
            });
            observer.complete();
          };
          reader.onerror = error => observer.error(error);
          reader.readAsDataURL(blob);
        });
      })
    );
  }
}
