import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {ApiService} from "../../shared/services/api.service";
import {Genre} from "../../shared/model/genre.model";

@Component({
  selector: 'app-admin-genre-list',
  templateUrl: './admin-genre-list.component.html',
  styleUrls: ['./admin-genre-list.component.css']
})
export class AdminGenreListComponent {
  editVisible : boolean = false;
  isEditing : boolean = false;
  currentGenre !: Genre;

  constructor(public api : ApiService) {
    api.Update();
  }

  onNew(){
    this.isEditing = false;
    this.editVisible = true;
  }

  onEdit(genre : Genre){
    this.isEditing = true;
    this.currentGenre = genre;
    this.editVisible = true;
  }

  finishEdit(){
    this.editVisible = false;
  }

  delete(genre : Genre) {
    Swal.fire({
      title: `Are you sure you wish to delete the '${genre.Genre}' genre?`,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#dc3545',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.api.deleteGenre(genre.idGenre)
          .subscribe(res => {
            if(res.status == 'OK') this.api.Update();
            else{
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
                title: "Could not delete. Delete all books with genre first!"
              });
            }
          });
      }
    });
  }
}
