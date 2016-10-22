import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Players, PlayersService, ShotType, Shots, ShotsService, PlayerShotsService, PlayerShots, PlayerStats, PlayerStatsService, ForeAgainst } from '../shared';

@Component({
  selector: 'app-face-off-dialog',
  templateUrl: './face-off-dialog.component.html',
  styleUrls: ['./face-off-dialog.component.css']
})
export class FaceOffDialogComponent implements OnInit {
  playerList: Players[] = [];

  constructor(
    private _playerservice: PlayersService) { }

  @ViewChild('paperDialog') paperDialog : any;

  playerID : any;
  faceOffWon : boolean;
  btnText : String;

  ngOnInit() {
    this._playerservice.getPlayers().then(players => this.playerList = players);

    this.faceOffWon = false;
    if(this.faceOffWon) {
      this.btnText = "Won";
    } else {
      this.btnText = "Lost";
    }
  }

  toggleWonLost() {
    this.faceOffWon = !this.faceOffWon;
    if(this.faceOffWon) {
      this.btnText = "Won";
    } else {
      this.btnText = "Lost";
    }
  }

  open() {
    this.playerID = null;
    this.faceOffWon = true;
    this.btnText = "Won";
    var dlg = this.paperDialog.nativeElement;
    dlg.open();
  }

  @Output() confirmed: EventEmitter<[number,boolean]> = new EventEmitter<[number,boolean]>();

  onClose(event : any) {
    if( event.detail.confirmed ) {
      console.log("faceOff confirmed: ");

      console.log("Player: " + this.playerID );
      this.confirmed.emit([this.playerID,this.faceOffWon]);
    }
    else {
      console.log("faceOff canceled: ");
    }
  }


}
