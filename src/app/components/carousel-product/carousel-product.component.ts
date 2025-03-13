import {Component, inject, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {ProductDto} from "../../shared/interfaces/Product";
import {FileService} from "../../shared/services/file.service";
import {FileDto} from "../../shared/interfaces/FileDto";

@Component({
  selector: 'app-carousel-product',

  imports: [NgClass],
  templateUrl: './carousel-product.component.html',
  styleUrl: './carousel-product.component.scss'
})
export class CarouselProductComponent implements OnInit {

  @Input({ required : true}) product!: ProductDto;
  fileService = inject(FileService);
  pictureDtoDisplay: FileDto | null = null;

  ngOnInit(): void {
    this.countImages();
    this.selectPicture(this.product.pictureDto);
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

  selectPicture(pictureDto: FileDto): void {
    this.pictureDtoDisplay = pictureDto;
  }

  isPictureDisplay(pictureDto: FileDto): boolean {
    if (this.pictureDtoDisplay) {
      return this.pictureDtoDisplay?.slug === pictureDto.slug;
    }
    return false;
  }
}
