import { Component, OnInit } from '@angular/core';
import { Players, PlayersService } from './shared';

export class Player {
  id: number
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Twig';
  playerList: Players[] = [];

  constructor(
    private _playerservice: PlayersService) {}

  ngOnInit() {
    this._playerservice.getPlayers().then(players => this.playerList = players);
  }
}


