import { Injectable, inject, signal } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import { ApiProductAdminService } from './api/api-product-admin.service';
import { DataSignalService } from '../../../../shared/services/data-signal.service';
import { CreateProduct } from '../interfaces/CreateProduct';
import { ProductDto } from '../../../../shared/interfaces/Product';
import { AdminProductSignalState } from '../interfaces/AdminProductSignalState';
import { AnguilleSignalService } from '../../../../shared/services/anguille-signal.service';
import { ModalSignalService } from '../../../../shared/services/modal-signal.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminProductSignalService extends BaseComponent {

  private apiProductAdmin = inject(ApiProductAdminService);
  private dataSignalService = inject(DataSignalService);
  private anguilleSignal = inject(AnguilleSignalService);
  private modalSignal = inject(ModalSignalService);
  private router = inject(Router);

  private readonly state: AdminProductSignalState = {
    $privateProductToDelete: signal<ProductDto | null>(null),
  } as const;

  public readonly $productToDelete = this.state.$privateProductToDelete.asReadonly();

  setProductToDelete(value: ProductDto | null): void {
    this.state.$privateProductToDelete.set(value);
  }

  post(newProduct : CreateProduct): void {
    this.subscriptions.push(
      this.apiProductAdmin.post(newProduct).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignalService.getAllProductsByCategoryAndCollection();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  put(productToEdit : ProductDto): void {
    this.subscriptions.push(
      this.apiProductAdmin.put(productToEdit).subscribe({
        next: () => {
          const MESSAGE = `${productToEdit.productType.toUpperCase()} : ${productToEdit.name} mise à jour avec succès`;

          this.subscriptions.push(
            this.modalSignal.showModal(MESSAGE, false).subscribe({
              next: () => this.router.navigate(['/admin/gestion/' + productToEdit.productType]),
              error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
            })
          )
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  changeAvailability(product : ProductDto): void {
    this.subscriptions.push(
      this.apiProductAdmin.changeAvailability(product).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.dataSignalService.getAllProductsByCategoryAndCollection();
        },
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  confirmationModalForDelete(product: ProductDto): void {

    this.setProductToDelete(product);
    const MESSAGE = `Confirmez-vous vouloir supprimer le ${product.productType.toUpperCase()} : ${product.name} ?`;

    this.subscriptions.push(
      this.modalSignal.showModal(MESSAGE, true).subscribe({
        next: (userChoice) => userChoice ? this.delete() : this.setProductToDelete(null),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  delete(): void {
    if (this.$productToDelete) {
      this.subscriptions.push(
        this.apiProductAdmin.delete(this.$productToDelete()!.slug).subscribe({
          next: (res) => {
            this.anguilleSignal.changeMessage(res.message);
            this.setProductToDelete(null);
            this.dataSignalService.getAllProductsByCategoryAndCollection();
          },
          error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
        })
      )
    }
  }
}
