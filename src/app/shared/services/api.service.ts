import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/book.model";
import {Observable} from "rxjs";
import {Author} from "../model/author.model";
import {Genre} from "../model/genre.model";
import {Publisher} from "../model/publisher.model";
import {User} from "../model/user.model";
import {LibraryEntry} from "../model/libraryEntry.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  books : Book[] = [];
  authors : Author[] = [];
  genres : Genre[] = [];
  publishers : Publisher[] = [];
  library : LibraryEntry[] = [];

  apiLink = 'http://localhost:8081';

  constructor(private http : HttpClient, private auth: AuthService) {
    this.Update();
  }

  Update(){
    this.getBooks().subscribe(res => this.books = res);
    this.getAuthors().subscribe(res => this.authors = res);
    this.getGenres().subscribe(res => this.genres = res);
    this.getPublishers().subscribe(res => this.publishers = res);
    this.getLibrary().subscribe(res => this.library = res);
  }

  private getBooks() : Observable<Book[]>{
    return this.http.get<Book[]>(this.apiLink+'/api/book');
  }
  public addBook(book: { pages: any; idGenre: any; ISBN: number; idPublisher: any; idAuthor: any; title: any, Description: string }) {
    return this.http.post(this.apiLink+'/api/book',book);
  }
  public editBook(book: { pages: any; idGenre: any; ISBN: number; idPublisher: any; idAuthor: any; title: any, Description: string }){
    return this.http.put(this.apiLink+'/api/book', book);
  }
  public deleteBook(ISBN: string) {
    return this.http.delete(`${this.apiLink}/api/book/${ISBN}`);
  }
  public getBookByISBN(ISBN: string) : Observable<Book>{
    return this.http.get<Book>(`${this.apiLink}/api/book/${ISBN}`);
  }

  private getAuthors() : Observable<Author[]>{
    return this.http.get<Author[]>(this.apiLink+'/api/author');
  }
  public addAuthor(authorName: string, authorSurname: string){
    return this.http.post(this.apiLink+'/api/author', {name: authorName, surname: authorSurname});
  }
  public editAuthor(author : Author){
    return this.http.put(this.apiLink+'/api/author', {id: author.idAuthor, name: author.Name, surname: author.Surname});
  }
  public deleteAuthor(idAuthor : number){
    return this.http.delete(`${this.apiLink}/api/author/${idAuthor}`);
  }

  getAuthorById(id:number) : Observable<Author>{
    return this.http.get<Author>(`${this.apiLink}/api/author/${id}`);
  }

  private getGenres() : Observable<Genre[]>{
    return this.http.get<Genre[]>(this.apiLink+'/api/genre');
  }
  public addGenre(genreName : string){
    return this.http.post(this.apiLink+'/api/genre',{genre: genreName});
  }
  public editGenre(genre : Genre){
    return this.http.put(this.apiLink+'/api/genre',{id: genre.idGenre, genre: genre.Genre});
  }
  public deleteGenre(idGenre : number){
    return this.http.delete(`${this.apiLink}/api/genre/${idGenre}`);
  }

  private getPublishers() : Observable<Publisher[]>{
    return this.http.get<Publisher[]>(this.apiLink+'/api/publisher');
  }
  public addPublisher(publisherName : string){
    return this.http.post(this.apiLink+'/api/publisher', {name: publisherName});
  }
  public editPublisher(publisher : Publisher){
    return this.http.put(this.apiLink+'/api/publisher', {id: publisher.idPublisher, name: publisher.Name});
  }
  public deletePublisher(idPublisher : number) {
    return this.http.delete(`${this.apiLink}/api/publisher/${idPublisher}`);
  }

  private getLibrary() : Observable<LibraryEntry[]>{
    return this.http.get<LibraryEntry[]>(`${this.apiLink}/api/library`);
  }
  public addToLibrary(book: Book, user: User | undefined | null, existsInLibrary: boolean, progress=0){
    if(existsInLibrary)
      return this.http.put(this.apiLink+'/api/library',{idUser: user?.idUser, ISBN: book.ISBN, progress: progress, status: 'reading'});
    return this.http.post(this.apiLink+'/api/library',{idUser: user?.idUser, ISBN: book.ISBN});
  }
  public removeFromLibrary(book: Book, user: User | undefined | null){
    return this.http.put(this.apiLink+'/api/library',{idUser: user?.idUser, ISBN: book.ISBN, status: 'inactive'});
  }

  public getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.apiLink+'/api/user');
  }
  public editUser(user: User){
    return this.http.put(this.apiLink+'/api/user',user);
  }
  public deleteUser(idUser:number){
    return this.http.delete(`${this.apiLink}/api/user/${idUser}`);
  }
}
