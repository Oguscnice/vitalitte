import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { ApiRequestsService } from './../../shared/services/api-requests.service';
import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { MaterialDto } from 'src/app/shared/interfaces/Material';

@Component({
  standalone: true,
  imports: [ TitleCasePipe, DecimalPipe ],
  selector: 'app-choices-personalized-creation',
  templateUrl: './choices-personalized-creation.component.html',
  styles: ['']
})
export class ChoicesPersonalizedCreationComponent extends BaseComponent {

  private apiRequestsService = inject(ApiRequestsService);

  materials! : MaterialDto[];

  ngOnInit(): void{
    this.geAllMaterials()
  }

  logSelectedValue(possibilityName: string, itemName : any) {
      console.log("Option sélectionnée pour", possibilityName + " // event : " + itemName);
  }

  geAllMaterials(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllMaterials().subscribe({
        next: (materials) => this.materials = materials,
        error: (err) => (this.messageResponseFromBackend = err.error.message)
      })
    )
  }  
}
