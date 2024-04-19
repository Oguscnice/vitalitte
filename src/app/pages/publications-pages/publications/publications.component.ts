import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss'
})
export class PublicationsComponent extends BaseComponent {

  private apiRequestsService = inject(ApiRequestsService);
  publications! : PublicationDto[];
  publicationsSpotlightedTrue! : PublicationDto[];

  pageNumber: number = 0;
  counterPublications: number = 0;
  valueSearch : string = "";

  backgroundImageParentHome: string =
    '../../../assets/images/figma/school-work.jpg';

  ngOnInit(): void {
    this.getPublicationPaginated();
    this.getPublicationsSpotlighted();
    this.getCounterAllPublications();
  }

  getPublicationPaginated(): void {
    this.subscriptions.push(
      this.apiRequestsService.getPublicationPaginated(this.pageNumber).subscribe({
        next: (publications) => this.publications = publications,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getPublicationsFiltered(): void {
    this.subscriptions.push(
      this.apiRequestsService.getPublicationPaginatedFiltered(this.pageNumber, this.valueSearch).subscribe({
        next: (publications) => this.publications = publications,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getCounterAllPublications(): void {
    this.subscriptions.push(
      this.apiRequestsService.getAllPublicationsCounter().subscribe({
        next: (counter) => this.counterPublications = counter,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getCounterPublicationsFiltered(): void {
    this.subscriptions.push(
      this.apiRequestsService.getPublicationsFilteredCounter(this.valueSearch).subscribe({
        next: (counter) => this.counterPublications = counter,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getPublicationsSpotlighted(): void {
    this.subscriptions.push(
      this.apiRequestsService.getPublicationsSpotlighted('true').subscribe({
        next: (publications) => this.publicationsSpotlightedTrue = publications,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  calcLastPage(): number {
    return Math.floor(this.counterPublications / 6) + (this.counterPublications % 6 === 0 ? 0 : 1)
  }

  filteredByValueSearch(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueSearch = inputElement.value;
  }

  changePage(choice : 'first' | 'prev' | 'next' | 'last'): void {
    if(choice === 'first') {
      this.pageNumber = 0;
    } else if (choice === 'last') {
      this.pageNumber = this.calcLastPage();
    } else if (choice === 'prev') {
      this.pageNumber -= this.pageNumber < 1 ? 0 : 1
    } else if (choice === 'next') {
      this.pageNumber += this.pageNumber < this.calcLastPage() ? 1 : 0
    }

    this.selectMethod();
  }

  selectMethod(): void {
    if(this.valueSearch){
      this.getCounterPublicationsFiltered();
      this.getPublicationsFiltered();
    } else {
      this.getCounterAllPublications();
      this.getPublicationPaginated();
    }
  }
}
