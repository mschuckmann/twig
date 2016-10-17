import { Injectable, EventEmitter } from '@angular/core';
import { PlayerStats } from './player-stats.model';
import { PlayersService } from './players.service';
import { ShotsService } from './shots.service';
import { PlayerShotsService } from './player-shots.service';
import { Players, ShotType, Shots, PlayerShots, ForeAgainst } from '.';

@Injectable()
export class PlayerStatsService {
  playerShotsUpdated:EventEmitter<PlayerStats> = new EventEmitter<PlayerStats>();

  //playersList : Players[] = [];
  playerStatsList : PlayerStats[] = [];

  constructor(
    private _playerservice: PlayersService,
    private _shotservice: ShotsService,
    private _playershotservice: PlayerShotsService) {

    //Initialize our list of player status, 1 per player.
    _playerservice.getPlayers().then(value => {
      for(let p of value) {
        let ps = new PlayerStats();
        ps.player = p;
        this.playerStatsList.push( ps);
      }
    });


    //Subscribe to change in the playerShots service.
    //Whenever a playerShot is added update that players stats.
    this._playershotservice.playerShotsUpdated.subscribe(
      (ps) => {
        this.updatePlayerStats(ps);
      }
    );
  }

  updatePlayerStats(ps: PlayerShots) {
    for(let playerStats of this.playerStatsList) {
        if(playerStats.player.number == ps.playerId) {
          let shot = this._shotservice.getShot(ps.shotId);
          let goal = ((shot.type == ShotType.GOAL) &&
              (shot.fore == ForeAgainst.FORE) &&
              (shot.shooterPlayerId == playerStats.player.number));
          let assist = ((shot.type == ShotType.GOAL) &&
              (shot.fore == ForeAgainst.FORE) &&
              ((shot.assist1PlayerId == playerStats.player.number) ||
              (shot.assist2PlayerId == playerStats.player.number)));

          playerStats.updateShots(shot.type, shot.fore, shot.strength, goal, assist);
        }
        //Let others know the players stats table has been updated.
        this.playerShotsUpdated.emit(playerStats);
      }
  }

  getPlayerStats(): PlayerStats[] {
    console.log( "updating playerStats" );
//    //Update all the stats.
//    for(let playerStats of this.playerStatsList) {
//      for( let sp of this._playershotservice.player_shots) {
//        //console.log( "playerShot.playerId: " + sp.playerId);
//        if(sp.playerId == playerStats.player.number) {
//          ++playerStats.shots;
//        }
//      }
//    }

    return this.playerStatsList;

  }
}
