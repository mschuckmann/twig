import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Players, PlayersService, ShotType, Shots, ShotsService,
         PlayerShotsService, PlayerShots, PlayerStats, PlayerStatsService,
         ForeAgainst, FaceOffsService, FaceOffs } from '../shared';

@Component({
  selector: 'app-face-off-dialog',
  templateUrl: './face-off-dialog.component.html',
  styleUrls: ['./face-off-dialog.component.css']
})
export class FaceOffDialogComponent implements OnInit {
  playerList: Players[] = [];

  @Input("active-players") activePlayers: number[];

  constructor(
    private _playerservice: PlayersService,
    private _playerStats: PlayerStatsService) { }

  @ViewChild('paperDialog') paperDialog : any;

  playerID : any;
  _faceOffWon : boolean;
  btnText : String;

  ngOnInit() {
    this._playerservice.getPlayers().then(players => this.playerList = players);
  }

  faceOffWon() {
    this._faceOffWon = true;
  }

  faceOffLost() {
    this._faceOffWon = false;
  }

  open() {
    this.playerID = null;
    this._faceOffWon = true;
    this.btnText = "Won";
    var dlg = this.paperDialog.nativeElement;
    dlg.open();
  }

  @Output() confirmed: EventEmitter<[number,boolean]> = new EventEmitter<[number,boolean]>();

  onClose(event : any) {
    if( event.detail.confirmed ) {
      console.log("faceOff confirmed: ");
      this._playerStats.updatePlayerFaceOffs(this.playerID, this._faceOffWon);
      this.confirmed.emit([this.playerID,this._faceOffWon]);
    }
    else {
      console.log("faceOff canceled: ");
    }
  }


}
