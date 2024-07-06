import { NgClass, UpperCasePipe, NgFor } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';

@Component({
  standalone: true,
  imports: [ NgClass, UpperCasePipe, NgFor, RouterLink ],
  selector: 'app-news-headband',
  template: `
              <div class="news-headband flex">
                <p class="fixed-text">Actus :</p>
                <div class="rolling-news line-nowrap flex" #newsContainer>
                  @for (section of [0,1,2,3,4,5]; track section) {
                    <div class="section-rolling-news flex space-around">
                      @for (news of publicationsSpotlighted; track news) {
                        <p class="flex pointer" [routerLink]="'/actualites/' + news.slug">
                          {{ news.title | uppercase }}
                          <span [innerHTML]="news.description"></span>
                        </p>
                      }
                    </div>
                  }
                </div>
              </div>
`,
  styleUrls: ['./news-headband.component.scss']
})
export class NewsHeadbandComponent {

  @Input() publicationsSpotlighted! : PublicationDto[];

  private windowSize$ = new Subject<[number, number]>();

  @ViewChild('newsContainer') newsContainer! : ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event): void {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.checkWidthNews();
  }

  ngAfterViewInit(): void {
    this.checkWidthNews();
  }

  private checkWidthNews(): void {
    document.documentElement.style.setProperty('--news-container-width',
    this.newsContainer.nativeElement.offsetWidth + 'px')
  }

}
