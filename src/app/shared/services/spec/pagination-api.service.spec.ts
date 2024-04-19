import { TestBed } from '@angular/core/testing';

import { PaginationApiService } from '../pagination-api.service';

describe('PaginationApiService', () => {
  let service: PaginationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
