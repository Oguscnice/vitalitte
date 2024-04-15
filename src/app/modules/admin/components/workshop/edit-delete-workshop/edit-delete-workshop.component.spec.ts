import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteWorkshopComponent } from './edit-delete-workshop.component';

describe('EditDeleteWorkshopComponent', () => {
  let component: EditDeleteWorkshopComponent;
  let fixture: ComponentFixture<EditDeleteWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeleteWorkshopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeleteWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
