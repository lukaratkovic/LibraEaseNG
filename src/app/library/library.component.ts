import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {ApiService} from "../api.service";
import {LibraryEntry} from "../model/libraryEntry.model";
import {Book} from "../model/book.model";
import {BookBindPipe} from "../book-bind.pipe";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  editingISBNs : string[] = [];

  constructor(private router: Router, public api: ApiService, public auth: AuthService) {
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

  edit(Book_ISBN: string) {
    this.editingISBNs.push(Book_ISBN);
  }

  finishEdit(Book_ISBN: string) {
    this.editingISBNs.splice(this.editingISBNs.indexOf(Book_ISBN),1);
  }
}
