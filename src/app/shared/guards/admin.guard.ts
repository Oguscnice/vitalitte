import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard  {
  constructor(private router: Router, public authService: AuthService) {}

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
    this.router.navigate(['/user']);
    return false;
  }
}
