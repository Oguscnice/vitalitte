import { TestBed } from '@angular/core/testing';

import { TransformApiPostService } from '../../shared/transform-api.service';

describe('TransformApiPostService', () => {
  let service: TransformApiPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformApiPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
