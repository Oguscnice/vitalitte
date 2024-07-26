import { TestBed } from '@angular/core/testing';

import { ApiReviewAdminService } from '../api/api-review-admin.service';

describe('ApiReviewAdminService', () => {
  let service: ApiReviewAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiReviewAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
