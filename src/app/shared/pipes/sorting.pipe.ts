import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(array: any[], field:string, asc:boolean): any[] {
    if(field == 'Progress'){
      array.sort((a:any, b:any)=>{
        if(a[field]/a['Pages'] < b[field]/b['Pages'])
          return -1;
        else if(a[field]/a['Pages'] > b[field]/b['Pages'])
          return 1;
        else return 0;
      });
    }
    else array.sort((a:any, b:any)=>{
      if(a[field] < b[field])
        return -1;
      else if(a[field] > b[field])
        return 1;
      else return 0;
    });
    if(!asc) array.reverse();

    return array;
  }
}
