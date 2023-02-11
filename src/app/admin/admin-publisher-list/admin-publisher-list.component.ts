import { Component } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Publisher} from "../../shared/model/publisher.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-publisher-list',
  templateUrl: './admin-publisher-list.component.html',
  styleUrls: ['./admin-publisher-list.component.css']
})
export class AdminPublisherListComponent {
  editVisible : boolean = false;
  isEditing : boolean = false;
  currentPublisher !: Publisher;

  constructor(public api : ApiService) {
    api.Update();
  }

  onNew() {
    this.editVisible = true;
    this.isEditing = false;
  }

  finishEdit() {
    this.editVisible = false;
  }

  onEdit(publisher: Publisher) {
    this.isEditing = true;
    this.currentPublisher = publisher;
    this.editVisible = true;
  }

  delete(publisher: Publisher) {
    Swal.fire({
      title: `Are you sure you wish to delete '${publisher.Name}'?`,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#dc3545',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.api.deletePublisher(publisher.idPublisher)
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
                title: "Could not delete. Delete all books from this publisher first!"
              });
            }
          });
      }
    });
  }
}
