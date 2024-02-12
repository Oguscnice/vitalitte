import { Component } from '@angular/core';
import { New } from 'src/app/shared/interfaces/New';
import { NEWS } from 'src/app/shared/variables/news';

@Component({
  selector: 'app-news-headband',
  template: `
              <div class="news-headband flex space-between">
                <p class="fixed-text">Actus :</p>
                <div class="rolling-news flex" >
                  <p *ngFor="let news of newsList;
                      let index = index"
                      class="news-item flex center"
                      [ngClass]="index === newsList.length - 1 ? 'border-right' : ''">
                    {{news.title | uppercase}} : {{news.description}}
                  </p>
              </div>
            </div>`,
  styleUrls: ['./news-headband.component.scss']
})
export class NewsHeadbandComponent {

  newsList : New[] = NEWS

}
