/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerShotsService } from './player-shots.service';

describe('Service: PlayerShots', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerShotsService]
    });
  });

  it('should ...', inject([PlayerShotsService], (service: PlayerShotsService) => {
    expect(service).toBeTruthy();
  }));
});
