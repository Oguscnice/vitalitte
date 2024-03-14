import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { ManageMaterialsComponent } from './pages/manage-materials/manage-materials.component';
import { ManageNotebooksComponent } from './pages/manage-notebooks/manage-notebooks.component';
import { ManageActivitiesComponent } from './pages/manage-activities/manage-activities.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';

const routes: Routes = [
  // { path: '', component: AdminHomeComponent, canActivate: [AdminGuard] },
  { path: 'accueil', component: AdminHomeComponent },
  { path: 'gestion-des-materiaux', component: ManageMaterialsComponent },
  { path: 'gestion-des-carnets', component: ManageNotebooksComponent },
  { path: 'gestion-des-activites', component: ManageActivitiesComponent },
  { path: 'gestion-des-publications', component: ManagePublicationsComponent },
  { path: '', component: AdminHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
