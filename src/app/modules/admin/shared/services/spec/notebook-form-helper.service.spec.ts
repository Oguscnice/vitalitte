import { TestBed } from '@angular/core/testing';

import { NotebookFormHelperService } from './notebook-form-helper.service';

describe('NotebookFormHelperService', () => {
  let service: NotebookFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotebookFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
