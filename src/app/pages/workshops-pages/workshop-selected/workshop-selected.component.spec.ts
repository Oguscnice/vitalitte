import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopSelectedComponent } from './workshop-selected.component';

describe('WorkshopSelectedComponent', () => {
  let component: WorkshopSelectedComponent;
  let fixture: ComponentFixture<WorkshopSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkshopSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
