import {Injectable, inject} from '@angular/core';
import { ApiCategoryAdminService } from './api/api-category-admin.service';
import { CategoryDto } from '../../../../shared/interfaces/Category';
import { BaseComponent } from '../../../../base.component';
import { AdminDataSignalService } from './admin-data-signal.service';
import { DataSignalService } from '../../../../shared/services/data-signal.service';
import { AnguilleSignalService } from '../../../../shared/services/anguille-signal.service';
import {ModalSignalService} from "../../../../shared/services/modal-signal.service";
import {ResponseEntity} from "../../../../shared/interfaces/ResponseEntity";

@Injectable({
  providedIn: 'root'
})
export class AdminCategorySignalService extends BaseComponent {

  private dataSignal: DataSignalService = inject(DataSignalService);
  private adminDataSignal: AdminDataSignalService = inject(AdminDataSignalService);
  private apiCategoryAdmin: ApiCategoryAdminService = inject(ApiCategoryAdminService);
  private anguilleSignal: AnguilleSignalService = inject(AnguilleSignalService);
  private modalSignal: ModalSignalService = inject(ModalSignalService);

  postCategory(newCategoryName : CategoryDto['name']): void{
    this.subscriptions.push(
      this.apiCategoryAdmin.post(newCategoryName).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getAllCategories();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  putCategory(categoryToEdit : CategoryDto): void {
    this.subscriptions.push(
      this.apiCategoryAdmin.put(categoryToEdit).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignal.getAllCategories();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDeleteCategory(category: CategoryDto): void {

    this.adminDataSignal.getProductsByCategorySlug(category.slug);
    this.adminDataSignal.setItemToDelete(category);
    const MESSAGE: string = `Confirmez-vous vouloir supprimer la Catégorie: ${category.name} ? Il y a ${this.adminDataSignal.$productsImpacted().length} carnet(s) impacté(s)`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice: boolean): void => userChoice ? this.deleteCategory() : this.adminDataSignal.setItemToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  deleteCategory(): void{
    this.subscriptions.push(
      this.apiCategoryAdmin.delete(this.adminDataSignal.$itemToDelete()!.slug).subscribe({
        next: (res: ResponseEntity): void => {
          this.anguilleSignal.changeMessage(res.message);
          this.adminDataSignal.setItemToDelete(null);
          this.adminDataSignal.setProductsImpacted([]);
          this.dataSignal.getAllCategories();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
