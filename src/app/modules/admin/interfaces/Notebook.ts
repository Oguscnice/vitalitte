import { CategoryDto } from "src/app/shared/interfaces/Category";
import { MaterialDto } from "src/app/shared/interfaces/Material";

export interface CreateNotebook {
  name : string,
  mainPicture : string,
  introduction : string,
  price : number,
  secondaryPictures : string[],
  description : string,
  materialsDto : MaterialDto[],
  categoryDto : CategoryDto,
}