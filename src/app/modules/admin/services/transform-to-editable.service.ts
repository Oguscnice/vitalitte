import { Injectable } from '@angular/core';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { MaterialEditable } from '../interfaces/EditableObject';

@Injectable({
  providedIn: 'root'
})
export class TransformToEditableService {

  materialDtoToEditable(materialsDto : MaterialDto[]): MaterialEditable[]{
    return materialsDto.map(material => ({
        ...material,
        canEdit: false
      }));
  }
}
