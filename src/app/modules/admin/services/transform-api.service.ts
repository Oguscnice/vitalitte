import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateMaterial } from '../interfaces/Material';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CreateNotebook } from '../interfaces/Notebook';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { CreateWorkshop } from '../interfaces/Workshop';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { CreatePublication } from '../interfaces/Publication';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';
import { CreateGiftCard } from '../interfaces/GiftCard';

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

  putWorkshop(form : FormGroup): WorkshopDto{
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

  postPublication(form : FormGroup): CreatePublication{
    return { ...form.value }
  }

  putPublication(form : FormGroup, oldPublication : PublicationDto): PublicationDto{
    return {
      ...form.value,
      createdAt: oldPublication.createdAt,
      spotlighted : oldPublication.spotlighted
    }
  }

  postGiftCard(form : FormGroup, percentage : boolean): CreateGiftCard{
    return {
      ...form.value,
      expiryDate : new Date(form.value.expiryDate),
      isPercentage: percentage
    }
  }
}
