import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSwitchComponent } from './edit-switch.component';

describe('EditSwitchComponent', () => {
  let component: EditSwitchComponent;
  let fixture: ComponentFixture<EditSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
