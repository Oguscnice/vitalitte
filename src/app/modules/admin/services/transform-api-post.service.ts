import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateMaterial } from 'src/app/shared/interfaces/Material';

@Injectable({
  providedIn: 'root'
})
export class TransformApiPostService {

  postMaterielType(form : FormGroup): CreateMaterial{
    return { ...form.value }
  }
}
