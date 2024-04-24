import { TestBed } from '@angular/core/testing';

import { ApiGiftcardUsedService } from '../api-giftcard-used.service';

describe('ApiGiftcardUsedService', () => {
  let service: ApiGiftcardUsedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGiftcardUsedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
