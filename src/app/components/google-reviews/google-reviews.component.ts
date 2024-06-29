import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-google-reviews',
  standalone: true,
  imports: [],
  templateUrl: './google-reviews.component.html',
  styleUrl: './google-reviews.component.scss'
})
export class GoogleReviewsComponent {

  private apiRequestsService = inject(ApiRequestsService);

  ngOnInit(): void {

  }

  getGoogleReviews(): void {
    // this.subscriptions.push(
      this.apiRequestsService.getGoogleReviews().subscribe({
        next: (reviews) => {

        },
        // error: (err) => (this.changeMessage(err.error.message))
      })
    // )
  }
}
