import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsampleComponent } from './viewsample.component';

describe('ViewsampleComponent', () => {
  let component: ViewsampleComponent;
  let fixture: ComponentFixture<ViewsampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
