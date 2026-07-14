import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompsTwoComponent } from './comps-two.component';

describe('CompsTwoComponent', () => {
  let component: CompsTwoComponent;
  let fixture: ComponentFixture<CompsTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompsTwoComponent]
    });
    fixture = TestBed.createComponent(CompsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
