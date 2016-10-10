import { Component,ElementRef, OnInit } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { Players, PlayersService, ShotType, Shots, ShotsService, PlayerShotsService, PlayerShots } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Twig';
  playerList: Players[] = [];

  constructor(
    private _playerservice: PlayersService,
    private _shotservice: ShotsService,
    private _playershotservice: PlayerShotsService) {}

  ngOnInit() {
    this._playerservice.getPlayers().then(players => this.playerList = players);
  }

  togglePlayerActive(selplayer) {
    selplayer.on_ice = !selplayer.on_ice;
  }

  getShots() : Shots [] {
    return this._shotservice._shots;
  }

  getPlayerShots() : PlayerShots[] {
    return this._playershotservice.player_shots;
  }

  recordSave(fore: boolean) {
    this.recordShot( ShotType.SAVE, fore, false, false);
  }

  recordMiss(fore: boolean) {
    this.recordShot( ShotType.MISS, fore, false, false);
  }

  recordBlock(fore: boolean) {
    this.recordShot( ShotType.BLOCK, fore, false, false);
  }

  recordGoal(fore: boolean) {
    this.recordShot( ShotType.GOAL, fore, false, false);
  }

  recordShot(type: ShotType,
             fore: boolean,
             powerPlay: boolean,
             shortHanded: boolean,
             shooter?: number,
             assist1?: number,
             assist2?: number ) {
    var aShot = this._shotservice.newShot();
    aShot.type = type;
    aShot.powerPlay = powerPlay;
    aShot.shortHanded = shortHanded;
    aShot.shotFore = fore;
    if(shooter)
      aShot.shooterPlayerId = shooter;
    if(assist1)
      aShot.assist1PlayerId = assist1;
    if(assist2)
      aShot.assist2PlayerId = assist2;

    for (let p of this.playerList) {
      if(p.on_ice) {
        this._playershotservice.addPlayerShot(aShot.id, p.number);
      }
    }

    if(type == ShotType.GOAL && fore) {
      var alignedDialog :any = document.getElementById('alignedDialog');
      if( alignedDialog ) {
        alignedDialog.open();
      }
    }
  } //end recordShot()

}


