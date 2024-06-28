import { TestBed } from '@angular/core/testing';

import { AdminCategorySignalService } from './admin-category.service';

describe('AdminCategorySignalService', () => {
  let service: AdminCategorySignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCategorySignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
