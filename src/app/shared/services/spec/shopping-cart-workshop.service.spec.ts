import { TestBed } from '@angular/core/testing';

import { ShoppingCartWorkshopService } from '../shopping-cart-workshop.service';

describe('ShoppingCartWorkshopService', () => {
  let service: ShoppingCartWorkshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartWorkshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
