import { ApiRequestsService } from './../../shared/services/api-requests.service';
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { MaterialDto } from 'src/app/shared/interfaces/Material';

@Component({
  selector: 'app-choices-personalized-creation',
  templateUrl: './choices-personalized-creation.component.html',
  styleUrls: ['./choices-personalized-creation.component.scss']
})
export class ChoicesPersonalizedCreationComponent extends BaseComponent {

  constructor(
    private apiRequestsService : ApiRequestsService
    ){
      super()
    }

  materials! : MaterialDto[];

  ngOnInit(): void{
    this.geAllMaterials()
  }

  ngOnDestroy() {
    this.unsubscribeAll();
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
