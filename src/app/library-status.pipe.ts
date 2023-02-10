import { Pipe, PipeTransform } from '@angular/core';
import {LibraryEntry} from "./model/libraryEntry.model";

@Pipe({
  name: 'libraryStatus'
})
export class LibraryStatusPipe implements PipeTransform {

  transform(library: LibraryEntry[], filter: string): LibraryEntry[] {
    return library.filter(entry => {
      return entry.status == 'reading' || entry.status=='finished' && filter=='all';
    });
  }

}
