import { Injectable } from '@angular/core';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CategoryEditable, MaterialEditable } from '../interfaces/EditableObject';
import { CategoryDto } from 'src/app/shared/interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class TransformToEditableService {

  materialsDtoToEditable(materialsDto : MaterialDto[]): MaterialEditable[]{
    return materialsDto.map(materialDto => ({
        ...materialDto,
        canEdit: false
      }));
  }
  categoriesDtoToEditable(categoriesDto : CategoryDto[]): CategoryEditable[]{
    return categoriesDto.map(categoryDto => ({
        ...categoryDto,
        canEdit: false
      }));
  }
}
