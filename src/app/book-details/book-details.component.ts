import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {AuthService} from "../auth.service";
import {Book} from "../model/book.model";
import {BookBindPipe} from '../book-bind.pipe';
import {LibraryService} from "../library.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  book !: Book;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private auth: AuthService, public library: LibraryService) {
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
}
