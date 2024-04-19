import { TestBed } from '@angular/core/testing';

import { ApiPublicationAdminService } from '../api-publication-admin.service';

describe('ApiPublicationAdminService', () => {
  let service: ApiPublicationAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPublicationAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
