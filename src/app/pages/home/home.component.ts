import { AddDataSqlService } from '../../shared/services/add-data-sql.service';
import {Component, ElementRef, ViewChild, inject, OnInit, AfterViewInit} from '@angular/core';
import { ImagesPreview } from 'src/app/shared/interfaces/ImagesPreview';
import {DataSignalService} from "../../shared/services/data-signal.service";

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  private dataSignal = inject(DataSignalService);
  reviews$= this.dataSignal.$reviews;
  indexReview: number = 0;
  private addData = inject(AddDataSqlService);

  publicationsSpotlighted$ = this.dataSignal.$publicationsSpotlighted;
  randomReviews$ = this.dataSignal.$reviews;
  backgroundImageParentHome: string =
    '../../../assets/images/figma/school-work.jpg';
  backgroundImageBio: string = '../../../assets/images/loryane.jpg';

  handmadeProductsPictures : ImagesPreview[] = [
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

  ngOnInit(): void {
    this.dataSignal.getPublicationsSpotlighted();
    this.dataSignal.getRandomReviews();
    // this.addData.createAll();
  }

  ngAfterViewInit(): void {
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

  changeReviewDisplay(action: 'minus' | 'more') {
    if (action === 'minus') {
      this.displayPreviousReview();
    } else if (action === 'more') {
      this.displayNextReview();
    }
  }

  private displayPreviousReview(): void {
    if (this.indexReview > 0) {
      this.indexReview--;
    } else {
      this.indexReview = this.reviews$().length - 1;
    }
  }

  private displayNextReview(): void {
    if (this.indexReview < this.reviews$().length - 1) {
      this.indexReview++;
    } else {
      this.indexReview = 0;
    }
  }
}
