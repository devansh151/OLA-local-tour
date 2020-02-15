import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlaTabGroupComponent } from './ola-tab-group.component';

describe('OlaTabGroupComponent', () => {
  let component: OlaTabGroupComponent;
  let fixture: ComponentFixture<OlaTabGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlaTabGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlaTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
