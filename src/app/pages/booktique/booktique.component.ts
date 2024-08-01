import {AfterViewChecked, Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {PaginationSignalService} from "../../shared/services/pagination-signal.service";

@Component({
  standalone: false,
  selector: 'app-booktique',
  templateUrl: './booktique.component.html',
  styleUrls: ['./booktique.component.scss'],
})
export class BooktiqueComponent implements AfterViewChecked {

  backgroundImageParentHome: string = '../../../assets/images/figma/booktique.jpg';
  userChoice: 'models' | 'handmades' = 'models';

  windowSize$ = new Subject<[number, number]>();

  @ViewChild('models') models!: ElementRef;
  @ViewChild('handmades') handmades!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.adaptSectionHeight();
  }

  ngAfterViewChecked(): void {
    this.adaptSectionHeight();
  }

  adaptSectionHeight(): void {
    const MAX_VALUE = this.models.nativeElement.offsetHeight > this.handmades.nativeElement.offsetHeight ? this.models.nativeElement.offsetHeight : this.handmades.nativeElement.offsetHeight;
    document.documentElement.style.setProperty(
      '--height-actual-page-two-choices',
      MAX_VALUE + 'px'
    );
  }

  userChoiceSelected(choice : 'models' | 'handmades'): void {
    this.userChoice = choice;
  }
}
