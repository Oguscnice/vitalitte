import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteCategoryComponent } from './edit-delete-category.component';

describe('EditDeleteCategoryComponent', () => {
  let component: EditDeleteCategoryComponent;
  let fixture: ComponentFixture<EditDeleteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeleteCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeleteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
