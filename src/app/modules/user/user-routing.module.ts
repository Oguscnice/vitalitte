import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserGuard } from 'src/app/shared/guards/user.guard';

const routes: Routes = [
  { path: '', component: UserHomeComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
