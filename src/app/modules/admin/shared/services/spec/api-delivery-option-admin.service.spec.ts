import { TestBed } from '@angular/core/testing';

import { ApiDeliveryOptionAdminService } from '../api/api-delivery-option-admin.service';

describe('ApiDeliveryOptionAdminService', () => {
  let service: ApiDeliveryOptionAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDeliveryOptionAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
