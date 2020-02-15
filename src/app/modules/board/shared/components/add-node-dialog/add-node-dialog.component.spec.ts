import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNodeDialogComponent } from './add-node-dialog.component';

describe('AddNodeDialogComponent', () => {
  let component: AddNodeDialogComponent;
  let fixture: ComponentFixture<AddNodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
