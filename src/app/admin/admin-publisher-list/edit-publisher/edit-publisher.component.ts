import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../shared/services/api.service";
import {Publisher} from "../../../shared/model/publisher.model";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent {
  @Input() publisher !: Publisher;
  @Input() isEditing !: boolean;
  @Output() onFinish : EventEmitter<void> = new EventEmitter<void>();
  publisherForm !: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService){

  }

  ngOnInit(){
    this.publisherForm = this.fb.group({
      'publisher': new FormControl(this.isEditing ? this.publisher.Name : '', Validators.required)
    });
  }

  ngOnChanges(){
    if(this.publisherForm == undefined) return;
    this.publisherForm.controls['publisher'].setValue(this.publisher.Name);
  }

  onSave(){
    if(this.isEditing){
      this.publisher.Name = this.publisherForm.value.publisher;
      this.api.editPublisher(this.publisher)
        .subscribe(()=>{
          this.api.Update();
          this.onFinish.emit();
        });
    }
    else{
      this.api.addPublisher(this.publisherForm.value.publisher)
        .subscribe(()=>{
          this.api.Update();
          this.onFinish.emit();
        });
    }
  }
}
