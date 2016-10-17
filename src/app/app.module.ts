import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule} from "angular2-datatable";
import { MaterialModule } from '@angular/material';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { PlayersService } from './shared';
import { ShotsService } from './shared';
import { PlayerShotsService } from './shared';
import { PlayerStatsService } from './shared';
import { WindowRefService } from './shared';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { GoalDialogComponent } from './goal-dialog/goal-dialog.component';
import { IsSkaterPipe } from './is-skater.pipe';
import { PositionPipe } from './position.pipe';
import { OnTheIcePipe } from './on-the-ice.pipe';

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
    OnTheIcePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    MaterialModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PlayersService,
              ShotsService,
              PlayerShotsService,
              PlayerStatsService,
              WindowRefService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
