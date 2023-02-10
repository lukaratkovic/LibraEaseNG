export class LibraryEntry{
  User_idUser: number;
  Book_ISBN: string;
  Progress: number;
  status: string;
  Title: string;
  Pages: number;
  AuthorName: string;
  AuthorSurname: string;
  coverURL: string;

  constructor(User_idUser: number, Book_ISBN: string, Progress: number, status: string, Title: string, Pages: number, AuthorName: string, AuthorSurname: string, coverURL: string) {
    this.User_idUser = User_idUser;
    this.Book_ISBN = Book_ISBN;
    this.Progress = Progress;
    this.status = status;
    this.Title = Title;
    this.Pages = Pages;
    this.AuthorName = AuthorName;
    this.AuthorSurname = AuthorSurname;
    this.coverURL = coverURL;
  }
}
