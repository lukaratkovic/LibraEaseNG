import { Component } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-admin-author-list',
  templateUrl: './admin-author-list.component.html',
  styleUrls: ['./admin-author-list.component.css']
})
export class AdminAuthorListComponent {
  constructor(public api : ApiService) {
    api.Update();
  }
}
