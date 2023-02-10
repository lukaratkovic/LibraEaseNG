import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "./model/book.model";
import {ApiService} from "./api.service";

@Pipe({
  name: 'bookBind'
})
export class BookBindPipe implements PipeTransform {
  constructor(private api : ApiService) {
    api.Update();
  }


  transform(books: Book[]): Book[] {
    books.forEach(book => {
      this.api.authors.forEach(author => {
        if(author.idAuthor == book.Author_idAuthor)
          book.Author = `${author.Name} ${author.Surname}`;
      });
      this.api.publishers.forEach(publisher => {
        if(publisher.idPublisher == book.Publisher_idPublisher)
          book.Publisher = publisher.Name;
      });
      this.api.genres.forEach(genre => {
        if(genre.idGenre == book.Genre_idGenre)
          book.Genre = genre.Genre;
      });
    });
    return books;
  }

}
