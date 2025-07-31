import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceMenuComponent } from './dice-menu.component';

describe('DiceMenuComponent', () => {
  let component: DiceMenuComponent;
  let fixture: ComponentFixture<DiceMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiceMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
