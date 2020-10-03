import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GlycoDatabasesComponent} from './glyco-databases.component';

describe('GlycoDatabasesComponent', () => {
  let component: GlycoDatabasesComponent;
  let fixture: ComponentFixture<GlycoDatabasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlycoDatabasesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlycoDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
