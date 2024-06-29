import { TestBed } from '@angular/core/testing';

import { AdminWorkshopSignalService } from '../admin-workshop-signal.service';

describe('AdminWorkshopSignalService', () => {
  let service: AdminWorkshopSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWorkshopSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
