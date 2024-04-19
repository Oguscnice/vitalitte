import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';

@Component({
  selector: 'app-publication-thumbnail',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './publication-thumbnail.component.html',
  styleUrl: './publication-thumbnail.component.scss'
})
export class PublicationThumbnailComponent {
  @Input() publication! : PublicationDto
}
