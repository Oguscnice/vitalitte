import { TestBed } from '@angular/core/testing';

import { AdminPublicationSignalService } from '../admin-publication-signal.service';

describe('AdminPublicationSignalService', () => {
  let service: AdminPublicationSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPublicationSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
