import { TestBed } from '@angular/core/testing';

import { ObjectUtilsService } from '../object-utils.service';

describe('ObjectUtilsService', () => {
  let service: ObjectUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
