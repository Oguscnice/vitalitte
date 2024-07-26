import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemQuantityManagerComponent } from './cart-item-quantity-manager.component';

describe('CartItemQuantityManagerComponent', () => {
  let component: CartItemQuantityManagerComponent;
  let fixture: ComponentFixture<CartItemQuantityManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemQuantityManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartItemQuantityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
