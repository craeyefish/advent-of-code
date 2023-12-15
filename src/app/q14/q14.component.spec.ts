import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q14Component } from './q14.component';

describe('Q14Component', () => {
  let component: Q14Component;
  let fixture: ComponentFixture<Q14Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Q14Component]
    });
    fixture = TestBed.createComponent(Q14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
