import { AddDataSqlService } from './../../shared/services/add-data-sql.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ImagesPreview } from 'src/app/shared/interfaces/ImagesPreview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent{

  constructor(
    private addData : AddDataSqlService
  ){
    super()
  }

  ngOnInit(): void{
    // this.addData.createAll()
  }

  titleParentHome: string = 'Bienvenue';
  backgroundImageParentHome: string =
    '../../../assets/images/figma/school-work.jpg';

  backgroundImageBio: string = '../../../assets/images/loryane.jpg';

  handmadeNotebooksPictures : ImagesPreview[] = [
      {
        imgSrc : "../../../assets/images/figma/carnet02.jpg",
        imgAlt : "Image d'un carnet fait à la main"},
      {
        imgSrc : "../../../assets/images/figma/carnet.jpeg",
        imgAlt : "Image d'un carnet fait à la main"},
      {
        imgSrc : "../../../assets/images/figma/carnet03.jpg",
        imgAlt : "Image d'un carnet fait à la main"
      },
    ];
  
  workshopPictures : ImagesPreview[] = [
      {
        imgSrc : "../../../assets/images/figma/atelier.jpg",
        imgAlt : "Image d'un carnet fait à la main"},
      {
        imgSrc : "../../../assets/images/figma/atelier02.jpg",
        imgAlt : "Image d'un carnet fait à la main"},
      {
        imgSrc : "../../../assets/images/figma/atelier01.jpg",
        imgAlt : "Image d'un carnet fait à la main"
      },
    ];

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
