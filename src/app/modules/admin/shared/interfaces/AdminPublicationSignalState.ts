import {WritableSignal} from "@angular/core";
import {PublicationDto} from "../../../../shared/interfaces/Publication";

export interface AdminPublicationSignalState {
  $privatePublicationToDelete: WritableSignal<PublicationDto | null>;
}
