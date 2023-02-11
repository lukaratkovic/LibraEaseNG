import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../shared/services/api.service";
import {AuthService} from "../shared/services/auth.service";
import {Book} from "../shared/model/book.model";
import {BookBindPipe} from '../shared/pipes/book-bind.pipe';
import {LibraryService} from "../shared/services/library.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  book !: Book;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, public auth: AuthService, public library: LibraryService) {
    this.api.Update();
  }

  ngOnInit(){
    //Redirect if not authenticated
    if(!this.auth.isAuthenticated()) {
      this.auth.whoAmI()
        .then(res => {
          if(!res)
            this.router.navigate(['login']);
        });
    }
    //Fetch info about book
    this.api.getBookByISBN(this.route.snapshot.params['isbn'])
      .subscribe(res => {
        const bookBindPipe = new BookBindPipe(this.api);
        this.book = bookBindPipe.transform([res])[0];
      });
  }

  getBookProgress(book: Book){
    let user = this.auth.user;
    let progress = 0;
    this.api.library.forEach(entry => {
      if(entry.Book_ISBN == book.ISBN && entry.User_idUser == user?.idUser){
        progress = entry.Progress;
      }
    });
    return progress;
  }
}
