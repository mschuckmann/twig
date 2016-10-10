/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerStatsService } from './player-stats.service';

describe('Service: PlayerStats', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerStatsService]
    });
  });

  it('should ...', inject([PlayerStatsService], (service: PlayerStatsService) => {
    expect(service).toBeTruthy();
  }));
});
