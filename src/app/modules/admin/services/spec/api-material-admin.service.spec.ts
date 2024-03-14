import { TestBed } from '@angular/core/testing';

import { ApiMaterialAdminService } from '../api-material-admin.service';

describe('ApiMaterialAdminService', () => {
  let service: ApiMaterialAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMaterialAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
