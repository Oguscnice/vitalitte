import {inject, Injectable, Signal, signal} from '@angular/core';
import {DataSignalService} from "../../../../shared/services/data-signal.service";
import {ApiMaterialAdminService} from "./api/api-material-admin.service";
import {AnguilleSignalService} from "../../../../shared/services/anguille-signal.service";
import {ModalSignalService} from "../../../../shared/services/modal-signal.service";
import {Router} from "@angular/router";
import {AdminMaterialSignalState} from "../interfaces/AdminMaterialSignalState";
import {MaterialDto} from "../../../../shared/interfaces/Material";
import {BaseComponent} from "../../../../base.component";
import {CreateMaterial} from "../interfaces/CreateMaterial";
import {PaginationWithSearchValue} from "../../../../shared/interfaces/Page";
import {BehaviorSubject, Observable} from "rxjs";
import {ResponseEntity} from "../../../../shared/interfaces/ResponseEntity";
import {PaginationSignalService} from "../../../../shared/services/pagination-signal.service";

@Injectable({
  providedIn: 'root'
})
export class AdminMaterialSignalService extends  BaseComponent {

  private dataSignal: DataSignalService = inject(DataSignalService);
  private apiMaterialAdmin: ApiMaterialAdminService = inject(ApiMaterialAdminService);
  private anguilleSignal: AnguilleSignalService = inject(AnguilleSignalService);
  private modalSignal: ModalSignalService = inject(ModalSignalService);
  private paginationSignal = inject(PaginationSignalService);
  private router: Router = inject(Router);

  private readonly state: AdminMaterialSignalState = {
    $privateMaterialToDelete: signal<MaterialDto | null>(null),
    $privateCounterMaterials: new BehaviorSubject<number>(0),
  } as const;

  public readonly $materialToDelete: Signal<MaterialDto | null> = this.state.$privateMaterialToDelete.asReadonly();
  public readonly $counter: Observable<number> = this.state.$privateCounterMaterials.asObservable();

  setMaterialToDelete(value: MaterialDto | null): void {
    this.state.$privateMaterialToDelete.set(value);
  }

  setCounterMaterials(counter: number): void {
    this.state.$privateCounterMaterials.next(counter);
  }

  post(newMaterial : CreateMaterial): void {
    this.subscriptions.push(
      this.apiMaterialAdmin.post(newMaterial).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getAllMaterials();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getPaginatedWithSearchValue(): void {
    this.subscriptions.push(
      this.apiMaterialAdmin.getMaterialsPaginatedBySearchValue(this.paginationSignal.transformToPaginationWithSearchValue()).subscribe({
        next: (page) => {
          this.paginationSignal.setPageInfo(page);
          this.dataSignal.setMaterialList(page.content);
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  put(material : MaterialDto): void {
    this.subscriptions.push(
      this.apiMaterialAdmin.put(material).subscribe({
        next: (res: ResponseEntity): void => {
          const MESSAGE: string = `Matériel : ${material.name} mise à jour avec succès`;

          this.subscriptions.push(
            this.modalSignal.showModal(MESSAGE, false).subscribe({
              next: () => this.router.navigate(['/admin/gestion-des-materiaux']),
              error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
            })
          )
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  changeAvailabilityMaterial(materialToChangeAvailability: MaterialDto): void {
    this.subscriptions.push(
      this.apiMaterialAdmin.changeAvailability(materialToChangeAvailability).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getAllMaterials();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  changeAvailabilityForCustomizationMaterial(material: MaterialDto): void {
    this.subscriptions.push(
      this.apiMaterialAdmin.changeAvailabilityForCustomization(material).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getAllMaterials();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDeleteMaterial(material: MaterialDto): void {
    this.setMaterialToDelete(material);
    const MESSAGE: string = `Confirmez-vous vouloir supprimer le matériel : ${material.name} ?`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice: boolean): void => userChoice ? this.delete() : this.setMaterialToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  delete(): void {
    this.subscriptions.push(
      this.apiMaterialAdmin.delete(this.$materialToDelete()!.slug).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getAllMaterials();
          this.setMaterialToDelete(null);
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
