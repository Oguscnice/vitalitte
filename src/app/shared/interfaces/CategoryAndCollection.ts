import {CategoryDto} from "./Category";
import {CollectionDto} from "./Collection";

export interface CategoryAndCollection {
  category: CategoryDto | null,
  collection: CollectionDto | null
}
