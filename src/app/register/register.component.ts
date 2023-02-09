import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/user.model";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm !: FormGroup;
  passwordsMatch: boolean = true;
  errorMessage : string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {

  }

  ngOnInit(){
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', Validators.required)
    });
  }

  checkRules() {
    this.passwordsMatch = this.registerForm.value.password == this.registerForm.value.password2;
  }

  register() {
    let user = new User(-1, this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password);
    this.auth.register({username: this.registerForm.value.username, password: this.registerForm.value.password, email: this.registerForm.value.email, level: 2})
      .subscribe(res => this.router.navigate(['/login']));
  }
}
