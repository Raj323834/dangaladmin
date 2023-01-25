import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipes'
})
export class FilterpipesPipe implements PipeTransform {
  transform(value: any, filteruserId:string ) {
    if(value.length === 0){
      return value;
    }
  }
}
