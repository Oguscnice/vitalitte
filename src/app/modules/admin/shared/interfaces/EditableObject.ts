
import { CategoryDto } from "../../../../shared/interfaces/Category";
import { MaterialDto } from "../../../../shared/interfaces/Material";

export interface MaterialEditable extends MaterialDto{
  canEdit? : boolean
}

// export interface NotebookEditable extends Not{
//   canEdit? : boolean
// }

// export interface MaterialEditable extends MaterialDto{
//   canEdit? : boolean
// }
