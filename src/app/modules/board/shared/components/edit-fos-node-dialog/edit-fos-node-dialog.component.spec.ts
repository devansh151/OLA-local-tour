import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFosNodeDialogComponent } from './edit-fos-node-dialog.component';

describe('EditFosNodeDialogComponent', () => {
  let component: EditFosNodeDialogComponent;
  let fixture: ComponentFixture<EditFosNodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFosNodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFosNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
