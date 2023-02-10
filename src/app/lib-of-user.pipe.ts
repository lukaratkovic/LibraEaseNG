import { Pipe, PipeTransform } from '@angular/core';
import {LibraryEntry} from "./model/libraryEntry.model";
import {User} from "./model/user.model";

@Pipe({
  name: 'libOfUser'
})
export class LibOfUserPipe implements PipeTransform {

  transform(library: LibraryEntry[], user: User | undefined | null): LibraryEntry[] {
    return library.filter((entry)=>{
      return entry.User_idUser == user?.idUser;
    });
  }

}
