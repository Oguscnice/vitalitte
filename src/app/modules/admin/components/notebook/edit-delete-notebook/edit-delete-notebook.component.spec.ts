import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteNotebookComponent } from './edit-delete-notebook.component';

describe('EditDeleteNotebookComponent', () => {
  let component: EditDeleteNotebookComponent;
  let fixture: ComponentFixture<EditDeleteNotebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteNotebookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
