import { TestBed } from '@angular/core/testing';

import { AdminGiftcardSignalService } from '../admin-giftcard-signal.service';

describe('AdminGiftcardSignalService', () => {
  let service: AdminGiftcardSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGiftcardSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
