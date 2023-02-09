import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(public router: Router, private auth: AuthService) {
  }

  ngOnInit(){
    if(this.auth.isAuthenticated()){
      if(this.auth.user?.level != 1) {
        this.router.navigate(['library']);
      }
    }
    else {
      this.auth.whoAmI()
        .then(res => {
          if(res as number > 1)
            this.router.navigate(['library']);
          else if(!res)
            this.router.navigate(['login']);
        });
    }
  }
}
