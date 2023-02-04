import { Component } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-admin-genre-list',
  templateUrl: './admin-genre-list.component.html',
  styleUrls: ['./admin-genre-list.component.css']
})
export class AdminGenreListComponent {
  editing : boolean = false;

  constructor(public api : ApiService) {
    api.Update();
  }

  onEdit(){
    this.editing = !this.editing;
  }
}
