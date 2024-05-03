import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WorkshopDto } from '../../shared/interfaces/Workshop';

@Component({
  selector: 'app-workshop-thumbnail',
  standalone: true,
  imports: [ DatePipe, NgClass, RouterLink ],
  templateUrl: './workshop-thumbnail.component.html',
  styleUrl: './workshop-thumbnail.component.scss'
})
export class WorkshopThumbnailComponent {

  private router = inject(Router);
  private currentDate = new Date();

  @Input() workshop! : WorkshopDto;
  @Input() disponibility! : number;


  navigate(workshopClicked : WorkshopDto): void {
    if (workshopClicked.available) {
      this.router.navigate(['/ateliers/' + workshopClicked.slug]);
    }
  }

  isFutureDate(workshopDate: WorkshopDto['date']): boolean {
    return new Date(workshopDate) > this.currentDate;
  }
}
