import { CategoryDto } from "../../../../shared/interfaces/Category";
import { CollectionDto } from "../../../../shared/interfaces/Collection";
import { MaterialDto } from "../../../../shared/interfaces/Material";
import { SecondaryPictureDto } from "../../../../shared/interfaces/SecondaryPicture";
import {ProductCommonValuesDto} from "../../../../shared/interfaces/Product";

export interface CreateNotebook extends ProductCommonValuesDto {
  introduction: string,
  secondaryPicturesDto: SecondaryPictureDto[],
  materialsDto: MaterialDto[],
  categoryDto: CategoryDto,
  collectionDto: CollectionDto
}
