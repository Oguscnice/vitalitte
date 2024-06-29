import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { ApiRequestsService } from './../../shared/services/api-requests.service';
import {Component, inject, OnInit} from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { MaterialDto } from 'src/app/shared/interfaces/Material';

@Component({
  standalone: true,
  imports: [ TitleCasePipe, DecimalPipe ],
  selector: 'app-choices-personalized-creation',
  templateUrl: './choices-personalized-creation.component.html',
  styles: ['']
})
export class ChoicesPersonalizedCreationComponent {

}
