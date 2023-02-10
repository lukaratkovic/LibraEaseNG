import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Book} from "../model/book.model";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  constructor(public api : ApiService, public auth: AuthService, private router: Router) {
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

  addToLibrary(book: Book) {
    //Check if book exists in library but is inactive
    let exists = false;
    this.api.library.forEach(entry => {
      if(entry.Book_ISBN == book.ISBN && entry.User_idUser==this.auth.user?.idUser) exists = true;
    });
    this.api.addToLibrary(book, this.auth.user, exists)
      .subscribe(res => {
        this.api.Update();
      });
  }

  inLibrary(book: Book) {
    let exists = false;
    this.api.library.forEach(entry => {
      if(entry.Book_ISBN == book.ISBN && entry.User_idUser == this.auth.user?.idUser && entry.status != 'inactive') exists = true;
    });
    return exists;
  }

  removeFromLibrary(book: Book) {
    this.api.removeFromLibrary(book, this.auth.user)
      .subscribe(res => {
        this.api.Update();
      });
  }
}
