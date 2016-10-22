import { Component, ElementRef, OnInit, ViewChild, ContentChild, ViewChildren } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { Players, PlayersService, ShotType, Shots, ShotsService,
         PlayerShotsService, PlayerShots, ForeAgainst, Strength,
         PlayerStatsService,  PlayerStats, WindowRefService } from './shared';
import { GoalDialogComponent } from './goal-dialog/goal-dialog.component';
import { FaceOffDialogComponent } from './face-off-dialog/face-off-dialog.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';

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

  // @ViewChild(PlayerStatsComponent)
  // playerStats: PlayerStatsComponent;
  //@ViewChild()  playerStats;
  //@ContentChild(any) playerStats;


  onPP : any;
  onSH : any;

  constructor(
    private _playerservice: PlayersService,
    private _shotservice: ShotsService,
    private _playershotservice: PlayerShotsService,
    private _playerstatsservce: PlayerStatsService,
    private winRef : WindowRefService,
     ) {}

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

    if(this.onPP)
      aShot.strength = Strength.POWER_PLAY;
    else if(this.onSH)
      aShot.strength = Strength.SHORT_HANDED;
    else
      aShot.strength = Strength.EVEN;

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
    let body = "#%2Cname%2C";
    body += "sef%2Cmef%2Cbef%2Cgef%2C" + "sea%2Cmea%2Cbea%2Cgea%2C";
    body += "sppf%2Cmppf%2Cbppf%2Cgppf%2C" + "sppa%2Cmppa%2Cbppa%2Cgppa%2C";
    body += "sshf%2Cmshf%2Cbshf%2Cgshf%2C" + "ssha%2Cmsha%2Cbsha%2Cgsha%2C";
    body += "corsi%2CGoals%2CAssists%2CFOW%2CFOL%0A";
    for(let s of this._playerstatsservce.getPlayerStats()) {
      body += String(s.player.number) + "%2C";
      body += s.player.last_name + "%2C";
      //Shots FORE/EVEN
      body += s.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.EVEN) + "%2C";
      body += s.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.EVEN) + "%2C";
      body += s.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.EVEN) + "%2C";
      body += s.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.EVEN) + "%2C";
      //Shots AGAINST/EVEN
      body += s.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.EVEN) + "%2C";
      body += s.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.EVEN) + "%2C";
      body += s.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.EVEN) + "%2C";
      body += s.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.EVEN) + "%2C";

      //Shots FORE/PP
      body += s.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.POWER_PLAY) + "%2C";
      body += s.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.POWER_PLAY) + "%2C";
      body += s.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.POWER_PLAY) + "%2C";
      body += s.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.POWER_PLAY) + "%2C";
      //Shots AGAINST/PP
      body += s.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.POWER_PLAY) + "%2C";
      body += s.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.POWER_PLAY) + "%2C";
      body += s.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.POWER_PLAY) + "%2C";
      body += s.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.POWER_PLAY) + "%2C";

      //Shots FORE/SH
      body += s.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.SHORT_HANDED) + "%2C";
      body += s.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.SHORT_HANDED) + "%2C";
      body += s.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.SHORT_HANDED) + "%2C";
      body += s.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.SHORT_HANDED) + "%2C";
      //Shots AGAINST/SH
      body += s.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.SHORT_HANDED) + "%2C";
      body += s.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.SHORT_HANDED) + "%2C";
      body += s.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.SHORT_HANDED) + "%2C";
      body += s.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.SHORT_HANDED) + "%2C";

      body += s.corsi() + "%2C";
      body += s.goalsScored() + "%2C";
      body += s.assists() + "%2C";
      body += s.faceOffsWon() + "%2C";
      body += s.faceOffsLost() + "%0A";
    }

    body += "%0A%0A%0A";

    body += "shot%2Cgoal%2Cassist1%2Cassist2%2CStrength%2CFore%0A";

    for( let s of this.getShots() ) {
      if( s.type == ShotType.GOAL) {
        body += s.id + "%2C";
        body += s.shooterPlayerId + "%2C";
        body += s.assist1PlayerId + "%2C";
        body += s.assist2PlayerId + "%2C";
        switch(s.strength) {
          case Strength.EVEN:
            body += "E%2C";
            break;
          case Strength.POWER_PLAY:
            body += "PP%2C";
            break;
          case Strength.SHORT_HANDED:
            body += "Sh%2C";
            break;
        }
        if(s.fore == ForeAgainst.FORE)
          body +=  "F%0A";
        else
          body += "A%0A";
      }
    }

    this.winRef.nativeWindow.open('mailto:matt@schuckmannacres.com?subject=Game%20Stats&body=' + body);
  }
}


