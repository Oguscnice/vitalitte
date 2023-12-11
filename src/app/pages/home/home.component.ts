import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  titleParentHome: string = 'Bienvenue';
  backgroundImageParentHome: string =
    '../../../assets/images/figma/school-work.jpg';

  backgroundImageBio: string = '../../../assets/images/loryane.jpg';

  @ViewChild('imgMonitored') imgMonitored!: ElementRef;
  @ViewChild('booktiqueSectionMonitored')
  booktiqueSectionMonitored!: ElementRef;

  ngAfterViewInit() {
    const imgElement: HTMLImageElement = this.imgMonitored.nativeElement;

    imgElement.onload = () => {
      document.documentElement.style.setProperty(
        '--height-img-monitored',
        imgElement.offsetHeight + 'px'
      );

      document.documentElement.style.setProperty(
        '--width-img-monitored',
        imgElement.width + 'px'
      );
    };
  }
}
