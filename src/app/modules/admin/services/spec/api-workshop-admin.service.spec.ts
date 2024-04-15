import { TestBed } from '@angular/core/testing';

import { ApiWorkshopAdminService } from '../api-workshop-admin.service';

describe('ApiWorkshopAdminService', () => {
  let service: ApiWorkshopAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWorkshopAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
