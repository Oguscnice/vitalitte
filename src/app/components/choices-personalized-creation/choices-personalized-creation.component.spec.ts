import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesPersonalizedCreationComponent } from './choices-personalized-creation.component';

describe('ChoicesPersonalizedCreationComponent', () => {
  let component: ChoicesPersonalizedCreationComponent;
  let fixture: ComponentFixture<ChoicesPersonalizedCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoicesPersonalizedCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoicesPersonalizedCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
