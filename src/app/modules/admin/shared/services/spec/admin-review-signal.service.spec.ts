import { TestBed } from '@angular/core/testing';

import { AdminReviewSignalService } from '../admin-review-signal.service';

describe('AdminReviewSignalService', () => {
  let service: AdminReviewSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminReviewSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
