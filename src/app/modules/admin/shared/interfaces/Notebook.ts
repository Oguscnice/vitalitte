import { CategoryDto } from "../../../../shared/interfaces/Category";
import { CollectionDto } from "../../../../shared/interfaces/Collection";
import { MaterialDto } from "../../../../shared/interfaces/Material";
import { SecondaryPictureDto } from "../../../../shared/interfaces/SecondaryPicture";

export interface CreateNotebook {
  name: string,
  picture: string,
  pictureThumbnail: string,
  introduction: string,
  price: number,
  secondaryPicturesDto: SecondaryPictureDto[],
  description: string,
  materialsDto: MaterialDto[],
  categoryDto: CategoryDto,
  collectionDto: CollectionDto
}
