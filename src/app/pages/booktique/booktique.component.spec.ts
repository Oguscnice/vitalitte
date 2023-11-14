import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktiqueComponent } from './booktique.component';

describe('BooktiqueComponent', () => {
  let component: BooktiqueComponent;
  let fixture: ComponentFixture<BooktiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooktiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooktiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
