
import { CategoryDto } from "src/app/shared/interfaces/Category";
import { MaterialDto } from "src/app/shared/interfaces/Material";

export interface MaterialEditable extends MaterialDto{
  canEdit? : boolean
}

export interface CategoryEditable extends CategoryDto {
  canEdit?: boolean;
}

// export interface NotebookEditable extends Not{
//   canEdit? : boolean
// }

// export interface MaterialEditable extends MaterialDto{
//   canEdit? : boolean
// }