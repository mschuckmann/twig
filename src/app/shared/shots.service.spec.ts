/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShotsService } from './shots.service';

describe('Service: Shots', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShotsService]
    });
  });

  it('should ...', inject([ShotsService], (service: ShotsService) => {
    expect(service).toBeTruthy();
  }));
});
