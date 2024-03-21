import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNotebookComponent } from './post-notebook.component';

describe('PostNotebookComponent', () => {
  let component: PostNotebookComponent;
  let fixture: ComponentFixture<PostNotebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostNotebookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
