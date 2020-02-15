import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FosMainContainerComponent } from './fos-main-container.component';

describe('FosMainContainerComponent', () => {
  let component: FosMainContainerComponent;
  let fixture: ComponentFixture<FosMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FosMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FosMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
