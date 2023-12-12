import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q9Component } from './q9.component';

describe('Q9Component', () => {
  let component: Q9Component;
  let fixture: ComponentFixture<Q9Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Q9Component]
    });
    fixture = TestBed.createComponent(Q9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
