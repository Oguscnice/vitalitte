import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {UTAIDA_PROJECT} from "../variables/AppConfig";
import {BaseComponent} from "../../base.component";
import {Login} from "../interfaces/auth/Login";
import {AnguilleSignalService} from "./anguille-signal.service";
import {UserInfos} from "../interfaces/auth/UserInfos";
import {ResponseEntity} from "../interfaces/ResponseEntity";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseComponent {

  private http = inject(HttpClient);
  private router = inject(Router);
  private anguilleSignal = inject(AnguilleSignalService);

  canRegister():  Observable<boolean> {
    return this.http.get<boolean>(UTAIDA_PROJECT.back.url + '/auth/can-register');
  }

  register(form: FormGroup): void {
    this.subscriptions.push(
      this.signup(form).subscribe({
        next: (res) => {
          this.anguilleSignal.changeMessage(res.message);
          this.router.navigate(['/connexion']);
        },
        error: (err) => this.anguilleSignal.changeMessage(err.error.message),
      })
    )
  }

  private signup(form: FormGroup): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(UTAIDA_PROJECT.back.url + '/auth/signup', form.value);
  }

  login(form: FormGroup): void {
    this.subscriptions.push(
      this.signin(form.value).subscribe({
        next: (userInfo) => {
          this.setSession(userInfo);
          this.router.navigate(['/admin']);
        },
        error: (err) => this.anguilleSignal.changeMessage(err.error.message),
      })
    )
  }

  private signin(loginUserValue: Login): Observable<UserInfos> {
    return this.http.post<UserInfos>(UTAIDA_PROJECT.back.url + '/auth/signin', loginUserValue);
  }

  logout(): void {
    localStorage.removeItem('USER_INFOS');
    this.router.navigate(['']);
  }

  private setSession(userInfos: UserInfos) : void {
    const JWT: any = jwt_decode(userInfos.accessToken);
    const expiresAt = new Date(JWT.exp * 1000);

    localStorage.setItem(
      'USER_INFOS',
      JSON.stringify({
        email: userInfos.email,
        roles: userInfos.roles,
        access_token: userInfos.accessToken,
        expires_at: expiresAt,
      })
    );
  }

  isLoggedIn(): boolean {
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
