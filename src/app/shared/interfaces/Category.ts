import {CreateCategory} from "../../modules/admin/shared/interfaces/CreateCategory";

export interface CategoryDto extends CreateCategory {
  slug: string;
}
