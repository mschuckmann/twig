import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { PlayersService } from './shared';
import { ShotsService } from './shared';
import { PlayerShotsService } from './shared';
import { PlayerStatsService } from './shared';
import { WindowRefService } from './shared';
import { FaceOffsService } from './shared';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { GoalDialogComponent } from './goal-dialog/goal-dialog.component';
import { IsSkaterPipe } from './is-skater.pipe';
import { PositionPipe } from './position.pipe';
import { OnTheIcePipe } from './on-the-ice.pipe';
import { FaceOffDialogComponent } from './face-off-dialog/face-off-dialog.component';
import { ActivePlayerPipe } from './active-player.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    PolymerElement('vaadin-grid'),
    PolymerElement('paper-dropdown-menu'),
    PolymerElement('paper-listbox'),
    PolymerElement('paper-button'),
    PlayerStatsComponent,
    GoalDialogComponent,
    IsSkaterPipe,
    PositionPipe,
    OnTheIcePipe,
    FaceOffDialogComponent,
    ActivePlayerPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PlayersService,
              ShotsService,
              PlayerShotsService,
              PlayerStatsService,
              WindowRefService,
              FaceOffsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
