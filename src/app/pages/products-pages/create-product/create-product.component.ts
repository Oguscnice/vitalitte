import { Component } from '@angular/core';
import { BaseComponent } from '../../../base.component';

@Component({
  standalone: false,
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent{

  backgroundImageParentHome = '../../../assets/images/figma/couverture.jpg';


}
