import { Injectable } from '@angular/core';
import { Players } from './players.model';

@Injectable()
export class PlayersService {

  constructor() {}
  getPlayers(): Promise<Players[]>{
    return Promise.resolve(PLAYERDATA);
  }
}

const PLAYERDATA: Players[] = [
  new Players('Ethan', 'Hass', 9, 'w', 'yellow'),
  new Players('Markus', 'Hanson', 11, 'c', 'yellow'),
  new Players( 'Cole', 'Agnew', 12, 'w', 'red'),
  new Players( 'Piercen', 'Garcia', 10, 'c', 'red'),
  new Players( 'Trent', 'Nesbitt', 8, 'w', 'red'),
  new Players('Sutter', 'Carson', 21, 'w', 'blue'),
  new Players('Tayz', 'Rurak', 19, 'c', 'blue'),
  new Players('Dylan', 'Lancial', 17, 'w', 'blue'),
  new Players('Nick', 'Molitor', 16, 'w', 'blue'),
  new Players('Sam', 'Jewett', 6, 'd', 'p1'),
  new Players('Solomon', 'Wells', 7, 'd', 'p1'),
  new Players('Kevin', 'Salewski', 18, 'd', 'p2'),
  new Players('Kayla', 'Hanson', 4, 'd', 'p2'),
  new Players('Mack', 'Ashbaugh', 20, 'd', 'p3'),
  new Players('Connor', 'Schuckmann', 5, 'w', 'yellow'),
  new Players('Bryce', 'Robin', 2, 'd', 'p3'),
  new Players('Dylan', 'Thomas', 31, 'g', 'g'),
  new Players('Tristan', 'Scott', 1, 'g', 'g' )
];
