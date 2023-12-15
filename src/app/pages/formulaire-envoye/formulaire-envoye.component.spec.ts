import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireEnvoyeComponent } from './formulaire-envoye.component';

describe('FormulaireEnvoyeComponent', () => {
  let component: FormulaireEnvoyeComponent;
  let fixture: ComponentFixture<FormulaireEnvoyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireEnvoyeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireEnvoyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
