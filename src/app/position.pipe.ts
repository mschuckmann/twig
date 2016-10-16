import { Pipe, PipeTransform } from '@angular/core';
import { PlayerStats } from './shared/player-stats.model';

@Pipe({
  name: 'position',
  pure: false
})
export class PositionPipe implements PipeTransform {

  transform(value: PlayerStats[], positions : string): any {
    return value.filter((item)=> positions.indexOf(item.player.position) !== -1);
  }

}
