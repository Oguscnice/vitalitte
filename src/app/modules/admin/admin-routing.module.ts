import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ManageMaterialsComponent } from './pages/stationery/material/manage-materials/manage-materials.component';
import { ManageProductsComponent } from './pages/stationery/product/manage-products/manage-products.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';
import { EditMaterialComponent } from './pages/stationery/material/edit-material/edit-material.component';
import { ManageContactsComponent } from './pages/manage-contacts/manage-contacts.component';
import { ManageCategoriesCollectionsComponent } from './pages/stationery/manage-categories-collections/manage-categories-collections.component';
import { EditProductComponent } from './pages/stationery/product/edit-product/edit-product.component';
import { ManageWorkshopsComponent } from './pages/manage-workshops/manage-workshops.component';
import { EditWorkshopComponent } from './pages/edit-workshop/edit-workshop.component';
import { ManageGiftCardsComponent } from './pages/manage-giftcards/manage-giftcards.component';
import {ManageDeliveryOptionsComponent} from "./pages/manage-delivery-options/manage-delivery-options.component";
import {HomeStationeryComponent} from "./pages/stationery/home-stationery/home-stationery.component";
import {ManageReviewsComponent} from "./pages/stationery/manage-reviews/manage-reviews.component";
import {AdminGuard} from "../../shared/guards/admin.guard";

const routes: Routes = [
  { path: '', component: AdminHomeComponent, canActivate: [AdminGuard] },
  { path: 'accueil', component: AdminHomeComponent, canActivate: [AdminGuard], redirectTo: '' },
  { path: 'gestion-papeterie', component: HomeStationeryComponent, canActivate: [AdminGuard] },
  { path: 'gestion/materiaux', component: ManageMaterialsComponent, canActivate: [AdminGuard] },
  { path: 'gestion/categories-collections', component: ManageCategoriesCollectionsComponent, canActivate: [AdminGuard] },
  { path: 'gestion/commentaires', component: ManageReviewsComponent, canActivate: [AdminGuard] },
  { path: 'editer-materiel/:materielSlug', component : EditMaterialComponent, canActivate: [AdminGuard] },
  { path: 'gestion/ateliers', component: ManageWorkshopsComponent, canActivate: [AdminGuard] },
  { path: 'editer-atelier/:workshopSlug', component : EditWorkshopComponent, canActivate: [AdminGuard] },
  { path: 'gestion/cartes-cadeaux', component: ManageGiftCardsComponent, canActivate: [AdminGuard] },
  { path: 'gestion/publications', component: ManagePublicationsComponent, canActivate: [AdminGuard] },
  { path: 'gestion/contacts', component: ManageContactsComponent, canActivate: [AdminGuard] },
  { path: 'gestion/options-de-livraison', component: ManageDeliveryOptionsComponent, canActivate: [AdminGuard] },
  { path: 'gestion/:productType', component: ManageProductsComponent, canActivate: [AdminGuard] },
  { path: 'editer-produit/:productSlug', component : EditProductComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
