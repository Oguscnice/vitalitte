import {AfterViewChecked, Component, ElementRef, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../base.component';
import { ProductDto } from '../../../shared/interfaces/Product';
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {MaterialDto} from "../../../shared/interfaces/Material";
import {Subject} from "rxjs";
import {VITALITTE_PROJECT} from "../../../shared/variables/AppConfig";
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";

@Component({
  standalone: false,
  selector: 'app-product-selected',
  templateUrl: './product-selected.component.html',
  styleUrls: ['./product-selected.component.scss']
})
export class ProductSelectedComponent extends BaseComponent implements OnInit, AfterViewChecked {

  private route = inject(ActivatedRoute);
  private dataSignal = inject(DataSignalService)
  private paginationSignal = inject(PaginationSignalService);
  protected readonly VITALITTE_PROJECT = VITALITTE_PROJECT;
  shoppingCart$ = inject(ShoppingCartService);

  productDto: ProductDto | null = null;
  materialSelected: MaterialDto | null = null;
  userChoice: 'presentation' | 'reviews' = 'presentation';
  reviews$= this.dataSignal.$reviews;
  ratingSelected$ = this.paginationSignal.$reviewRating;

  windowSize$ = new Subject<[number, number]>();

  @ViewChild('presentation') presentation!: ElementRef;
  @ViewChild('reviewsSection') reviewsSection!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.adaptSectionHeight();
  }

  ngOnInit(): void {
    this.findProductBySlug();
    this.subscribeToProductBySlugSignal();
    this.paginationSignal.setReviewStatus('Accepté');
    this.dataSignal.getAllReviewsByStatus();
  }

  ngAfterViewChecked(): void {
    this.adaptSectionHeight();
  }

  private findProductBySlug(): void {
    this.route.params.subscribe((params) => this.dataSignal.getProductBySlug(params['productSlug']));
  }

  private subscribeToProductBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$productDtoBySlug.subscribe(
        (product) => {
          this.productDto = product;
          if (product) {
            this.paginationSignal.setReviewProductDto(this.productDto);
            this.dataSignal.getAllReviewsByStatus();
          }
        })
    )
  }

  private adaptSectionHeight(): void {
    if (this.presentation && this.reviewsSection) {
      const MAX_VALUE = this.presentation.nativeElement.offsetHeight > this.reviewsSection.nativeElement.offsetHeight ? this.presentation.nativeElement.offsetHeight : this.reviewsSection.nativeElement.offsetHeight;
      document.documentElement.style.setProperty(
        '--height-actual-page-two-choices',
        MAX_VALUE + 'px'
      );
    }
  }

  onValuePageChange(event: string): void {
    this.dataSignal.getAllReviewsByStatus();
  }

  onClickMaterial(material: MaterialDto): void {
    this.materialSelected = this.materialSelected === material ? null : material;
  }

  filterReviewsByRating(number: number): void {
    const VALUE = number === this.paginationSignal.$reviewRating() ? 0 : number
    this.paginationSignal.setReviewRating(VALUE);
    this.dataSignal.getAllReviewsByStatus();
  }
}
