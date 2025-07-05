import {Component, inject, OnInit} from '@angular/core';
import {UTAIDA_PROJECT} from "../../../shared/variables/AppConfig";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ratingValidator} from "../../../modules/admin/shared/validators/ratingValidator";
import {NgClass} from "@angular/common";
import {CreateReview} from "../../../shared/interfaces/Review";
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {FormHelperService} from "../../../modules/admin/shared/services/form-helper.service";
import {BaseComponent} from "../../../base.component";
import {ActivatedRoute} from "@angular/router";
import {ProductDto} from "../../../shared/interfaces/Product";

@Component({
  selector: 'app-post-review-form',

  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './post-review-form.component.html',
  styles: [`

    @use "../../../scss/variables.scss" as variablesScss;
    @use "../../../scss/buttons.scss";
    @use "../../../scss/forms.scss";

    .fa-circle-xmark {
      font-size: variablesScss.$max-font-size;
    }
  `]
})
export class PostReviewFormComponent extends BaseComponent implements OnInit {

  protected readonly VITALITTE_PROJECT = UTAIDA_PROJECT;
  private formBuilder = inject(FormBuilder);
  private dataSignal = inject(DataSignalService);
  private formHelper = inject(FormHelperService);
  private route = inject(ActivatedRoute);

  hoveredRating: number = 0;
  productDto!: ProductDto;

  isFormSubmit: boolean = false;
  isFormVisible: boolean = false;

  postReviewForm = this.formBuilder.group({
    lastname: ['', [Validators.required, Validators.maxLength(255)]],
    firstname: ['', [Validators.required, Validators.maxLength(255)]],
    content: ['', [Validators.required, Validators.maxLength(5000)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    rating: [0, [Validators.required, ratingValidator()]],
    productDto: ['', [Validators.required]]
  });

  ngOnInit(){
    this.findProductBySlug();
    this.subscribeToProductBySlugSignal();
  }

  private findProductBySlug(): void {
    this.route.params.subscribe((params) => this.dataSignal.getProductBySlug(params['productSlug']));
  }

  private subscribeToProductBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$productDtoBySlug.subscribe(
        (productDto) => {
          if (productDto) {
            this.productDto = productDto;
            this.dataSignal.getAllReviewsByStatus();
            this.addProductToForm();
          }
        })
    )
  }

  private addProductToForm(): void {
    this.formHelper.onValueSelected(this.productDto, 'productDto', this.postReviewForm);
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
      const REVIEW = this.formHelper.formatFormAddValue<CreateReview>(this.postReviewForm, 'productDto');
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
