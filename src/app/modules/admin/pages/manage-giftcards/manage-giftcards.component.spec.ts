import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGiftcardsComponent } from './manage-giftcards.component';

describe('ManageGiftcardsComponent', () => {
  let component: ManageGiftcardsComponent;
  let fixture: ComponentFixture<ManageGiftcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGiftcardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageGiftcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
