import { CreateNotebook } from "src/app/modules/admin/interfaces/Notebook";

export interface NotebookDto extends CreateNotebook {
  slug : string,
  isAvailable : boolean,
}