import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Book} from "../model/book.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(public api : ApiService) {
    api.Update();
  }
}
