import { Component } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-admin-publisher-list',
  templateUrl: './admin-publisher-list.component.html',
  styleUrls: ['./admin-publisher-list.component.css']
})
export class AdminPublisherListComponent {
  constructor(public api : ApiService) {
    api.Update();
  }
}
