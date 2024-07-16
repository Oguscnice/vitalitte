import { TestBed } from '@angular/core/testing';

import { AdminDeliveryOptionSignalService } from '../admin-delivery-option-signal.service';

describe('AdminDeliveryOptionSignalService', () => {
  let service: AdminDeliveryOptionSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDeliveryOptionSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
