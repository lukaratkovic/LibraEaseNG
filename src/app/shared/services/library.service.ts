import { Injectable } from '@angular/core';
import {Book} from "../model/book.model";
import {ApiService} from "./api.service";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(public api : ApiService, public auth: AuthService) { }

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
