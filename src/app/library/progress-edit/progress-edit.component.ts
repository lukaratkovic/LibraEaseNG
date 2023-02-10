import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-progress-edit',
  templateUrl: './progress-edit.component.html',
  styleUrls: ['./progress-edit.component.css']
})
export class ProgressEditComponent {
  @Input() progress !: number;
  @Input() pages !: number;
  @Input() ISBN !: string;
  @Output() onFinish : EventEmitter<void> = new EventEmitter<void>();
  progressForm !: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private auth: AuthService) {
  }

  ngOnInit(){
    this.progressForm = this.fb.group({
      'progress': new FormControl(this.progress, [Validators.required, Validators.min(0), Validators.max(this.pages)])
    });
  }

  save() {
    this.api.books.forEach(book => {
      if(book.ISBN == this.ISBN){
        this.api.addToLibrary(book, this.auth.user, true, this.progressForm.value.progress)
          .subscribe((res)=>{
            this.api.Update();
            this.onFinish.emit();
          });
      }
    })
  }
}
