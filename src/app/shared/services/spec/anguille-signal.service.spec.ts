import { TestBed } from '@angular/core/testing';

import { AnguilleSignalService } from './anguille-signal.service';

describe('AnguilleSignalService', () => {
  let service: AnguilleSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnguilleSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
