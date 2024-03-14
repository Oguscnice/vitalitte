import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNotebooksComponent } from './manage-notebooks.component';

describe('ManageNotebooksComponent', () => {
  let component: ManageNotebooksComponent;
  let fixture: ComponentFixture<ManageNotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNotebooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
