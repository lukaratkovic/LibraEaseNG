export class LibraryEntry{
  User_idUser: number;
  Book_ISBN: string;
  Progress: number;
  status: string;


  constructor(User_idUser: number, Book_ISBN: string, Progress: number, status: string) {
    this.User_idUser = User_idUser;
    this.Book_ISBN = Book_ISBN;
    this.Progress = Progress;
    this.status = status;
  }
}
