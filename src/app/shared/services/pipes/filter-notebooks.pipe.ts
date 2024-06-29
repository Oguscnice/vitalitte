import { Pipe, PipeTransform } from '@angular/core';
import {NotebookDto} from "../../interfaces/Notebook";
import {CategoryDto} from "../../interfaces/Category";
import {CollectionDto} from "../../interfaces/Collection";

@Pipe({
  name: 'filterNotebooks',
  standalone: true
})
export class FilterNotebooksPipe implements PipeTransform {

  transform(notebooks: NotebookDto[], categoryDto: CategoryDto | null, collectionDto: CollectionDto | null): NotebookDto[] {
    if (!notebooks) {
      return notebooks;
    }

    if (categoryDto && collectionDto) {
      return notebooks.filter(
        notebook =>
          notebook.categoryDto.slug === categoryDto.slug
          && notebook.collectionDto.slug === collectionDto.slug)
    }

    if (categoryDto) {
      return notebooks.filter(notebook => notebook.categoryDto.slug === categoryDto.slug)
    } else if (collectionDto) {
      return notebooks.filter(notebook => notebook.collectionDto.slug === collectionDto.slug)
    }
    return notebooks;
  }
}
