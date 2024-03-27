import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGiftCardsComponent } from './manage-gift-cards.component';

describe('ManageGiftCardsComponent', () => {
  let component: ManageGiftCardsComponent;
  let fixture: ComponentFixture<ManageGiftCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGiftCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGiftCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
