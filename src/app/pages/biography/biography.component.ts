import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
})
export class BiographyComponent {
  titleParentHome = 'Qui suis je ?';
  backgroundImageParentHome = '../../../assets/images/figma/couverture.jpg';

  @ViewChild('imgMonitored') imgMonitored!: ElementRef;

  ngAfterViewInit() {
    const imgElement: HTMLImageElement = this.imgMonitored.nativeElement;

    imgElement.onload = () => {
      document.documentElement.style.setProperty(
        '--height-img-monitored',
        imgElement.offsetHeight + 'px'
      );
      console.log(imgElement.offsetHeight + 'px');

      document.documentElement.style.setProperty(
        '--width-img-monitored',
        imgElement.width + 'px'
      );
    };
  }
}
