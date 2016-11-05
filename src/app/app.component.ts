import { Component, ElementRef, OnInit, ViewChild, ContentChild, ViewChildren } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { Players, PlayersService, ShotType, Shots, ShotsService,
         PlayerShotsService, PlayerShots, ForeAgainst, Strength,
         PlayerStatsService,  PlayerStats, WindowRefService } from './shared';
import { GoalDialogComponent } from './goal-dialog/goal-dialog.component';
import { FaceOffDialogComponent } from './face-off-dialog/face-off-dialog.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { ActivePlayerPipe } from './active-player.pipe';

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

    let DELIM = "%2C";
    let body = ["#","name",
                "sef", "mef", "bef", "gef"  ,  "sea", "mea", "bea", "gea",
                "sppf","mppf","bppf","gppf" ,  "sppa","mppa","bppa","gppa",
                "sshf","mshf","bshf","gshf" ,  "ssha","msha","bsha","gsha",
                "Goals","Assists","FOW","FOL","corsi%0A"].join(DELIM);

    for(let s of this._playerstatsservce.getPlayerStats()) {
      body += [String(s.player.number), s.player.last_name,
      //Shots FORE/EVEN
              s.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.EVEN),
              s.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.EVEN),
              s.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.EVEN),
              s.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.EVEN),
      //Shots AGAINST/EVEN
              s.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.EVEN),
              s.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.EVEN),
              s.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.EVEN),
              s.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.EVEN),

      //Shots FORE/PP
              s.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.POWER_PLAY) ,
              s.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.POWER_PLAY) ,
              s.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.POWER_PLAY),
              s.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.POWER_PLAY) ,
      //Shots AGAINST/PP
              s.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.POWER_PLAY) ,
              s.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.POWER_PLAY) ,
              s.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.POWER_PLAY),
              s.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.POWER_PLAY) ,

      //Shots FORE/SH
              s.shotStat(ShotType.SAVE, ForeAgainst.FORE, Strength.SHORT_HANDED),
              s.shotStat(ShotType.MISS, ForeAgainst.FORE, Strength.SHORT_HANDED),
              s.shotStat(ShotType.BLOCK, ForeAgainst.FORE, Strength.SHORT_HANDED),
              s.shotStat(ShotType.GOAL, ForeAgainst.FORE, Strength.SHORT_HANDED),
      //Shots AGAINST/SH
              s.shotStat(ShotType.SAVE, ForeAgainst.AGAINST, Strength.SHORT_HANDED) ,
              s.shotStat(ShotType.MISS, ForeAgainst.AGAINST, Strength.SHORT_HANDED) ,
              s.shotStat(ShotType.BLOCK, ForeAgainst.AGAINST, Strength.SHORT_HANDED),
              s.shotStat(ShotType.GOAL, ForeAgainst.AGAINST, Strength.SHORT_HANDED) ,

              s.goalsScored(),
              s.assists(),
              s.faceOffsWon(),
              s.faceOffsLost(),
              s.corsi() ].join(DELIM);
    }

    body += "%0A%0AShots%0A";

    body += ["shot","type","goal","assist1","assist2","Strength","Fore%0A"].join(DELIM);

    for( let s of this.getShots() ) {
        [s.id,
         s.type,
         s.shooterPlayerId,
         s.assist1PlayerId,
         s.assist2PlayerId].join(DELIM);
        switch(s.strength) {
          case Strength.EVEN:
            body += "E"+DELIM;
            break;
          case Strength.POWER_PLAY:
            body += "PP"+DELIM;
            break;
          case Strength.SHORT_HANDED:
            body += "Sh"+DELIM;
            break;
        }
        if(s.fore == ForeAgainst.FORE)
          body +=  "F%0A";
        else
          body += "A%0A";
    }

    body += "%0A%0APlayerShots%0A";

    body += ["shot","Player%0A"].join(DELIM);

    for( let ps of this.getPlayerShots() ) {
        body += ps.shotId + DELIM;
        body += ps.playerId;
        body += "%0A";
    }

    this.winRef.nativeWindow.open('mailto:matt@schuckmannacres.com?subject=Game%20Stats&body=' + body);
  }
}


