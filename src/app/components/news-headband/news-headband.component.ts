import { NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { New } from 'src/app/shared/interfaces/New';
import { NEWS } from 'src/app/shared/variables/News';

@Component({
  standalone: true,
  imports: [ NgFor, NgClass, UpperCasePipe ],
  selector: 'app-news-headband',
  template: ` <div class="news-headband flex">
                <p class="fixed-text">Actus :</p>
                <div class="rolling-news flex center space-between">

                  <i class="fa-solid fa-circle-left" (click)="changeNews('previous')"></i>

                  <p>
                    {{newsList[index].title | uppercase}} : {{newsList[index].description}}
                  </p>

                  <i class="fa-solid fa-circle-right" (click)="changeNews('next')"></i>

                </div>
              </div>`,
  styleUrls: ['./news-headband.component.scss']
})
export class NewsHeadbandComponent {

  newsList : New[] = NEWS
  index = 0;

  changeNews(changement : 'previous' | 'next'): void{
    if(changement === 'previous'){
      if(this.index === 0){
        this.index = this.newsList.length -1
      } else {
        this.index -= 1
      }
    }else if(changement === 'next'){
      if(this.index === this.newsList.length -1){
        this.index = 0
      } else {
        this.index += 1
      }
    }
  }
}
