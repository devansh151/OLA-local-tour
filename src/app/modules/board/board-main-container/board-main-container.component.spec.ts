import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMainContainerComponent } from './board-main-container.component';

describe('BoardMainContainerComponent', () => {
  let component: BoardMainContainerComponent;
  let fixture: ComponentFixture<BoardMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
