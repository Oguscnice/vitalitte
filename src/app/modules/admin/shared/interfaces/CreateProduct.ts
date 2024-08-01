import { CategoryDto } from "../../../../shared/interfaces/Category";
import { CollectionDto } from "../../../../shared/interfaces/Collection";
import { MaterialDto } from "../../../../shared/interfaces/Material";
import { SecondaryPictureDto } from "../../../../shared/interfaces/SecondaryPicture";

export interface CreateProduct {
  name: string,
  picture: string,
  pictureThumbnail: string,
  price: number,
  description: string,
  introduction: string,
  secondaryPicturesDto: SecondaryPictureDto[],
  materialsDto: MaterialDto[],
  categoryDto: CategoryDto,
  collectionDto: CollectionDto,
  productType: string,
}
