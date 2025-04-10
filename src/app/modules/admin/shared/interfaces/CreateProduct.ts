import { CategoryDto } from "../../../../shared/interfaces/Category";
import { CollectionDto } from "../../../../shared/interfaces/Collection";
import { MaterialDto } from "../../../../shared/interfaces/Material";
import {FileDto} from "../../../../shared/interfaces/FileDto";

export interface CreateProduct {
  name: string,
  pictureDto: FileDto,
  price: number,
  description: string,
  introduction: string,
  secondaryPicturesDto: FileDto[],
  materialsDto: MaterialDto[],
  categoryDto: CategoryDto,
  collectionDto: CollectionDto,
  productType: string,
}
