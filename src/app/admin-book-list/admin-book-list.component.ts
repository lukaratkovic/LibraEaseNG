import { Component } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css']
})
export class AdminBookListComponent {
  constructor(public api : ApiService) {
    api.Update();
  }
}
