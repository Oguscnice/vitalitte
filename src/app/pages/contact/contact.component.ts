import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseComponent{
  titleParentHome: string = 'Contact';
  backgroundImageParentHome: string =
    '../../../assets/images/figma/contact.jpg';

}
