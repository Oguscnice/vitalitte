import { WritableSignal } from "@angular/core";
import { NotebookDto } from "../../../../shared/interfaces/Notebook";

export interface AdminNotebookSignalState {
  $privateNotebookToDelete: WritableSignal<NotebookDto | null>;
}
