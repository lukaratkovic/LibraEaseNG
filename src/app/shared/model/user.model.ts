export class User{
  idUser : number;
  username : string;
  email : string;
  level : number;


  constructor(idUser: number, Username: string, Email: string, level: number) {
    this.idUser = idUser;
    this.username = Username;
    this.email = Email;
    this.level = level;
  }
}
