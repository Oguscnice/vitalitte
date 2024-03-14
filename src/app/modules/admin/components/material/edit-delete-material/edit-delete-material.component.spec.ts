import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteMaterialComponent } from './edit-delete-material.component';

describe('EditDeleteMaterialComponent', () => {
  let component: EditDeleteMaterialComponent;
  let fixture: ComponentFixture<EditDeleteMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
