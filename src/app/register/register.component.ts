import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm !: FormGroup;
  passwordsMatch: boolean = true;
  errorMessage : string = '';

  constructor(private fb: FormBuilder) {

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
    console.log(this.registerForm.get('username'));
  }
}
