import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteGiftcardComponent } from './edit-delete-giftcard.component';

describe('EditDeleteGiftcardComponent', () => {
  let component: EditDeleteGiftcardComponent;
  let fixture: ComponentFixture<EditDeleteGiftcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeleteGiftcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeleteGiftcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
