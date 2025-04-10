import {Injectable, inject, signal, Signal} from '@angular/core';
import { CategoryDto } from '../../../../shared/interfaces/Category';
import { CollectionDto } from '../../../../shared/interfaces/Collection';
import { AdminDataSignalState } from '../interfaces/AdminDataSignalState';
import { SlugNameDto } from '../interfaces/SlugNameDto';
import { ProductDto } from '../../../../shared/interfaces/Product';
import { ApiRequestsService } from '../../../../shared/services/api-requests.service';
import { BaseComponent } from '../../../../base.component';
import { AnguilleSignalService } from '../../../../shared/services/anguille-signal.service';
import {catchError, Observable, of} from "rxjs";
import {ApiProductAdminService} from "./api/api-product-admin.service";

@Injectable({
  providedIn: 'root'
})
export class AdminDataSignalService extends BaseComponent {

  private apiRequestsService = inject(ApiRequestsService);
  private adminApiProductService = inject(ApiProductAdminService);
  private anguilleSignal = inject(AnguilleSignalService);

  private readonly stateAdmin: AdminDataSignalState = {
    $privateItemToDelete: signal<SlugNameDto | null>(null),
    $productsImpactedByItemToDelete: signal<ProductDto[]>([])
  } as const;

  public readonly $itemToDelete: Signal<SlugNameDto | null> = this.stateAdmin.$privateItemToDelete.asReadonly();
  public readonly $productsImpacted: Signal<ProductDto[]> = this.stateAdmin.$productsImpactedByItemToDelete.asReadonly();

  getProductTypes(): Observable<ProductDto['productType'][]> {
    return this.adminApiProductService.getProductTypes().pipe(
      catchError((err) => {
        this.anguilleSignal.changeMessage(err.error.message);
        return of([]); // Retourne un tableau vide ou une valeur par défaut en cas d'erreur
      })
    );
  }

  setItemToDelete(item: SlugNameDto | null): void {
    this.stateAdmin.$privateItemToDelete.set(item);
  }

  setProductsImpacted(productsDto: ProductDto[]): void {
    this.stateAdmin.$productsImpactedByItemToDelete.set(productsDto);
  }

  getProductsByCategorySlug(categorySlug : CategoryDto['slug']): void {
    this.subscriptions.push(
      this.apiRequestsService.getProductsByCategorySlug(categorySlug).subscribe({
        next: (productsDto) => this.setProductsImpacted(productsDto),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }

  getProductsByCollectionSlug(collectionSlug : CollectionDto['slug']): void {
    this.subscriptions.push(
      this.apiRequestsService.getProductsByCollectionSlug(collectionSlug).subscribe({
        next: (productsDto) => this.setProductsImpacted(productsDto),
        error: (err) => (this.anguilleSignal.changeMessage(err.error.message))
      })
    )
  }
}
