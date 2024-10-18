import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard  {

  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.authService.isLoggedIn() &&
      JSON.parse(localStorage.getItem('USER_INFOS')!).roles.includes(
        'ROLE_ADMIN'
      )
    ) {
      return true;
    }
    this.router.navigate(['/page-404']);
    return false;
  }
}
