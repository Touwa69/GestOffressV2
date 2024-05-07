import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users! : User[];
  nomUser! :string;
  allUsers! : User[];
  searchTerm!: string;

   constructor(private userService : UserService){
    // this.users = userService.listeUsers();

  }
  
 /* constructor(){
  this.users = [
    {idUser : 1, username: "TouwaAbbassi", password:"123", email : "touwa@gmail.com", societe : "sasLab", roles:['ADMIN']},
    {idUser : 2, username: "AzerArfa", password:"123", email : "azer@gmail.com", societe : "sasLab", roles:['ADMIN']},
    {idUser : 1, username: "Moha20", password:"123", email : "moha@gmail.com", societe : "sasLab", roles:['USER']},
    
  ];
 } */

  ngOnInit(): void {
    this.loadUsers();
  }

  
loadUsers() {
  this.userService.listeUsers().subscribe(
      users => {
          console.log("Users loaded:", users);
          this.users = [...users];
      },
      error => {
          console.error('Error fetching users', error);
      }
  );
}
getRoleNames(user: User): string[] {
  return user.roles.map(role => role.name);
}

onKeyUp(value: string) {
  if (value === '') {
    // If search input is empty, retrieve all users
    this.userService.listeUsers().subscribe(
      data => {
        this.users = data; // Assuming 'users' is the array that stores the user data displayed in the HTML.
      },
      error => {
        console.error('Error retrieving all users:', error);
      }
    );
  } else {
    // If search input is not empty, perform search by name
    this.userService.rechercherParNom(value).subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error retrieving users:', error);
      }
    );
  }
}




    supprimerUser(id: string): void {
      console.log("Attempting to delete user with ID:", id);
      let conf = confirm("Are you sure?");
      if (conf) {
          this.userService.supprimerUser(id).subscribe(() => {
              console.log("User deleted, reloading users.");
              this.loadUsers();
              
          }, (error) => {
              console.error('Error deleting user', error);
          });
      }
      window.location.reload(); 

  }

}
