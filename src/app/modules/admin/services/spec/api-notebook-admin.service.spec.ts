import { TestBed } from '@angular/core/testing';

import { ApiNotebookAdminService } from '../api-notebook-admin.service';

describe('ApiNotebookAdminService', () => {
  let service: ApiNotebookAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNotebookAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
