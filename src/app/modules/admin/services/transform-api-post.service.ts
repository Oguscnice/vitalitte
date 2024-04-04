import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateMaterial } from '../interfaces/Material';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CreateNotebook } from '../interfaces/Notebook';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';

@Injectable({
  providedIn: 'root'
})
export class TransformApiPostService {

  postMaterielType(form : FormGroup): CreateMaterial{
    return { ...form.value }
  }

  postNotebookComponent(
    form : FormGroup,
    materialsDto: MaterialDto[],
    categoryDto: CategoryDto,
    collectionDto : CollectionDto,
    secondaryPictures: CreateNotebook['secondaryPictures']
  ) : CreateNotebook{
    return {
      ...form.value,
      materialsDto: materialsDto,
      categoryDto: categoryDto,
      collectionDto : collectionDto,
      secondaryPictures: secondaryPictures
    }
  }
}
