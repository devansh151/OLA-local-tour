import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeListItemComponent } from './scheme-list-item.component';

describe('SchemeListItemComponent', () => {
  let component: SchemeListItemComponent;
  let fixture: ComponentFixture<SchemeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
