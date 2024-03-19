import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialDto } from 'src/app/shared/interfaces/Material';

@Injectable({
  providedIn: 'root'
})
export class TransformApiPutService {

  putMateriel(form : FormGroup, slug : MaterialDto['slug']): MaterialDto{
    return {
      ...form.value,
      slug: slug
    }
  }
}
