import { Pipe, PipeTransform } from '@angular/core';
import { PlayerStats } from './shared/player-stats.model';

@Pipe({
  name: 'isSkater',
  pure: false
})
export class IsSkaterPipe implements PipeTransform {

  transform(value: PlayerStats[], goalies: boolean): any {
    if( goalies ) {
      return value.filter((item)=> item.player.position === 'g');
    } else {
      return value.filter((item)=> item.player.position !== 'g');
    }
  }
}
