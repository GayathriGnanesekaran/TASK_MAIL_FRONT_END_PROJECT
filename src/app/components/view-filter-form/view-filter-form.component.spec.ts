import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFilterFormComponent } from './view-filter-form.component';

describe('ViewFilterFormComponent', () => {
  let component: ViewFilterFormComponent;
  let fixture: ComponentFixture<ViewFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFilterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
