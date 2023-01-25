import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardimagepipe'
})
export class CardimagepipePipe implements PipeTransform {

  transform(value) {
    let a = "../../../../assets/card/"+value+".png";
    return a
  }

}
