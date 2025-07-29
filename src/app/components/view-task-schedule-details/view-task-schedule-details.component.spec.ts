import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskScheduleDetailsComponent } from './view-task-schedule-details.component';

describe('ViewTaskScheduleDetailsComponent', () => {
  let component: ViewTaskScheduleDetailsComponent;
  let fixture: ComponentFixture<ViewTaskScheduleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTaskScheduleDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaskScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
