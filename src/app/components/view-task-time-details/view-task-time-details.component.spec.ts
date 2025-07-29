import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskTimeDetailsComponent } from './view-task-time-details.component';

describe('ViewTaskTimeDetailsComponent', () => {
  let component: ViewTaskTimeDetailsComponent;
  let fixture: ComponentFixture<ViewTaskTimeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTaskTimeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaskTimeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
