import { TestBed } from '@angular/core/testing';

import { ApiCategoryAdminService } from '../api-category-admin.service';

describe('ApiCategoryAdminService', () => {
  let service: ApiCategoryAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCategoryAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
