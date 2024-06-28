import { TestBed } from '@angular/core/testing';

import { AdminMaterialSignalService } from '../admin-material-signal.service';

describe('AdminMaterialSignalService', () => {
  let service: AdminMaterialSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMaterialSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
