import { Component } from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Book} from "../shared/model/book.model";
import {LibraryService} from "../shared/services/library.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  constructor(public api : ApiService, public auth: AuthService, private router: Router, public library : LibraryService) {
    api.Update();
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
