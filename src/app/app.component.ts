import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LibraEase';
  constructor(public router : Router, public auth: AuthService, private location: Location) {
  }

  back() {
    this.location.back();
  }
}
