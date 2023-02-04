export class Book{
  ISBN: string;
  Title: string;
  Pages: string;
  Genre_idGenre: number;
  Genre : string = "";
  Author_idAuthor: number;
  Author : string = "";
  Publisher_idPublisher: number;
  Publisher : string = "";


  constructor(ISBN: string, Title: string, Pages: string, idGenre: number, idAuthor: number, idPublisher: number) {
    this.ISBN = ISBN;
    this.Title = Title;
    this.Pages = Pages;
    this.Genre_idGenre = idGenre;
    this.Author_idAuthor = idAuthor;
    this.Publisher_idPublisher = idPublisher;
  }
}
