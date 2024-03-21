import { PostNotebookComponent } from './../components/notebook/post-notebook/post-notebook.component';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateMaterial } from '../interfaces/Material';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CreateNotebook } from '../interfaces/Notebook';

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
    secondaryPictures: CreateNotebook['secondaryPictures']
  ) : CreateNotebook{
    return {
      ...form.value,
      materialsDto: materialsDto,
      categoryDto: categoryDto,
      secondaryPictures: secondaryPictures
    }
  }
}
