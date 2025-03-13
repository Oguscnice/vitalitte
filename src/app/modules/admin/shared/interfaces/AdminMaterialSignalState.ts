import {MaterialDto} from "../../../../shared/interfaces/Material";
import {WritableSignal} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export interface AdminMaterialSignalState {
  $privateMaterialToDelete: WritableSignal<MaterialDto | null>;
  $privateCounterMaterials: BehaviorSubject<number>;
  $privateMaterialBySlug: BehaviorSubject<MaterialDto | null>;
}
