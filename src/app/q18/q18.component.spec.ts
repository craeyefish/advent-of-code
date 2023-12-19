import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q18Component } from './q18.component';

describe('Q18Component', () => {
  let component: Q18Component;
  let fixture: ComponentFixture<Q18Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Q18Component]
    });
    fixture = TestBed.createComponent(Q18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
