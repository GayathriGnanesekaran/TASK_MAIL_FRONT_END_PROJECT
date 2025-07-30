import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyTaskTimeScheduleComponent } from './apply-task-time-schedule.component';

describe('ApplyTaskTimeScheduleComponent', () => {
  let component: ApplyTaskTimeScheduleComponent;
  let fixture: ComponentFixture<ApplyTaskTimeScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyTaskTimeScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyTaskTimeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
