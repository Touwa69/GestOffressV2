import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';
import { authApiURL } from '../config';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = authApiURL+'/user';
  

  users! : User[];
  user! : User;

  constructor(private http : HttpClient, private authService : AuthService) {

  /*   this.users = [
      {idUser : 1, username: "TouwaAbb", password:"123", email : "touwa@gmail.com", societe : "sasLab", roles:['ADMIN'], dateCreationCpt : new Date("2024/04/23")},
      {idUser : 2, username: "Azer01", password:"123", email : "azer@gmail.com", societe : "sasLab", roles:['ADMIN'], dateCreationCpt : new Date("2024/04/23")},
      {idUser : 3, username: "Moha20", password:"123", email : "moha@gmail.com", societe : "sasLab", roles:['USER'], dateCreationCpt : new Date("2024/04/24")},
      
    ]; */
  }

  /* listeUsers(): User[]{
    return this.users;
  } */
  listeUsers(): Observable<User[]> {
    return this.http.get<User[]>(authApiURL+'/users');
  }

  /* ajouterUser(user : User){
    this.users.push(user);
  } */

  ajouterUser( user: User):Observable<User>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.post<User>(authApiURL+"/signup", user, {headers:httpHeaders});
    }

    signup(user: User): Observable<User> {
      return this.http.post<User>(authApiURL+'/signup', user)
    }
  

//   supprimerUser(user : User){
//    const index = this.users.indexOf(user, 0);
//    if(index > -1){
//      this.users.splice(index, 1);
//    }
//  } 

  supprimerUser(id : string):Observable<User> {
    return this.http.delete<User>(`${authApiURL}/delete/${id}`);
    }

  consulterUser(id: string){
    this.user = this.users.find(usr => usr.id == id)!;
    return this.user;
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  trierUsers(){
    this.users = this.users.sort( (n1, n2) => {
      if(n1.id! > n2.id!){
        return 1;
      }if(n1.id! < n2.id!){
        return -1;
      }
      return 0;
    });
  }

  updateUser(user: User): Observable<any> {
    const url = `${authApiURL}/updateuser/${user.id}`; // Assuming updateUser is the endpoint
    return this.http.put(url, user);
  }

  rechercherParNom(term: string): Observable<any> {
    return this.http.get(`${authApiURL}/users/${term}`);
  }
  

  // rechercherParNom(nom: string):Observable< User[]> {
  //   const url = `8081/userssByName/${nom}`;
  //   return this.http.get<User[]>(url);
  //   }


}
