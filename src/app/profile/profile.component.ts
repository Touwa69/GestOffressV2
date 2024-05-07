import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  currentUser = new User();

  users! : User[];

  constructor(private activatedRoute : ActivatedRoute, private userService : UserService){}

  
  ngOnInit(): void {
    // this.currentUser = this.userService.consulterUser(this.activatedRoute.snapshot.params['id']);
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    const userId = '14466175-36c7-4a26-9832-f945d938bbc2' ; // Example user ID, replace with the actual user ID
    this.userService.getUserById(userId)
      .subscribe(user => {
        this.currentUser = user;
      });
  }

}
