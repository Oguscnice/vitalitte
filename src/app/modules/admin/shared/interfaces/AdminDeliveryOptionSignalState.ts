import {WritableSignal} from "@angular/core";
import {DeliveryOptionDto} from "../../../../shared/interfaces/DeliveryOptionDto";

export interface AdminDeliveryOptionSignalState {
  $privateDeliveryOptions: WritableSignal<DeliveryOptionDto[]>;
  $privateDeliveryOptionToDelete: WritableSignal<DeliveryOptionDto | null>;
}
