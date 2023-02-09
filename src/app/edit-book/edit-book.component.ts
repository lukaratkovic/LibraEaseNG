import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../model/book.model";
import {ApiService} from "../api.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  @Input() book !: Book;
  @Input() isEditing !: boolean;
  @Output() onFinish : EventEmitter<void> = new EventEmitter<void>();
  bookForm !: FormGroup;

  constructor(private fb: FormBuilder, public api : ApiService) {
    api.Update();
  }

  ngOnInit(){
    console.log(this.book);
    this.bookForm = this.fb.group({
      'isbn': new FormControl(this.isEditing ? this.book.ISBN : '', [Validators.required, Validators.min(1000000000000), Validators.max(9999999999999)]),
      'title': new FormControl(this.isEditing ? this.book.Title : '', Validators.required),
      'author': new FormControl(this.isEditing ? this.book.Author_idAuthor : '', Validators.required),
      'publisher': new FormControl(this.isEditing ? this.book.Publisher_idPublisher : '', Validators.required),
      'genre': new FormControl(this.isEditing ? this.book.Genre_idGenre : '', Validators.required),
      'pages': new FormControl(this.isEditing ? this.book.Pages : '', [Validators.required, Validators.min(1)]),
      'description': new FormControl(this.isEditing ? this.book.description : '', [Validators.maxLength(2048)])
    });
  }

  ngOnChanges(){
    if(this.bookForm == undefined) return;
    this.bookForm.controls['isbn'].setValue(this.book.ISBN);
    this.bookForm.controls['title'].setValue(this.book.Title);
    this.bookForm.controls['author'].setValue(this.book.Author_idAuthor);
    this.bookForm.controls['publisher'].setValue(this.book.Publisher_idPublisher);
    this.bookForm.controls['genre'].setValue(this.book.Genre_idGenre);
    this.bookForm.controls['pages'].setValue(this.book.Pages);
    this.bookForm.controls['description'].setValue(this.book.description);
  }

  onSave() {
    let book = {
      ISBN: this.bookForm.value.isbn,
      title: this.bookForm.value.title,
      pages: this.bookForm.value.pages,
      idGenre: this.bookForm.value.genre,
      idAuthor: this.bookForm.value.author,
      idPublisher: this.bookForm.value.publisher,
      Description: this.bookForm.value.description
    };
    if(this.isEditing){
      this.api.editBook(book)
        .subscribe(()=>{
          this.api.Update();
          this.onFinish.emit();
        });
    }
    else{
      let valid = true;
      //Check if book with given ISBN exists already
      this.api.books.forEach((b)=>{
        if(book.ISBN == b.ISBN){
          Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          }).fire({
            icon: 'error',
            title: 'ISBN already exists!'
          });
          valid = false;
        }
      });
      if(!valid) return;
      this.api.addBook(book)
        .subscribe(()=>{
          this.api.Update();
          this.onFinish.emit();
        });
    }
  }
}
