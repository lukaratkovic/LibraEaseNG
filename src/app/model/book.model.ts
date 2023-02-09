export class Book{
  ISBN: string;
  Title: string;
  Pages: number;
  Genre_idGenre: number;
  Genre ?: string = "";
  Author_idAuthor: number;
  Author ?: string = "";
  Publisher_idPublisher: number;
  Publisher ?: string = "";
  description: string = "";


  constructor(ISBN: string, Title: string, Pages: number, idGenre: number, idAuthor: number, idPublisher: number) {
    this.ISBN = ISBN;
    this.Title = Title;
    this.Pages = Pages;
    this.Genre_idGenre = idGenre;
    this.Author_idAuthor = idAuthor;
    this.Publisher_idPublisher = idPublisher;
  }
}
