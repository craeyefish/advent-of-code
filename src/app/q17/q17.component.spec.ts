import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q17Component } from './q17.component';

describe('Q17Component', () => {
  let component: Q17Component;
  let fixture: ComponentFixture<Q17Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Q17Component]
    });
    fixture = TestBed.createComponent(Q17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
