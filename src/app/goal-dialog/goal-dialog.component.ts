import { Component, ViewChild, OnInit, AfterViewInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { Players, PlayersService, ShotType, Shots, ShotsService, PlayerShotsService, PlayerShots, PlayerStats, PlayerStatsService, ForeAgainst } from '../shared';
import { PolymerElement } from '@vaadin/angular2-polymer';

@Component({
  selector: 'app-goal-dialog',
  templateUrl: './goal-dialog.component.html',
  styleUrls: ['./goal-dialog.component.css'],
})
export class GoalDialogComponent implements OnInit{
    playerList: Players[] = [];

  @ViewChild('paperDialog') paperDialog : any;

  goalScorer : any;
  assist1 : any;
  assist2 : any;

  constructor(
    private _playerservice: PlayersService,
    private _shotservice: ShotsService,
    private _playershotservice: PlayerShotsService
    ) {}

  ngOnInit() {
    this._playerservice.getPlayers().then(players => this.playerList = players);
  }

  open() {
    this.goalScorer = "";
    this.assist1 = "";
    this.assist2 = "";
    console.log("open dialog: " + this.paperDialog);
    var dlg = this.paperDialog.nativeElement;
    dlg.open();
  }

  @Output() confirmed: EventEmitter<Shots> = new EventEmitter<Shots>();

  onClose(event : any) {
    if( event.detail.confirmed ) {
      console.log("goalDialog confirmed: ");
      var aShot = this._shotservice.newShot();
      aShot.fore = ForeAgainst.FORE;
      aShot.type = ShotType.GOAL;

      console.log("Goal Scorer: " + this.goalScorer );

      aShot.shooterPlayerId = Number(this.goalScorer);
      aShot.assist1PlayerId = Number(this.assist1);
      aShot.assist2PlayerId = Number(this.assist2);
      this.confirmed.emit(aShot);
    }
    else {
      console.log("goalDialog canceled: ");
    }
  }

}
