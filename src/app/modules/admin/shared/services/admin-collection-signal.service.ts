import { Injectable, inject } from '@angular/core';
import { ApiCollectionAdminService } from './api/api-collection-admin.service';
import { AdminDataSignalService } from './admin-data-signal.service';
import { CollectionDto } from '../../../../shared/interfaces/Collection';
import { BaseComponent } from '../../../../base.component';
import { DataSignalService } from '../../../../shared/services/data-signal.service';
import { AnguilleSignalService } from '../../../../shared/services/anguille-signal.service';
import {ResponseEntity} from "../../../../shared/interfaces/ResponseEntity";
import {ModalSignalService} from "../../../../shared/services/modal-signal.service";

@Injectable({
  providedIn: 'root'
})
export class AdminCollectionSignalService extends BaseComponent {

  private dataSignal: DataSignalService = inject(DataSignalService);
  private adminDataSignal: AdminDataSignalService = inject(AdminDataSignalService);
  private apiCollectionAdmin: ApiCollectionAdminService = inject(ApiCollectionAdminService);
  private anguilleSignal: AnguilleSignalService = inject(AnguilleSignalService);
  private modalSignal: ModalSignalService = inject(ModalSignalService);

  postCollection(newCollectionName : CollectionDto['name']): void{
    this.subscriptions.push(
      this.apiCollectionAdmin.post(newCollectionName).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getAllCollections();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  putCollection(collectionToEdit : CollectionDto): void{
    this.subscriptions.push(
      this.apiCollectionAdmin.put(collectionToEdit).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getAllCollections();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDeleteCollection(collection: CollectionDto): void {

    this.adminDataSignal.getProductsByCollectionSlug(collection.slug);
    this.adminDataSignal.setItemToDelete(collection);

    const MESSAGE: string = `Confirmez-vous vouloir supprimer la Catégorie: ${collection.name} ? Il y a ${this.adminDataSignal.$productsImpacted().length} carnet(s) impacté(s)`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice: boolean): void => userChoice ? this.deleteCollection() : this.adminDataSignal.setItemToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  deleteCollection(): void{
    this.subscriptions.push(
      this.apiCollectionAdmin.delete(this.adminDataSignal.$itemToDelete()!.slug).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.adminDataSignal.setItemToDelete(null);
          this.adminDataSignal.setProductsImpacted([]);
          this.dataSignal.getAllCollections();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
