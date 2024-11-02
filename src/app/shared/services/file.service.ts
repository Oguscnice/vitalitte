import { Injectable } from '@angular/core';
import {FileDto} from "../interfaces/FileDto";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private allMimeTypes = ['jpg', 'jpeg', 'png', 'bmp', 'svg', 'webp'];
  picture: FileDto | null = null;
  pictureUrl: string | ArrayBuffer | null | undefined = null;

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

  getImageMimeType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return "data:image/" + (extension ?? 'png') + ";base64,";
  }

  resetAllValues(): void {
    this.pictureUrl = null;
    this.picture = null;
  }
}
