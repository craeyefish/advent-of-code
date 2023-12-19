import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q19Component } from './q19.component';

describe('Q19Component', () => {
  let component: Q19Component;
  let fixture: ComponentFixture<Q19Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Q19Component]
    });
    fixture = TestBed.createComponent(Q19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
