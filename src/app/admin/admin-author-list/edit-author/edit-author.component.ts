import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Author} from "../../../shared/model/author.model";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent {
  @Input() author !: Author;
  @Input() isEditing !: boolean;
  @Output() onFinish : EventEmitter<void> = new EventEmitter<void>();
  authorForm !: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
  }

  ngOnInit(){
    this.authorForm = this.fb.group({
      'name': new FormControl(this.isEditing ? this.author.Name : '', Validators.required),
      'surname': new FormControl(this.isEditing ? this.author.Surname : '', Validators.required)
    });
  }

  ngOnChanges(){
    if(this.authorForm == undefined) return;
    this.authorForm.controls['name'].setValue(this.author.Name);
    this.authorForm.controls['surname'].setValue(this.author.Surname);
  }


  onSave() {
    if(this.isEditing){
      this.author.Name = this.authorForm.value.name;
      this.author.Surname = this.authorForm.value.surname;
      this.api.editAuthor(this.author)
        .subscribe(()=>{
          this.api.Update();
          this.onFinish.emit();
        })
    }
    else{
      this.api.addAuthor(this.authorForm.value.name, this.authorForm.value.surname)
        .subscribe(()=>{
          this.api.Update();
          this.onFinish.emit();
        });
    }
  }
}
