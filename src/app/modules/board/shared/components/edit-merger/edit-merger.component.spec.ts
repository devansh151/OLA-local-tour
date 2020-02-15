import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMergerComponent } from './edit-merger.component';

describe('EditMergerComponent', () => {
  let component: EditMergerComponent;
  let fixture: ComponentFixture<EditMergerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMergerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMergerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
