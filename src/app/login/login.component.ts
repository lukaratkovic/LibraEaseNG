import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logInForm !: FormGroup;

  constructor(private fb: FormBuilder, private auth : AuthService, private router : Router) {

  }

  ngOnInit(){
    this.logInForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  login() {
    this.auth.login({username: this.logInForm.value.username, password: this.logInForm.value.password})
      .then((loginStatus)=>{
        if(loginStatus) this.router.navigate(['library']);
        else{
          Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          }).fire({
            icon: 'error',
            title: 'Invalid username or password!'
          });
        }
      });
  }
}
