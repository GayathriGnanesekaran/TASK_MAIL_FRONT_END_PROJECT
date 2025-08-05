import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import moment from 'moment';
import { TaskmailserviceService } from '../../services/taskmailservice.service';

@Component({
  selector: 'app-view-filter-form',
  standalone: false,
  templateUrl: './view-filter-form.component.html',
  styleUrl: './view-filter-form.component.css'
})
export class ViewFilterFormComponent {
@Input() viewTaskFilterFormGroup!:FormGroup
  @Input() useridDropdown:any[]=[]
constructor( ){

}


categoryesList=[]
userList=[]
  value:any;
    public minDate: Date = moment('01/01/1800 12:00:00 AM').toDate();
    public maxDate: Date = moment('12/31/9999 11:59:59 PM').toDate();
    bsConfig = {
        dateInputFormat: 'MM/DD/YYYY',
        containerClass: 'theme-si',
        showWeekNumbers: false,
        adaptivePosition: true,
        customTodayClass: 'custom-today-class',
        isAnimated: true,
        minDate: this.minDate,
        maxDate: this.maxDate,
    };
   retrieve() {
        // const event: IApplicationEvent = {
        //     name: 'RETRIVE_PRINT_REFUND_LIST',
        //     component: 'PrintRefundFilterFormComponent',
        //     value: this.printRefundFilterFormGroup.getRawValue(),
        // };
        // this.applicationEventService.emitAnEvent(event);
    }

    reset() {
        // const event: IApplicationEvent = {
        //     name: 'RESET_PRINT_REFUND_LIST',
        //     component: 'PrintRefundFilterFormComponent',
        //     value: '',
        // };
        // this.applicationEventService.emitAnEvent(event);
    }
    
    dateValueChange(event:any, control:any) {
        this.value = null;
        if (event !== null && event !== '' && event?.target?.value !== null && event?.target?.value !== '') {
            this.value = moment(event?.target?.value ? event?.target?.value : event).format('MM/DD/YYYY');
        }
        if (
            this.value === 'Invalid Date' ||
            this.value == 'Invalid date' ||
            new Date(this.minDate) > new Date(this.value) ||
            new Date(this.maxDate) < new Date(this.value)
        ) {
            setTimeout(() => {
                var elmnt: any = document.getElementById(control);
                if (elmnt) elmnt.value = 'Invalid Date';
                this.viewTaskFilterFormGroup.get(control)?.patchValue('Invalid Date');
                this.viewTaskFilterFormGroup.get(control)?.setErrors({ invalidDate: true });
            }, 50);
            return;
        }
        if (
            this.value !== 'Invalid Date' &&
            this.value !== 'Invalid date' &&
            this.value !== '' &&
            this.value !== null
        ) {
            this.viewTaskFilterFormGroup.get(control)?.patchValue(new Date(this.value));
            this.viewTaskFilterFormGroup.get(control)?.setErrors(null);
            this.viewTaskFilterFormGroup.markAsDirty();
        }
        if (this.value == '' || this.value == null) {
            if (control == 'fromDate') {
                this.viewTaskFilterFormGroup.get(control)?.patchValue(moment().subtract(30, 'days').toDate());
            } else {
                this.viewTaskFilterFormGroup.get(control)?.patchValue(moment().toDate());
            }
            this.viewTaskFilterFormGroup.get(control)?.setErrors(null);
            this.viewTaskFilterFormGroup.markAsDirty();
        }
    }
}
