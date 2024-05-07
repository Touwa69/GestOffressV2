import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{

  currentUser: User = new User();

  constructor(private activatedRoute : ActivatedRoute,private router : Router , private userService : UserService){}



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let userId = params['id'];
      this.userService.getUserById(userId).subscribe(
        (data: User) => { // Ensure the data type is User
          this.currentUser = data;
        },
        error => console.error(error)
      );
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.currentUser).subscribe(
      data => {
        console.log('User updated successfully!');
        this.router.navigate(['/users']);
      },
      error => console.error(error)
    );
  }

}
