import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLatchComponent } from './edit-latch.component';

describe('EditLatchComponent', () => {
  let component: EditLatchComponent;
  let fixture: ComponentFixture<EditLatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
