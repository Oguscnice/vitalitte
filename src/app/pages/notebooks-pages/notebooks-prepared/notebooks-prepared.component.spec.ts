import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebooksPreparedComponent } from './notebooks-prepared.component';

describe('NotebooksPreparedComponent', () => {
  let component: NotebooksPreparedComponent;
  let fixture: ComponentFixture<NotebooksPreparedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebooksPreparedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotebooksPreparedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
