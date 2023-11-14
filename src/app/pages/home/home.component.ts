import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  titleParentHome: string = 'Bienvenue';
  backgroundImageParentHome: string =
  '../../../assets/images/figma/school-work.jpg';

  titleParentBio: string = 'A propos...';
  backgroundImageParentBio: string =
  '../../../assets/images/figma/woman.jpg';
}
