import { TestBed } from '@angular/core/testing';

import { ApiCollectionAdminService } from '../api-collection-admin.service';

describe('ApiCollectionAdminService', () => {
  let service: ApiCollectionAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCollectionAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
