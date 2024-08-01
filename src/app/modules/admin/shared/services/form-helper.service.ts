import { CategoryDto } from '../../../../shared/interfaces/Category';
import { Injectable } from '@angular/core';
import { CollectionDto } from '../../../../shared/interfaces/Collection';
import { FormGroup } from '@angular/forms';
import { SecondaryPictureDto } from '../../../../shared/interfaces/SecondaryPicture';
import { MaterialDto } from '../../../../shared/interfaces/Material';
import {ProductDto} from "../../../../shared/interfaces/Product";

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  jsonParse<T>(value: string | null): T | null {
    return value ? JSON.parse(value) : null;
  }

  jsonStringify<T>(value: T): string {
    return value ? JSON.stringify(value) : '';
  }

  onValueSelected<T>(value: T, control: string, form: FormGroup): void {
    form.get(control)!.setValue(this.jsonStringify(value));
  }

  getFormDataGeneriqueArray<T>(form: FormGroup, key: string): T[] {
    const DATA: T[] | null = this.jsonParse<T[]>(form.get(key)?.value);
    return DATA ? DATA : [];
  }

  getDtoNameByFormControlValue<T>(value: string | null): string {
    const DTO_NAME = this.jsonParse<T>(value) as CategoryDto | CollectionDto | MaterialDto;
    return DTO_NAME ? DTO_NAME.name : '';
  }

  formatFormToProductDto<T>(form: FormGroup): T {
    const CATEGORY_DTO: CategoryDto = this.jsonParse(form.get('categoryDto')!.value) as CategoryDto;
    const COLLECTION_DTO: CollectionDto = this.jsonParse(form.get('collectionDto')!.value) as CollectionDto;
    const MATERIALS_DTO: MaterialDto[] = this.jsonParse(form.get('materialsDto')!.value) as MaterialDto[];
    let SECONDARY_PICTURES_DTO: SecondaryPictureDto[] = [];
    if (form.get('secondaryPicturesDto')!.value) {
      SECONDARY_PICTURES_DTO = this.jsonParse(form.get('secondaryPicturesDto')!.value) as SecondaryPictureDto[];
    }

    return {
      ...form.value,
      materialsDto: MATERIALS_DTO,
      categoryDto: CATEGORY_DTO,
      collectionDto : COLLECTION_DTO,
      secondaryPicturesDto: SECONDARY_PICTURES_DTO
    }
  }

  formatFormAddValue<T>(form: FormGroup, key: string): T {
    const PARSED_KEY = this.jsonParse((form.get(key)!.value));
    const DTO: T = {
      ...form.value,
      [key]: PARSED_KEY
    }
    return DTO;
  }

  formatFormToDto<T>(form: FormGroup): T {
    return { ...form.value }
  }
}

export type AllPosibilities = | CategoryDto
                              | CollectionDto
                              | SecondaryPictureDto[]
                              | MaterialDto[]
