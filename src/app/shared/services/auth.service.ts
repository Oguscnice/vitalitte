import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { FormGroup } from '@angular/forms';
import { URLAPI } from '../variables/Others';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  signup(form: FormGroup): Observable<any> {
    return this.http.post(URLAPI + 'auth/signup', form.value);
  }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(URLAPI + 'auth/signin', {
      email: email,
      password: password,
    });
  }

  logout(): void {
    localStorage.removeItem('USER_INFOS');
    this.router.navigate(['']);
  }

  public setSession(userInfo: any) : void {
    const jwt: any = jwt_decode(userInfo.accessToken);
    const expiresAt = new Date(jwt.exp * 1000);

    localStorage.setItem(
      'USER_INFOS',
      JSON.stringify({
        email: userInfo.email,
        roles: userInfo.roles,
        access_token: userInfo.accessToken,
        expires_at: expiresAt,
      })
    );
  }

  public isLoggedIn() {
    if (localStorage.getItem('USER_INFOS')) {
      const userInfo = JSON.parse(localStorage.getItem('USER_INFOS')!);
      if (new Date(userInfo.expires_at).getTime() > new Date().getTime()) {
        return true;
      }
    }
    this.logout();
    return false;
  }

  public getToken() {
    if (localStorage.getItem('USER_INFOS')) {
      const userInfo = JSON.parse(localStorage.getItem('USER_INFOS')!);
      return userInfo.access_token;
    }
  }
}
