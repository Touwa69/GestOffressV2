import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';
import { authApiURL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!: string;
  private helper = new JwtHelperService();

  public loggedUser!:string;

  public isloggedIn: Boolean = false;
  public roles!:string[];

  constructor(private router : Router, private http : HttpClient) { }


  login(user : User){
    return this.http.post<User>(authApiURL+'/login', user , {observe:'response'});
  }

  register(user : User){
    return this.http.post<User>(authApiURL+'/signup', {observe:'request'})
  }

  saveToken(jwt:string){
  localStorage.setItem('jwt',jwt);
  this.token = jwt;
  this.isloggedIn = true;
  this.decodeJWT();
  }

  decodeJWT(){
     if (this.token == undefined)
     return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    console.log("userRole "+this.roles);
    this.loggedUser = decodedToken.sub;
  }

  getToken():string {
    return this.token;
  } 

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
    }

 loadToken() {
  this.token = localStorage.getItem('jwt')!;
  this.decodeJWT();
  }

  isTokenExpired(): Boolean{
    return this.helper.isTokenExpired(this.token);
}

isAdmin():Boolean{
  if (!this.roles)
  return false;
  return this.roles.indexOf('ROLE_ADMIN') >=0;
  }

  isSuperAdmin():Boolean{
    if (!this.roles)
    return false;
    return this.roles.indexOf('ROLE_SUPERADMIN') >=0;
    }

setLoggedUserFromLocalStorage(login : string) {
  this.loggedUser = login;
  this.isloggedIn = true;
  //this.getUserRoles(login);
  } 
}
