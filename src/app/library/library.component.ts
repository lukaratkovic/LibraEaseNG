import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit(){
    if(!this.auth.isAuthenticated()) {
      this.auth.whoAmI()
        .then(res => {
          if(!res)
            this.router.navigate(['login']);
        });
    }
  }
}
