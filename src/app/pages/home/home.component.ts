import { AddDataSqlService } from './../../shared/services/add-data-sql.service';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ImagesPreview } from 'src/app/shared/interfaces/ImagesPreview';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent{

  private apiRequestsService = inject(ApiRequestsService);
  private addData = inject(AddDataSqlService);

  publicationsSpotlighted! : PublicationDto[];
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

  ngOnInit(): void{
    this.getPublicationsSpotlighted();
    // this.addData.createAll();
  }

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

  getPublicationsSpotlighted(): void {
    this.subscriptions.push(
      this.apiRequestsService.getPublicationsSpotlighted('true').subscribe({
        next: (publicationsSpotlighted) => {
          this.publicationsSpotlighted = publicationsSpotlighted;
          for(let publication of this.publicationsSpotlighted){
            if(publication.title.length > 50){
              publication.title = publication.title.slice(0, 50) + "..."
            } 
            if(publication.description.length > 50){
              publication.description = publication.description.slice(0, 50) + "..."
            } 
          } 
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
