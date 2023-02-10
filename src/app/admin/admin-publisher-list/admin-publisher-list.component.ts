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
          .subscribe(res => this.api.Update());
      }
    });
  }
}
