import {Component, inject, OnInit} from '@angular/core';
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {NgClass, SlicePipe, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {VITALITTE_PROJECT} from "../../../shared/variables/AppConfig";

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

  private dataSignal = inject(DataSignalService);
  reviews = this.dataSignal.$reviews;
  indexSelected: number | null = null;

  protected readonly VITALITTE_PROJECT = VITALITTE_PROJECT;

  onReviewSelected(index: number): void {
    this.indexSelected = index === this.indexSelected ? null : index;
  }
}
