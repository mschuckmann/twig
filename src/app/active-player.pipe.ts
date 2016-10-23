import { Pipe, PipeTransform } from '@angular/core';
import { Players } from './shared/players.model';

@Pipe({
  name: 'activePlayer',
  pure: false
})
export class ActivePlayerPipe implements PipeTransform {

  transform(value: Players[], activePlayers: number[]): any {
    return value.filter( player => activePlayers.indexOf(player.number) != -1) ;
  }

}
