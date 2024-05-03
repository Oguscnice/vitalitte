import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { WorkshopDto } from '../../../shared/interfaces/Workshop';
import { ApiRequestsService } from '../../../shared/services/api-requests.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent extends BaseComponent {

  private apiRequestsService = inject(ApiRequestsService);

  backgroundImageParent = "../../../assets/images/figma/atelier.jpg";
  workshopsWithDateToCome! : WorkshopDto[];
  workshopsWithPastDate! : WorkshopDto[];
  disponibilities : {workshopSlug : WorkshopDto['slug'], inscriptions : number}[] = []
  pageNumber: number = 0;
  
  private counterWorkshops: number = 0;
  modalVisible : boolean = false;
  modalText! : string;

  ngOnInit(): void {
    this.getWorkshopsByDateToCome();
    this.getWorkshopsByPastDate();
    this.getCounterWorkshopsByPastDate();
  }

  getWorkshopsByDateToCome(): void {
    this.subscriptions.push(
      this.apiRequestsService.getWorkshopsByDateToCome().subscribe({
        next: (workshops) => {

          this.workshopsWithDateToCome = workshops;
          for(let workshop of workshops){
            this.getCounterDisponibilities(workshop.slug);
          }

        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getWorkshopsByPastDate(): void {
    this.subscriptions.push(
      this.apiRequestsService.getWorkshopsByPastDate(this.pageNumber).subscribe({
        next: (workshops) => {
          this.workshopsWithPastDate = workshops;
          for(let workshop of workshops){
            this.getCounterDisponibilities(workshop.slug);
          }
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getCounterWorkshopsByPastDate(): void {
    this.subscriptions.push(
      this.apiRequestsService.getCounterWorkshopsByPastDate().subscribe({
        next: (counter) => this.counterWorkshops = counter,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getCounterDisponibilities(workshopSlugToFind: WorkshopDto['slug']): void {
    if(!this.disponibilities.some(item => item.workshopSlug === workshopSlugToFind)){
      this.subscriptions.push(
        this.apiRequestsService.getCounterWorkshopInscriptions(workshopSlugToFind).subscribe({
          next: (counter) => this.disponibilities.push({workshopSlug : workshopSlugToFind, inscriptions : counter}),
          error: (err) => (this.changeMessage(err.error.message))
        })
      )
    }
  }

  changePage(choice : 'first' | 'prev' | 'next' | 'last'): void {
    if(choice === 'first') {
      this.pageNumber = 0;
    } else if (choice === 'last') {
      this.pageNumber = this.calcLastPage() - 1;
    } else if (choice === 'prev') {
      this.pageNumber -= this.pageNumber < 1 ? 0 : 1
    } else if (choice === 'next') {
      this.pageNumber += this.pageNumber < this.calcLastPage() - 1 ? 1 : 0
    }
    this.getWorkshopsByPastDate();
  }

  calcLastPage(): number {
    return Math.floor(this.counterWorkshops / 6) + (this.counterWorkshops % 6 === 0 ? 0 : 1)
  }

  inscriptionsReservedByWorkshopSlug(workshopSlug: WorkshopDto['slug']): number {
    for(let item of this.disponibilities){
      if(item.workshopSlug === workshopSlug){
        return item.inscriptions;
      }
    }
    return 0;
  }

  responseForModal(response: boolean): void {
    this.modalVisible = false;
  }

}
