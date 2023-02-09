export class User{
  idUser : number;
  Username : string;
  Email : string;
  level : number;


  constructor(idUser: number, Username: string, Email: string, level: number) {
    this.idUser = idUser;
    this.Username = Username;
    this.Email = Email;
    this.level = level;
  }
}
