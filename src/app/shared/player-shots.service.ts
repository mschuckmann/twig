import { Injectable } from '@angular/core';
import { PlayerShots } from './player-shots.model';

@Injectable()
export class PlayerShotsService {

  constructor() { this.player_shots = new Array<PlayerShots>(); }

  addPlayerShot(shotId: string, playerId: number) {
    this.player_shots.push(new PlayerShots(shotId, playerId));
  }

  player_shots: PlayerShots [];
}
