import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Author} from "../model/author.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-author-list',
  templateUrl: './admin-author-list.component.html',
  styleUrls: ['./admin-author-list.component.css']
})
export class AdminAuthorListComponent {
  editVisible: boolean = false;
  isEditing: boolean = false;
  currentAuthor !: Author;
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

  onEdit(author: Author) {
    this.isEditing = true;
    this.currentAuthor = author;
    this.editVisible = true;
  }

  delete(author: Author) {
    Swal.fire({
      title: `Are you sure you wish to delete the author '${author.Name} ${author.Surname}'?`,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#dc3545',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.api.deleteAuthor(author.idAuthor)
          .subscribe(()=>this.api.Update());
      }
    });
  }
}
