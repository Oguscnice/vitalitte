import {Injectable, inject, signal, Signal} from '@angular/core';
import { CategoryDto } from '../../../../shared/interfaces/Category';
import { CollectionDto } from '../../../../shared/interfaces/Collection';
import { AdminDataSignalState } from '../interfaces/AdminDataSignalState';
import { SlugNameDto } from '../interfaces/SlugNameDto';
import { NotebookDto } from '../../../../shared/interfaces/Notebook';
import { ApiRequestsService } from '../../../../shared/services/api-requests.service';
import { BaseComponent } from '../../../../base.component';
import { AnguilleSignalService } from '../../../../shared/services/anguille-signal.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDataSignalService extends BaseComponent {

  private apiRequestsService: ApiRequestsService = inject(ApiRequestsService);
  private anguilleSignal: AnguilleSignalService = inject(AnguilleSignalService);

  private readonly stateAdmin: AdminDataSignalState = {
    $privateItemToDelete: signal<SlugNameDto | null>(null),
    $notebooksImpactedByItemToDelete: signal<NotebookDto[]>([])
  } as const;

  public readonly $itemToDelete: Signal<SlugNameDto | null> = this.stateAdmin.$privateItemToDelete.asReadonly();
  public readonly $notebooksImpacted: Signal<NotebookDto[]> = this.stateAdmin.$notebooksImpactedByItemToDelete.asReadonly();

  setItemToDelete(item: SlugNameDto | null): void {
    this.stateAdmin.$privateItemToDelete.set(item);
  }

  setNotebooksImpacted(notebooksImpacted: NotebookDto[]): void {
    this.stateAdmin.$notebooksImpactedByItemToDelete.set(notebooksImpacted);
  }

  getNotebooksByCategorySlug(categorySlug : CategoryDto['slug']): void {
    this.subscriptions.push(
      this.apiRequestsService.getNotebooksByCategorySlug(categorySlug).subscribe({
        next: (notebooks: NotebookDto[]) => this.setNotebooksImpacted(notebooks),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getNotebooksByCollectionSlug(collectionSlug : CollectionDto['slug']): void {
    this.subscriptions.push(
      this.apiRequestsService.getNotebooksByCollectionSlug(collectionSlug).subscribe({
        next: (notebooks: NotebookDto[]) => this.setNotebooksImpacted(notebooks),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
