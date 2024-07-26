import {inject, Injectable, signal} from '@angular/core';
import {DataSignalService} from "../../../../shared/services/data-signal.service";
import {AnguilleSignalService} from "../../../../shared/services/anguille-signal.service";
import {AdminReviewSignalState} from "../interfaces/AdminReviewSignalState";
import {ReviewDto} from "../../../../shared/interfaces/Review";
import {BaseComponent} from "../../../../base.component";
import {ApiReviewAdminService} from "./api/api-review-admin.service";

@Injectable({
  providedIn: 'root'
})
export class AdminReviewSignalService extends BaseComponent {

  private apiReviewAdmin = inject(ApiReviewAdminService);
  private dataSignal = inject(DataSignalService);
  private anguilleSignal = inject(AnguilleSignalService);

  private readonly state: AdminReviewSignalState = {
    $privateReviewStatusList: signal<ReviewDto['status'][]>([]),
  }

  public readonly $reviewStatusList = this.state.$privateReviewStatusList.asReadonly();
  private setReviewStatusList(reviewStatus: ReviewDto['status'][]): void {
    this.state.$privateReviewStatusList.set(reviewStatus);
  }

  getAllReviewStatus(): void {
    this.subscriptions.push(
      this.apiReviewAdmin.getAllReviewStatus().subscribe({
        next: (reviewStatus) => this.setReviewStatusList(reviewStatus),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  changeStatus(review: ReviewDto): void {
    this.subscriptions.push(
      this.apiReviewAdmin.changeStatus(review).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message)
          this.dataSignal.getAllReviewsByStatus();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
