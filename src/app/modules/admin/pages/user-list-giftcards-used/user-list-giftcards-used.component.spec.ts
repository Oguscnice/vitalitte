import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListGiftcardsUsedComponent } from './user-list-giftcards-used.component';

describe('UserListGiftcardsUsedComponent', () => {
  let component: UserListGiftcardsUsedComponent;
  let fixture: ComponentFixture<UserListGiftcardsUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListGiftcardsUsedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListGiftcardsUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
