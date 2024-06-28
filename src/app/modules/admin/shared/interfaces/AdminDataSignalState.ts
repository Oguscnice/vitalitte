import { WritableSignal } from "@angular/core";
import { SlugNameDto } from "./SlugNameDto";
import { NotebookDto } from "../../../../shared/interfaces/Notebook";

export interface AdminDataSignalState {
  $privateItemToDelete: WritableSignal<SlugNameDto | null>;
  $notebooksImpactedByItemToDelete: WritableSignal<NotebookDto[]>;
}
