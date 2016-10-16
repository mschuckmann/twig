import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { Players, PlayersService, ShotType, Shots, ShotsService, PlayerShotsService, PlayerShots, GoalType} from './shared';
import { GoalDialogComponent } from './goal-dialog/goal-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Twig';
  playerList: Players[] = [];

  @ViewChild(GoalDialogComponent)
  goalDialog: GoalDialogComponent;

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
    this.recordShot(ShotType.SAVE, fore);
  }

  recordMiss(fore: boolean) {
    this.recordShot(ShotType.MISS, fore);
  }

  recordBlock(fore: boolean) {
    this.recordShot(ShotType.BLOCK, fore);
  }

  recordGoal(fore: boolean) {
    this.recordShot(ShotType.GOAL, fore);
  }

  recordShot(type: ShotType,
             fore: boolean ) {

    if(type == ShotType.GOAL && fore) {
      if( this.goalDialog ) {
        this.goalDialog.open();
      }
    } else {
      var aShot = this._shotservice.newShot();
      aShot.type = type;
      if(type == ShotType.GOAL)
        aShot.goalType = GoalType.EVEN;
      else
        aShot.goalType = GoalType.NO_GOAL;
      aShot.shotFore = fore;

      for (let p of this.playerList) {
        if(p.on_ice) {
          this._playershotservice.addPlayerShot(aShot.id, p.number);
        }
      }
    }
  } //end recordShot()

  onGoalConfirmed(aShot : Shots) {
    console.log("goal confirmed");

    for (let p of this.playerList) {
      if(p.on_ice) {
        this._playershotservice.addPlayerShot(aShot.id, p.number);
      }
    }
  }

}


