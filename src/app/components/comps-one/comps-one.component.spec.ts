import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompsOneComponent } from './comps-one.component';

describe('CompsOneComponent', () => {
  let component: CompsOneComponent;
  let fixture: ComponentFixture<CompsOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompsOneComponent]
    });
    fixture = TestBed.createComponent(CompsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
