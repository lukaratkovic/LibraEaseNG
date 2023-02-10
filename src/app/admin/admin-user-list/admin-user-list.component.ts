import { Component } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {User} from "../../shared/model/user.model";
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent {
  users !: User[];

  constructor(public api : ApiService, public auth: AuthService) {
    api.Update();
  }

  ngOnInit(){
    this.api.getUsers()
      .subscribe(res => this.users = res);
  }

  toggleAdmin(user: User) {
    let isAdmin = user.level == 1;
    Swal.fire({
      title: isAdmin ? `Are you sure you wish to remove admin privileges from user ${user.username}` :
        `Are you sure you wish to grant admin privileges to user ${user.username}`,
      confirmButtonText: isAdmin ? 'Remove' : 'Grant',
      confirmButtonColor: '#0d6efd',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        user.level = user.level == 1 ? 2 : 1;
        this.api.editUser(user)
          .subscribe(res=> console.log(res));
      }
    });
  }

  deleteUser(user: User) {
    this.api.deleteUser(user.idUser)
      .subscribe((res)=> {
        this.api.getUsers()
          .subscribe(res => this.users = res);
      });
  }
}
