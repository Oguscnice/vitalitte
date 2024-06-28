import { TestBed } from '@angular/core/testing';

import { AdminCollectionSignalService } from './admin-collection.service';

describe('AdminCollectionSignalService', () => {
  let service: AdminCollectionSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCollectionSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
