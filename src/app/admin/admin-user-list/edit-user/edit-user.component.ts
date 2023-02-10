import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Publisher} from "../../../shared/model/publisher.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/model/user.model";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  @Input() user !: User;
  @Output() onFinish : EventEmitter<void> = new EventEmitter<void>();
  userForm !: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
  }

  ngOnInit(){
    this.userForm = this.fb.group({
      'username': new FormControl(this.user.username,[Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
      'email': new FormControl(this.user.email, [Validators.required, Validators.email])
    });
    console.log(this.user);
  }

  onSave() {
    this.user.username = this.userForm.value.username;
    this.user.email = this.userForm.value.email;
    this.api.editUser(this.user)
      .subscribe(()=>this.onFinish.emit());
  }
}
