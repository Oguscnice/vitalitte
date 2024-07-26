import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReviewFormComponent } from './post-review-form.component';

describe('PostReviewFormComponent', () => {
  let component: PostReviewFormComponent;
  let fixture: ComponentFixture<PostReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostReviewFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
