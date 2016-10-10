import { Component, OnInit } from '@angular/core';
import {DataTableModule} from "angular2-datatable";
import { Players, PlayersService, ShotType, Shots, ShotsService, PlayerShotsService, PlayerShots, PlayerStats, PlayerStatsService } from '../shared';


@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  grid = document.querySelector("angular-grid vaadin-grid");
//  playerList: Players[] = [];
//  playershotList: PlayerShots[] = [];
//  shotsList: Shots[] = [];
  playerstatsList: PlayerStats[] = [];

  constructor(
//    private _playerservice: PlayersService,
//    private _shotservice: ShotsService,
//    private _playershotservice: PlayerShotsService
      private _playerstatsservice: PlayerStatsService
      ) {}

  ngOnInit() {
//    this._playerservice.getPlayers().then(players => this.playerList = players);
    //this._playershotservice.getPlayerShots().then(ps => this.playershotList = ps);
    //this._shotservice.getShots().then(s => this.shotsList = s);
    this.playerstatsList = this._playerstatsservice.getPlayerStats();

    this._playerstatsservice.playerShotsUpdated.subscribe( (stats) => {
//      this.grid.
    });
  }


/*
  getPlayerSavesFore( playerId: number ): number {
    var count = 10;
    console.log( "calcualting savesFore" );
    for( let sp of this._playershotservice.player_shots) {
      //console.log( "playerShot.playerId: " + sp.playerId);
      if(sp.playerId == playerId) {
        let s = this._shotservice.getShot(sp.shotId);
        //console.log( "shot.shotFore: " + s.shotFore );
        if(s.shotFore)
          ++count;
          //console.log( "count: " + count );
      }
    }
    console.log( "count: " + count );
    return count;
  }
*/
}
