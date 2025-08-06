import { Component, Input } from '@angular/core';
import {
  ApplicationEventService,
  IApplicationEvent,
} from '../../services/application-event.service';
import { FormUtilService } from '../../services/form-util.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-task-time-details',
  standalone: false,
  templateUrl: './view-task-time-details.component.html',
  styleUrl: './view-task-time-details.component.css',
})
export class ViewTaskTimeDetailsComponent {
  public _destroyed$ = new Subject();

  @Input() viewTaskTimeArray: any[] = [];
  @Input() selectDetailsRow = 0;

  diceOptions: any = [
    { codeCode: 'EDIT', screenName: 'Edit', actionType: 'click' },
  ];

  constructor(private applicationEventService: ApplicationEventService) {}

  ngOnInit(): void {
    this.applicationEventService.appEvent$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((event) => {
        switch (event.name) {
          case 'EDIT': {
            console.log('data', event);
          }
        }
      });
  }

  selectedRow(item: any, index: number) {
    const event: IApplicationEvent = {
      name: 'SELECTED__ROW',
      component: 'ViewTaskTimeDetailsComponent',
      value: { item, index },
    };
    this.applicationEventService.emitAnEvent(event);
  }

  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
