import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateMaterial } from '../interfaces/Material';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CreateNotebook } from '../interfaces/Notebook';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { CreateWorkshop } from '../interfaces/Workshop';

@Injectable({
  providedIn: 'root'
})
export class TransformApiService {

  postMaterielType(form : FormGroup): CreateMaterial{
    return { ...form.value }
  }

  postWorkshop(form : FormGroup): CreateWorkshop{
    return { ...form.value }
  }

  postNotebook(
    form : FormGroup,
    materialsDto: MaterialDto[],
    categoryDto: CategoryDto,
    collectionDto : CollectionDto,
    secondaryPictures: CreateNotebook['secondaryPictures']
  ) : CreateNotebook {
    return {
      ...form.value,
      materialsDto: materialsDto,
      categoryDto: categoryDto,
      collectionDto : collectionDto,
      secondaryPictures: secondaryPictures
    }
  }

  putNotebook(
    form : FormGroup,
    materialsDto: MaterialDto[],
    categoryDto: CategoryDto,
    collectionDto : CollectionDto,
    secondaryPictures: CreateNotebook['secondaryPictures'],
    isAvailable : boolean
  ) : NotebookDto{
    return {
      ...form.value,
      materialsDto: materialsDto,
      categoryDto: categoryDto,
      collectionDto : collectionDto,
      secondaryPictures: secondaryPictures,
      available : isAvailable
    }
  }

  putMateriel(form : FormGroup, slug : MaterialDto['slug']): MaterialDto{
    return {
      ...form.value,
      slug: slug
    }
  }
}
