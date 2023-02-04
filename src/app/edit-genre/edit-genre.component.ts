import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent {
  genreForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService){
    this.genreForm = this.fb.group({

    });
  }

  onSave(){

  }

}
