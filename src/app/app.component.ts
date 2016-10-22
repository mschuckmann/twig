import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { Players, PlayersService, ShotType, Shots, ShotsService,
         PlayerShotsService, PlayerShots, ForeAgainst, Strength,
         WindowRefService } from './shared';
import { GoalDialogComponent } from './goal-dialog/goal-dialog.component';
import { FaceOffDialogComponent } from './face-off-dialog/face-off-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Twig';
  public ForeAgainst = ForeAgainst;

  playerList: Players[] = [];
  playersActive: number[] = [];

  @ViewChild(GoalDialogComponent)
  goalDialog: GoalDialogComponent;

  @ViewChild(FaceOffDialogComponent)
  faceOffDialog: FaceOffDialogComponent;

  onPP : any;
  onSH : any;

  constructor(
    private _playerservice: PlayersService,
    private _shotservice: ShotsService,
    private _playershotservice: PlayerShotsService,
    private winRef : WindowRefService ) {}

  ngOnInit() {
    this._playerservice.getPlayers().then(players => this.playerList = players);
    this.onPP = false;
    this.onSH = false;
  }

  togglePlayerActive(selplayer) {
    let found = this.playersActive.indexOf(selplayer);
    if( -1 == found ) {
      console.log( "Activating player " + selplayer );
      this.playersActive.push(selplayer);
    } else {
      console.log( "Dectivating player " + selplayer );
      this.playersActive.splice(found, 1);
    }
  }

  isPlayerActive(selplayer) {
    return -1 != this.playersActive.indexOf(selplayer);
  }
  getShots() : Shots [] {
    return this._shotservice._shots;
  }

  getPlayerShots() : PlayerShots[] {
    return this._playershotservice.player_shots;
  }

  recordSave(fore: ForeAgainst) {
    this.recordShot(ShotType.SAVE, fore);
  }

  recordMiss(fore: ForeAgainst) {
    this.recordShot(ShotType.MISS, fore);
  }

  recordBlock(fore: ForeAgainst) {
    this.recordShot(ShotType.BLOCK, fore);
  }

  recordGoal(fore: ForeAgainst) {
    this.recordShot(ShotType.GOAL, fore);
  }

  recordShot(type: ShotType,
             fore: ForeAgainst ) {

    if(type == ShotType.GOAL && fore == ForeAgainst.FORE) {
      if( this.goalDialog ) {
        this.goalDialog.open();
      }
    } else {
      var aShot = this._shotservice.newShot();
      aShot.type = type;
      if(this.onPP)
        aShot.strength = Strength.POWER_PLAY;
      else if(this.onSH)
        aShot.strength = Strength.SHORT_HANDED;
      else
        aShot.strength = Strength.EVEN;
      aShot.fore = fore;

      for (let p of this.playerList) {
        if(this.isPlayerActive(p.number)) {
          this._playershotservice.addPlayerShot(aShot.id, p.number);
        }
      }
    }
  } //end recordShot()

  onGoalConfirmed(aShot : Shots) {
    //console.log("goal confirmed");

    for (let p of this.playerList) {
      if(this.isPlayerActive(p.number)) {
        this._playershotservice.addPlayerShot(aShot.id, p.number);
      }
    }
  }

  recordFaceOff() {
    if( this.faceOffDialog )
      this.faceOffDialog.open();
  }

  onFaceOffConfirmed(result : [number, boolean]) {

  }

  eMailData() {
    this.winRef.nativeWindow.open('mailto:matt@schuckmannacres.com?subject=subject&body=body');
  }
}


