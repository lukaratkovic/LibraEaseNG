import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {Genre} from "../model/genre.model";

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent {
  @Input() genre !: Genre;
  @Input() isEditing !: boolean;
  @Output() onFinish : EventEmitter<void> = new EventEmitter<void>();
  genreForm !: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService){

  }

  ngOnInit(){
    this.genreForm = this.fb.group({
      'genre': new FormControl(this.isEditing ? this.genre.Genre : '', Validators.required)
    });
  }

  ngOnChanges(){
    if(this.genreForm == undefined) return;
    this.genreForm.controls['genre'].setValue(this.genre.Genre);
  }

  onSave(){
      if(this.isEditing){
        this.genre.Genre = this.genreForm.value.genre;
        this.api.editGenre(this.genre)
          .subscribe(()=>{
            this.api.Update();
            this.onFinish.emit();
          });
      }
      else {
        this.api.addGenre(this.genreForm.value.genre)
          .subscribe(() => {
            this.api.Update();
            this.onFinish.emit();
          });
      }
  }

}
