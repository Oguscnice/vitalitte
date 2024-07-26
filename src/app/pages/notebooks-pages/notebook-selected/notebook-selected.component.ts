import {AfterViewChecked, Component, ElementRef, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {MaterialDto} from "../../../shared/interfaces/Material";
import {Subject} from "rxjs";
import {FormHelperService} from "../../../modules/admin/shared/services/form-helper.service";
import {VITALITTE_PROJECT} from "../../../shared/variables/AppConfig";
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";

@Component({
  standalone: false,
  selector: 'app-notebook-selected',
  templateUrl: './notebook-selected.component.html',
  styleUrls: ['./notebook-selected.component.scss']
})
export class NotebookSelectedComponent extends BaseComponent implements OnInit, AfterViewChecked {

  private route = inject(ActivatedRoute);
  private dataSignal = inject(DataSignalService)
  private paginationSignal = inject(PaginationSignalService);
  protected readonly VITALITTE_PROJECT = VITALITTE_PROJECT;
  shoppingCart = inject(ShoppingCartService);

  notebook: NotebookDto | null = null;
  reviews= this.dataSignal.$reviews;
  materialSelected: MaterialDto | null = null;
  ratingSelected = this.paginationSignal.$reviewRating;
  userChoice: 'presentation' | 'reviews' = 'presentation';

  windowSize$ = new Subject<[number, number]>();

  @ViewChild('presentation') presentation!: ElementRef;
  @ViewChild('reviewsSection') reviewsSection!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.adaptSectionHeight();
  }

  ngOnInit(){
    this.findNotebookBySlug();
    this.subscribeToNotebookBySlugSignal();
    this.paginationSignal.setReviewStatus('Accepté');
    this.paginationSignal.setReviewRating(0);
    this.dataSignal.getAllReviewsByStatus();
  }

  ngAfterViewChecked(): void {
    this.adaptSectionHeight();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.paginationSignal.setReviewStatus("");
    this.paginationSignal.setReviewProductCommonValuesDto(null);
    this.paginationSignal.setReviewRating(0);
  }

  private findNotebookBySlug(): void {
    this.route.params.subscribe((params) => this.dataSignal.getNotebookBySlug(params['notebookSlug']));
  }

  private subscribeToNotebookBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$notebookBySlug.subscribe(
        (notebook) => {
          this.notebook = notebook;
          if (notebook) {
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
