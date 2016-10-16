import { Pipe, PipeTransform } from '@angular/core';
import { Players } from './shared/players.model';

@Pipe({
  name: 'onTheIce',
  pure: false
})
export class OnTheIcePipe implements PipeTransform {

  transform(value: Players[], args?: any): any {
    return value.filter((item)=> item.on_ice );
  }


}
