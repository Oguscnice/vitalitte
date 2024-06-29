import { TestBed } from '@angular/core/testing';

import { AdminDataSignalService } from './admin-data-signal.service';

describe('AdminDataSignalService', () => {
  let service: AdminDataSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDataSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
