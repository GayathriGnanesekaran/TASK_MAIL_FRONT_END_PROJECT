import { Component } from '@angular/core';
import { ApplicationEventService } from '../../services/application-event.service';
import { FormUtilService } from '../../services/form-util.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-task-time-details',
  standalone: false,
  templateUrl: './view-task-time-details.component.html',
  styleUrl: './view-task-time-details.component.css'
})
export class ViewTaskTimeDetailsComponent {
  selectDetailsRow=0
  public _destroyed$ = new Subject();
  
viewTimeDetalArray:any= [
  {
    resource: "Gayathri",
    types: "Present",
    month: "07",
    day: "28",
    year:'2025',
    intime:'10:30',
    outtime:'19:30',
    totalduration:'19:30',
    breakduration:'1:00',
    actworkhrs:'8:00',
    comments:'permission',
  },{
    resource: "Nila",
    types: "Permission",
    month: "07",
    day: "27",
    year:'2025',
    intime:'10:30',
    outtime:'19:30',
    totalduration:'19:30',
    breakduration:'1:00',
    actworkhrs:'8:00',
    comments:'Good day',
  }
  ]

  diceOptions:any= [{codeCode: "EDIT",
    screenName: "Edit",
    actionType: "click"
}]

constructor(
    private applicationEventService: ApplicationEventService
  ) {
  }

ngOnInit(): void {

     this.applicationEventService.appEvent$.pipe(takeUntil(this._destroyed$)).subscribe((event) => {
            switch (event.name) {
                case 'EDIT': {
                  console.log('data',event)
                  
                }
  }
})}

  selectedPrintRefundListRow(item:any, index:number) {
    this.selectDetailsRow=index
        // const event: IApplicationEvent = {
        //     name: 'SELECTED_PRINT_REFUND_DETAILS_ROW',
        //     component: 'PrintRefundBatchDetailsListComponent',
        //     value: { item, index },
        // };
        // this.applicationEventService.emitAnEvent(event);
    }

ngOnDestroy(): void {
          // unsubcribe Observable
        this._destroyed$.next('');
        this._destroyed$.complete();
    }
}
