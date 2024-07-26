import {WritableSignal} from "@angular/core";
import {ReviewDto} from "../../../../shared/interfaces/Review";

export interface AdminReviewSignalState {
  $privateReviewStatusList: WritableSignal<ReviewDto['status'][]>;
}
