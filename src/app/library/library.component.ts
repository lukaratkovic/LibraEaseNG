import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {ApiService} from "../shared/services/api.service";
import {LibraryEntry} from "../shared/model/libraryEntry.model";
import {Book} from "../shared/model/book.model";
import {BookBindPipe} from "../shared/pipes/book-bind.pipe";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  editingISBNs : string[] = [];
  sortingField = 'Title';
  asc = true;

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

  setSort(field: string) {
    if(this.sortingField == field)
      this.asc = !this.asc;
    this.sortingField = field;
  }

  calcPercent(libEntry: any) {
    return ((libEntry.Progress/libEntry.Pages)*100) | 0;
  }
}
