import { Injectable, EventEmitter } from '@angular/core';
import { PlayerStats } from './player-stats.model';
import { PlayersService } from './players.service';
import { ShotsService } from './shots.service';
import { PlayerShotsService } from './player-shots.service';
import { Players, ShotType, Shots, PlayerShots } from '.';

@Injectable()
export class PlayerStatsService {
  playerShotsUpdated:EventEmitter<PlayerStats> = new EventEmitter<PlayerStats>();

  //playersList : Players[] = [];
  playerStatsList : PlayerStats[] = [];

  constructor(
    private _playerservice: PlayersService,
    private _shotservice: ShotsService,
    private _playershotservice: PlayerShotsService) {

      this._playershotservice.playerShotsUpdated.subscribe(
        (ps) => {
          for(let playerStats of this.playerStatsList) {
            if(playerStats.player.number == ps.playerId)
              ++playerStats.shots;
            this.playerShotsUpdated.emit(playerStats);
          }
        }
      );
      _playerservice.getPlayers().then(value => {
        for(let p of value) {
          let ps = new PlayerStats();
          ps.player = p;
          ps.shots = 0;
          this.playerStatsList.push( ps);
        }
      });
    }

  getPlayerStats(): PlayerStats[] {
    console.log( "updating playerStats" );
    //Update all the stats.
    for(let playerStats of this.playerStatsList) {
      for( let sp of this._playershotservice.player_shots) {
        //console.log( "playerShot.playerId: " + sp.playerId);
        if(sp.playerId == playerStats.player.number) {
          ++playerStats.shots;
        }
      }
    }

    return this.playerStatsList;

  }
}
