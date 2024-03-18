import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnguilleComponent } from './anguille.component';

describe('AnguilleComponent', () => {
  let component: AnguilleComponent;
  let fixture: ComponentFixture<AnguilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnguilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnguilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
