import {Component, inject, OnInit} from '@angular/core';
import {VITALITTE_PROJECT} from "../../../shared/variables/AppConfig";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ratingValidator} from "../../../modules/admin/shared/validators/ratingValidator";
import {NgClass} from "@angular/common";
import {CreateReview} from "../../../shared/interfaces/Review";
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {FormHelperService} from "../../../modules/admin/shared/services/form-helper.service";
import {BaseComponent} from "../../../base.component";
import {ActivatedRoute} from "@angular/router";
import {ProductCommonValuesDto} from "../../../shared/interfaces/Product";

@Component({
  selector: 'app-post-review-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './post-review-form.component.html',
  styles: [`

    @import "src/app/scss/variables.scss";

    .fa-circle-xmark {
      font-size: $max-font-size;
    }
  `]
})
export class PostReviewFormComponent extends BaseComponent implements OnInit {

  protected readonly VITALITTE_PROJECT = VITALITTE_PROJECT;
  private formBuilder = inject(FormBuilder);
  private dataSignal = inject(DataSignalService);
  private formHelper = inject(FormHelperService);
  private route = inject(ActivatedRoute);

  hoveredRating: number = 0;
  product!: ProductCommonValuesDto;

  isFormSubmit: boolean = false;
  isFormVisible: boolean = false;

  postReviewForm = this.formBuilder.group({
    lastname: ['', [Validators.required, Validators.maxLength(255)]],
    firstname: ['', [Validators.required, Validators.maxLength(255)]],
    content: ['', [Validators.required, Validators.maxLength(5000)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    rating: [0, [Validators.required, ratingValidator()]],
    productCommonValuesDto: ['', [Validators.required]]
  });

  ngOnInit(){
    this.findNotebookBySlug();
    this.subscribeToNotebookBySlugSignal();
  }

  private findNotebookBySlug(): void {
    this.route.params.subscribe((params) => this.dataSignal.getNotebookBySlug(params['notebookSlug']));
  }

  private subscribeToNotebookBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$notebookBySlug.subscribe(
        (notebook) => {
          if (notebook) {
            this.product = this.dataSignal.convertToProductDto(notebook);
            this.dataSignal.getAllReviewsByStatus();
            this.addProductToForm();
          }
        })
    )
  }

  private addProductToForm(): void {
    this.formHelper.onValueSelected(this.product, 'productCommonValuesDto', this.postReviewForm);
  }

  onHoverStar(starNumber: number): void {
    this.hoveredRating = starNumber;
  }

  isStarHovered(starNumber: number): boolean {
    return starNumber <= this.hoveredRating;
  }

  onRate(rating: number): void {
    this.postReviewForm.get('rating')!.setValue(rating);
  }

  submitReview(): void {
    this.isFormSubmit = true;
    if (this.postReviewForm.valid) {
      const REVIEW = this.formHelper.formatFormAddValue<CreateReview>(this.postReviewForm, 'productCommonValuesDto');
      this.dataSignal.postReview(REVIEW);
      this.resetAll();
    }
  }

  private resetAll(): void {
    this.isFormVisible = false;
    this.isFormSubmit = false;
    this.postReviewForm.reset();
    this.addProductToForm();
  }
}
