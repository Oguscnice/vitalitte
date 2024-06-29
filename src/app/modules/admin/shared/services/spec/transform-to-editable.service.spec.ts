import { TestBed } from '@angular/core/testing';

import { TransformToEditableService } from '../transform-to-editable.service';

describe('TransformToEditableService', () => {
  let service: TransformToEditableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformToEditableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
