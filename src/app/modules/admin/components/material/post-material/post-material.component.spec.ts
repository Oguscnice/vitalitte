import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMaterialComponent } from './post-material.component';

describe('PostMaterialComponent', () => {
  let component: PostMaterialComponent;
  let fixture: ComponentFixture<PostMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
