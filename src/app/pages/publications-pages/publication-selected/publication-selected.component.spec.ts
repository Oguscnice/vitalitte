import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationSelectedComponent } from './publication-selected.component';

describe('PublicationSelectedComponent', () => {
  let component: PublicationSelectedComponent;
  let fixture: ComponentFixture<PublicationSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicationSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
