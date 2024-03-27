import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { NotebooksComponent } from './pages/notebooks-pages/notebooks/notebooks.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { BooktiqueComponent } from './pages/booktique/booktique.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormulaireEnvoyeComponent } from './pages/formulaire-envoye/formulaire-envoye.component';
import { NotebooksPreparedComponent } from './pages/notebooks-pages/notebooks-prepared/notebooks-prepared.component';
import { NotebookSelectedComponent } from './pages/notebooks-pages/notebook-selected/notebook-selected.component';
import { CreateNotebookComponent } from './pages/notebooks-pages/create-notebook/create-notebook.component';
import { WorkshopComponent } from './pages/workshop/workshop.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },

  // { path: 'connexion', component: LoginComponent },
  { path: 'qui-suis-je', component: BiographyComponent },
  { path: 'booktique', component: BooktiqueComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'page-404', component: Page404Component },
  { path: 'imaginer-mon-carnet', component: CreateNotebookComponent },
  { path: 'ateliers', component : WorkshopComponent},
  { path: 'formulaire-envoye', component : FormulaireEnvoyeComponent},
  { path: 'carnets-pret-a-emploi', component : NotebooksPreparedComponent},
  { path: 'carnets/:notebookSlug', component : NotebookSelectedComponent},
  { path: 'carnets', component: NotebooksComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'page-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
