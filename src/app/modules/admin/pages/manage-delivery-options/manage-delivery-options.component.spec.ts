import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeliveryOptionsComponent } from './manage-delivery-options.component';

describe('ManageDeliveryOptionsComponent', () => {
  let component: ManageDeliveryOptionsComponent;
  let fixture: ComponentFixture<ManageDeliveryOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDeliveryOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDeliveryOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
