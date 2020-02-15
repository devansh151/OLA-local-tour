import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlaTabItemComponent } from './ola-tab-item.component';

describe('OlaTabItemComponent', () => {
  let component: OlaTabItemComponent;
  let fixture: ComponentFixture<OlaTabItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlaTabItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlaTabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
