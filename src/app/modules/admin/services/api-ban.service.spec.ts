import { TestBed } from '@angular/core/testing';

import { ApiBanService } from './api-ban.service';

describe('ApiBanService', () => {
  let service: ApiBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
