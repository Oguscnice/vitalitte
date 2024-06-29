import { TestBed } from '@angular/core/testing';

import { AdminNotebookSignalService } from './admin-notebook.service';

describe('AdminNotebookSignalService', () => {
  let service: AdminNotebookSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminNotebookSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
