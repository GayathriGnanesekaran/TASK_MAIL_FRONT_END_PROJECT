import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyTaskTimeGridComponent } from './apply-task-time-grid.component';

describe('ApplyTaskTimeGridComponent', () => {
  let component: ApplyTaskTimeGridComponent;
  let fixture: ComponentFixture<ApplyTaskTimeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyTaskTimeGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyTaskTimeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
