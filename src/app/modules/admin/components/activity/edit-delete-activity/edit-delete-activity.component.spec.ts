import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteActivityComponent } from './edit-delete-activity.component';

describe('EditDeleteActivityComponent', () => {
  let component: EditDeleteActivityComponent;
  let fixture: ComponentFixture<EditDeleteActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeleteActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeleteActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
