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
  { first_name: 'Connor', last_name: 'Schuckmann', number: 5, position: 'w', line: 'yellow' },
  { first_name: 'Ethan', last_name: 'Haas', number: 9, position: 'w', line: 'yellow' },
  { first_name: 'Markus', last_name: 'Hanson', number: 11, position: 'c', line: 'yellow' },
  { first_name: 'Cole', last_name: 'Agnew', number: 12, position: 'w', line: 'red' },
  { first_name: 'Piercen', last_name: 'Garcia', number: 10, position: 'c', line: 'red' },
  { first_name: 'Trent', last_name: 'Nesbitt', number: 8, position: 'w', line: 'red' },
  { first_name: 'Sutter', last_name: 'Carson', number: 21, position: 'w', line: 'blue' },
  { first_name: 'Tayz', last_name: 'Rurak', number: 19, position: 'c', line: 'blue' },
  { first_name: 'Dylan', last_name: 'Lancial', number: 17, position: 'w', line: 'blue' },
  { first_name: 'Sam', last_name: 'Jewett', number: 6, position: 'd', line: 'p1' },
  { first_name: 'Solomon', last_name: 'Wells', number: 7, position: 'd', line: 'p1' },
  { first_name: 'Kevin', last_name: 'Salewski', number: 18, position: 'd', line: 'p2' },
  { first_name: 'Kayla', last_name: 'Hanson', number: 4, position: 'd', line: 'p2' },
  { first_name: 'Mack', last_name: 'Ashbaugh', number: 20, position: 'd', line: 'p3' },
  { first_name: 'Bryce', last_name: 'Robin', number: 2, position: 'd', line: 'p3' },

];
