import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "./model/book.model";
import {Observable} from "rxjs";
import {Author} from "./model/author.model";
import {Genre} from "./model/genre.model";
import {Publisher} from "./model/publisher.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  books : Book[] = [];
  authors : Author[] = [];
  genres : Genre[] = [];
  publishers : Publisher[] = [];

  constructor(private http : HttpClient) {
    this.Update();
  }

  Update(){
    this.getBooks().subscribe(res => this.books = res);
    this.getAuthors().subscribe(res => this.authors = res);
    this.getGenres().subscribe(res => this.genres = res);
    this.getPublishers().subscribe(res => this.publishers = res);
  }

  private getBooks() : Observable<Book[]>{
    return this.http.get<Book[]>('http://localhost:8081/api/book');
  }

  private getAuthors() : Observable<Author[]>{
    return this.http.get<Author[]>('http://localhost:8081/api/author');
  }

  getAuthorById(id:number) : Observable<Author>{
    return this.http.get<Author>(`http://localhost:8081/api/author/${id}`);
  }

  private getGenres() : Observable<Genre[]>{
    return this.http.get<Genre[]>('http://localhost:8081/api/genre');
  }
  public addGenre(genreName : string){
    return this.http.post('http://localhost:8081/api/genre',{genre: genreName});
  }
  public editGenre(genre : Genre){
    return this.http.put('http://localhost:8081/api/genre',{id: genre.idGenre, genre: genre.Genre});
  }
  public deleteGenre(idGenre : number){
    return this.http.delete(`http://localhost:8081/api/genre/${idGenre}`);
  }

  private getPublishers() : Observable<Publisher[]>{
    return this.http.get<Publisher[]>('http://localhost:8081/api/publisher');
  }
  public addPublisher(publisherName : string){
    return this.http.post('http://localhost:8081/api/publisher', {name: publisherName});
  }
  public editPublisher(publisher : Publisher){
    return this.http.put('http://localhost:8081/api/publisher', {id: publisher.idPublisher, name: publisher.Name});
  }
  public deletePublisher(idPublisher : number){
    return this.http.delete(`http://localhost:8081/api/publisher/${idPublisher}`);
  }

}
