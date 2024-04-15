import { TestBed } from '@angular/core/testing';

import { ApiInscriptionAdminService } from '../api-inscription-admin.service';

describe('ApiInscriptionAdminService', () => {
  let service: ApiInscriptionAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInscriptionAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
