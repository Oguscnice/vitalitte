import {CategoryDto} from "./Category";
import {CollectionDto} from "./Collection";

export interface CategoryDtoAndCollectionDto {
  categoryDto: CategoryDto | null,
  collectionDto: CollectionDto | null
}

export const EMPTY_CATEGORY_DTO_AND_COLLECTION_DTO = {
  categoryDto: null,
  collectionDto: null
}
