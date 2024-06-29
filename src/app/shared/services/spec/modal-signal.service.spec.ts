import { TestBed } from '@angular/core/testing';

import { ModalSignalService } from './modal-signal.service';

describe('ModalSignalService', () => {
  let service: ModalSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
