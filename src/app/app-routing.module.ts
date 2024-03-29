import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { CreationsComponent } from './pages/creations/creations.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { BooktiqueComponent } from './pages/booktique/booktique.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormulaireEnvoyeComponent } from './pages/formulaire-envoye/formulaire-envoye.component';
import { NotebooksComponent } from './pages/notebooks/notebooks.component';
import { NotebookSelectedComponent } from './pages/notebook-selected/notebook-selected.component';
import { CreateNotebookComponent } from './pages/create-notebook/create-notebook.component';

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
  { path: 'atelier', component: CreationsComponent },
  { path: 'qui-suis-je', component: BiographyComponent },
  { path: 'booktique', component: BooktiqueComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'page-404', component: Page404Component },
  { path: 'imaginer-mon-carnet', component: CreateNotebookComponent },
  { path: 'formulaire-envoye', component : FormulaireEnvoyeComponent},
  { path: 'carnets/:notebookSlug', component : NotebookSelectedComponent},
  { path: 'carnets', component : NotebooksComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'page-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
