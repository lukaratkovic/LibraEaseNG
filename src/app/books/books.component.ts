import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Book} from "../model/book.model";
import {LibraryService} from "../library.service";

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
