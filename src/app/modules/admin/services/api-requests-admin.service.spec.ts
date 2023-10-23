import { TestBed } from '@angular/core/testing';

import { ApiRequestsAdminService } from './api-requests-admin.service';

describe('ApiRequestsAdminService', () => {
  let service: ApiRequestsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRequestsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
