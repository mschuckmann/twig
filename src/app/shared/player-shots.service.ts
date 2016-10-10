import { Injectable, EventEmitter } from '@angular/core';
import { PlayerShots } from './player-shots.model';

@Injectable()
export class PlayerShotsService {
  playerShotsUpdated:EventEmitter<PlayerShots> = new EventEmitter<PlayerShots>();

  constructor() { this.player_shots = new Array<PlayerShots>(); }

  addPlayerShot(shotId: string, playerId: number) {
    let ps = new PlayerShots(shotId, playerId);
    this.player_shots.push(ps);
    this.playerShotsUpdated.emit(ps);
  }

  getPlayerShots(): Promise<PlayerShots[]>{
    return Promise.resolve(this.player_shots);
  }


  player_shots: PlayerShots [];
}
