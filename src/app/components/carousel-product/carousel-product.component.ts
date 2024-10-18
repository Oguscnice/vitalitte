import {Component, Input, OnInit} from '@angular/core';
import {ReviewThumbnailComponent} from "../review/review-thumbnail/review-thumbnail.component";
import {NgClass} from "@angular/common";
import {ProductDto} from "../../shared/interfaces/Product";

@Component({
  selector: 'app-carousel-product',
  standalone: true,
  imports: [
    ReviewThumbnailComponent,
    NgClass
  ],
  templateUrl: './carousel-product.component.html',
  styleUrl: './carousel-product.component.scss'
})
export class CarouselProductComponent implements OnInit {

  @Input({ required : true}) product!: ProductDto;
  urlPictureDisplay: string | null = null;

  ngOnInit(): void {
    this.countImages();
    this.selectPicture(this.product.picture);
  }

  private countImages(): void {
    // on commence à 1 car il y a l'image principale qui est obligatoire
    let counter = 1;

    // on y ajoute le nombre d'images secondaire s'il y a en a
    if (this.product.secondaryPicturesDto.length > 0) {
      counter += this.product.secondaryPicturesDto.length;
    }

    // on ajuste la variable de taille des images en bulle
    document.documentElement.style.setProperty(
      '--width-img-by-counter-image', `calc((100% / ${counter}))`
    );
  }

  selectPicture(urlPicture: string): void {
    this.urlPictureDisplay = urlPicture;
  }

  isPictureDisplay(urlPicture: string): boolean {
    return this.urlPictureDisplay === urlPicture;
  }
}
