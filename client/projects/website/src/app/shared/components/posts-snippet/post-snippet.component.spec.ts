import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PostSnippetComponent} from './post-snippet.component';

describe('PostComponent', () => {
  let component: PostSnippetComponent;
  let fixture: ComponentFixture<PostSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostSnippetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
