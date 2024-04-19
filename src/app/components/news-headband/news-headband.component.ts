import { NgClass, NgFor, UpperCasePipe, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild, inject, input } from '@angular/core';
import { Subject } from 'rxjs';
import { New } from 'src/app/shared/interfaces/New';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { NEWS } from 'src/app/shared/variables/News';

@Component({
  standalone: true,
  imports: [ NgFor, NgIf, NgClass, UpperCasePipe ],
  selector: 'app-news-headband',
  template: ` <div class="news-headband flex" *ngIf="publicationsSpotlighted.length > 0">
                <p class="fixed-text">Actus :</p>
                <div class="rolling-news flex" #newsContainer>
                  <div class="section-rolling-news flex space-around" *ngFor="let section of [0,1,2,3,4,5]">
                    <div *ngFor="let news of publicationsSpotlighted">
                     <p>{{ news.title }} <ng-template [innerHTML]="news.description"></ng-template> </p> 
                    </div>
                  </div>
                </div>
              </div>`,
  styleUrls: ['./news-headband.component.scss']
})
export class NewsHeadbandComponent {

  @Input() publicationsSpotlighted! : PublicationDto[];

  windowSize$ = new Subject<[number, number]>();
  newsList : New[] = NEWS

  @ViewChild('newsContainer') newsContainer! : ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.checkWidthNews();
  }


  ngAfterViewInit(){
    this.checkWidthNews();
  }

  ngOnDestroy() {
    // this.unsubscribeAll()
  }

  private checkWidthNews(){
    document.documentElement.style.setProperty('--news-container-width',
    this.newsContainer.nativeElement.offsetWidth + 'px')
  }

}
