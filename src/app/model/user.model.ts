export class User{
  idUser : number;
  Username : string;
  Email : string;
  level : string;


  constructor(idUser: number, Username: string, Email: string, level: string) {
    this.idUser = idUser;
    this.Username = Username;
    this.Email = Email;
    this.level = level;
  }
}
