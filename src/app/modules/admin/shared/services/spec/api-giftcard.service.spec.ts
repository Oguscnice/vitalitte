import { TestBed } from '@angular/core/testing';

import { ApiGiftcardService } from '../api/api-giftcard.service';

describe('ApiGiftcardService', () => {
  let service: ApiGiftcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGiftcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
