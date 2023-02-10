import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user : User | undefined | null = null;
  private token : any;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials : {username: string, password: string}){
    return new Promise(resolve => {
      this.http.post<{status: number, description?:string, user?:User, token?:string}>
      ('http://localhost:8081/auth/login', credentials)
        .subscribe((res)=>{
          if(res.status == 200){
            this.user = res.user;
            this.token = res.token;
            if (typeof this.token === "string") {
              localStorage.setItem('token', this.token);
            }
            resolve(true);
          }
          else resolve(false);
        });
    });
  }

  logout(){
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
  }

  register(user: {username: string, password: string, email: string, level: number}){
    return this.http.post('http://localhost:8081/auth/register', user);
  }

  getToken(){
    if(this.token) return this.token;
    else {
      if(localStorage.getItem('token')){
        this.token = localStorage.getItem('token');
        return this.token;
      }
    }
  }

  isAuthenticated(){
    return this.user != null;
  }

  whoAmI(){
    return new Promise(resolve => {
      if (this.getToken()) {
        this.http.get<{status: number, description?:string, user?:User}>
        ('http://localhost:8081/api/me')
          .subscribe(res => {
            if(res.status == 200){
              this.user = res.user;
              resolve(this.user?.level);
            }
            else resolve(false);
          });
      }
    });
  }
}
