import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { Players, PlayersService, ShotType, Shots, ShotsService,
         PlayerShotsService, PlayerShots, PlayerStats, PlayerStatsService, Strength, ForeAgainst } from '../shared';
import { IsSkaterPipe } from "../is-skater.pipe";

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit, AfterViewInit {
  playerstatsList: PlayerStats[] = [];
  shotsList: Shots[] = [];

  public ShotType = ShotType;
  public ForeAgainst = ForeAgainst;
  public Strength = Strength;

  constructor(
      private _playerstatsservice: PlayerStatsService,
      private _shotsservice: ShotsService
      ) {}

  ngOnInit() {
    this.playerstatsList = this._playerstatsservice.getPlayerStats();
    this._shotsservice.getShots().then(shots => this.shotsList = shots);

    this._playerstatsservice.playerShotsUpdated.subscribe( (stats) => {
    });
  }

  ngAfterViewInit() {
  }


}
