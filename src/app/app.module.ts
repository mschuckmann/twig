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

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    PolymerElement('vaadin-grid'),
    PlayerStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    MaterialModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PlayersService, ShotsService, PlayerShotsService, PlayerStatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
