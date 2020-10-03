import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EducationSinglePageComponent} from './education-single-page.component';

describe('EducationSinglePageComponent', () => {
  let component: EducationSinglePageComponent;
  let fixture: ComponentFixture<EducationSinglePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EducationSinglePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
