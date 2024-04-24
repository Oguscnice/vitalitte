import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { ManageMaterialsComponent } from './pages/manage-materials/manage-materials.component';
import { ManageNotebooksComponent } from './pages/manage-notebooks/manage-notebooks.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';
import { EditMaterialComponent } from './pages/edit-material/edit-material.component';
import { ManageContactsComponent } from './pages/manage-contacts/manage-contacts.component';
import { ManageCategoriesCollectionsComponent } from './pages/manage-categories-collections/manage-categories-collections.component';
import { EditNotebookComponent } from './pages/edit-notebook/edit-notebook.component';
import { ManageWorkshopsComponent } from './pages/manage-workshops/manage-workshops.component';
import { EditWorkshopComponent } from './pages/edit-workshop/edit-workshop.component';
import { ManageGiftcardsComponent } from './pages/manage-giftcards/manage-giftcards.component';
import { UserListGiftcardsUsedComponent } from './pages/user-list-giftcards-used/user-list-giftcards-used.component';

const routes: Routes = [
  // { path: '', component: AdminHomeComponent, canActivate: [AdminGuard] },
  { path: 'accueil', component: AdminHomeComponent },
  { path: 'gestion-des-materiaux', component: ManageMaterialsComponent },
  { path: 'gestion-des-categories-et-collections', component: ManageCategoriesCollectionsComponent },
  { path: 'gestion-des-carnets', component: ManageNotebooksComponent },
  { path: 'editer-materiel/:materielSlug', component : EditMaterialComponent},
  { path: 'editer-carnet/:notebookSlug', component : EditNotebookComponent},
  { path: 'gestion-des-ateliers', component: ManageWorkshopsComponent },
  { path: 'editer-atelier/:workshopSlug', component : EditWorkshopComponent},
  { path: 'gestion-des-cartes-cadeaux', component: ManageGiftcardsComponent },
  { path: 'utilisateurs-carte-cadeaux/:giftcardCode', component: UserListGiftcardsUsedComponent },
  { path: 'gestion-des-publications', component: ManagePublicationsComponent },
  { path: 'gestion-des-contacts', component: ManageContactsComponent },
  { path: '', component: AdminHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
