import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationThumbnailComponent } from './publication-thumbnail.component';

describe('PublicationThumbnailComponent', () => {
  let component: PublicationThumbnailComponent;
  let fixture: ComponentFixture<PublicationThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicationThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
