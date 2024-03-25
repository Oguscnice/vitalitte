import { TestBed } from '@angular/core/testing';

import { TransformApiPutService } from '../transform-api-put.service';

describe('TransformApiPutService', () => {
  let service: TransformApiPutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformApiPutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
