import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresListComponentComponent } from './scores-list-component.component';

describe('ScoresListComponentComponent', () => {
  let component: ScoresListComponentComponent;
  let fixture: ComponentFixture<ScoresListComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresListComponentComponent]
    });
    fixture = TestBed.createComponent(ScoresListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
