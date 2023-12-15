import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookSelectedComponent } from './notebook-selected.component';

describe('NotebookSelectedComponent', () => {
  let component: NotebookSelectedComponent;
  let fixture: ComponentFixture<NotebookSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebookSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotebookSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
