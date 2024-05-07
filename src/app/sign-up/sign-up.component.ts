import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  captcha : string;
  login : string;
  newUser = new User();
  user = new User();
  err : number = 0;

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder ,private userService : UserService, private router : Router, private authService : AuthService){
    this.captcha='';
    this.login='Sign-Up';

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.newUser.email) {
      return;
    }

    this.userService.signup(this.newUser)
      .subscribe(
        response => {
          this.router.navigate(['/login']);
          console.log('Registration successful', response);
          // Handle success, such as redirecting to another page
        },
        
        error => {
          console.error('Registration failed', error);
          // Check if the error status is 403 and handle it specifically
          if (error.status === 403) {
            alert('Saisir un email valid'); // Alert the user for incorrect email format
          }
          else  if (error.status === 406) {
            alert("L'utilisateur existe déjà"); // Alert the user for incorrect email format
          } 
          else {
            alert('Registration failed. Please try again.'); // General error alert
          }
          this.err = 1; // Set error flag
        }
      );
  }

  ngOnInit(): void {}

  resolved(captchaResponse : string){
    this.captcha = captchaResponse;
    console.log('resolved captcha with response:  '+ this.captcha);
  }

  addUser(){
    this.userService.ajouterUser(this.newUser);
    this.router.navigate(['/login']);
  }



}
