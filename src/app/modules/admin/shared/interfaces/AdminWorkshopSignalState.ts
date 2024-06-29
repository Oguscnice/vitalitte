import {WritableSignal} from "@angular/core";
import {WorkshopDto} from "../../../../shared/interfaces/Workshop";

export interface AdminWorkshopSignalState {
  $privateWorkshopToDelete: WritableSignal<WorkshopDto | null>;
}
