/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaceOffsService } from './face-offs.service';

describe('Service: FaceOffs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaceOffsService]
    });
  });

  it('should ...', inject([FaceOffsService], (service: FaceOffsService) => {
    expect(service).toBeTruthy();
  }));
});
