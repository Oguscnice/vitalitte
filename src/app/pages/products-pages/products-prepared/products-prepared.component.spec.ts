import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPreparedComponent } from './products-prepared.component';

describe('ProductsPreparedComponent', () => {
  let component: ProductsPreparedComponent;
  let fixture: ComponentFixture<ProductsPreparedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsPreparedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPreparedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
