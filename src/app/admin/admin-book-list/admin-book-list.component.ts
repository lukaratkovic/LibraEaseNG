import { Component } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Book} from "../../shared/model/book.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css']
})
export class AdminBookListComponent {
  editVisible: boolean = false;
  isEditing: boolean = false;
  currentBook !: Book;
  sortingField = 'ISBN';
  asc = true;
  constructor(public api : ApiService) {
    api.Update();
  }

  onNew() {
    this.isEditing = false;
    this.editVisible = true;
  }

  finishEdit() {
    this.editVisible = false;
  }

  onEdit(book: Book) {
    this.isEditing = true;
    this.currentBook = book;
    this.editVisible = true;
  }

  delete(book: Book) {
    Swal.fire({
      title: `Are you sure you wish to delete the book '${book.Title}'?`,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#dc3545',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.api.deleteBook(book.ISBN)
          .subscribe(()=>this.api.Update());
      }
    });
  }

  setSort(field: string) {
    if(this.sortingField == field)
      this.asc = !this.asc;
    this.sortingField = field;
  }
}
