import {Component, Input} from '@angular/core';
import {NgClass, SlicePipe, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {VITALITTE_PROJECT} from "../../../shared/variables/AppConfig";
import {ReviewDto} from "../../../shared/interfaces/Review";

@Component({
  selector: 'app-review-thumbnail',
  standalone: true,
  imports: [
    TitleCasePipe,
    SlicePipe,
    UpperCasePipe,
    NgClass
  ],
  templateUrl: './review-thumbnail.component.html',
  styleUrl: './review-thumbnail.component.scss'
})
export class ReviewThumbnailComponent {

  @Input() review!: ReviewDto;
  reviewSelected: null | ReviewDto = null;

  protected readonly VITALITTE_PROJECT = VITALITTE_PROJECT;

  onReviewSelected(reviewDto: ReviewDto): void {
    this.reviewSelected = reviewDto.content === this.reviewSelected?.content ? null : reviewDto;
  }
}
