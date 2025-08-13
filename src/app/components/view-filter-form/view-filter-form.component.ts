import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import moment from 'moment';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
import { ApplicationEventService, IApplicationEvent } from '../../services/application-event.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-view-filter-form',
  standalone: false,
  templateUrl: './view-filter-form.component.html',
  styleUrl: './view-filter-form.component.css'
})
export class ViewFilterFormComponent {
@Input() viewTaskFilterFormGroup!:FormGroup
@Input() useridDropdown:any[]=[]

constructor(private taskmailserviceService: TaskmailserviceService,
            private applicationEventService: ApplicationEventService,
 ){

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
        const event: IApplicationEvent = {
            name: 'SEARCH_TASK',
            component: 'ViewFilterFormComponent',
            value:'',
        };
        this.applicationEventService.emitAnEvent(event);
    }

    reset() {
         const event: IApplicationEvent = {
        name: 'RESET',
           component: 'ViewFilterFormComponent',
           value: '',
        };
        this.applicationEventService.emitAnEvent(event);
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
           const fromDateValue= this.viewTaskFilterFormGroup.get('fromDate')?.value;
           const toDateValue= this.viewTaskFilterFormGroup.get('toDate')?.value;
           if(new Date(fromDateValue) > new Date(toDateValue)){
            this.viewTaskFilterFormGroup.get('fromDate')?.setErrors({ greater: true });
           }
           else{
            this.viewTaskFilterFormGroup.get(control)?.setErrors(null);            
           }
           this.viewTaskFilterFormGroup.markAsDirty();
        }
        if (this.value == '' || this.value == null) {
            if (control == 'fromDate') {
                const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                this.viewTaskFilterFormGroup.get(control)?.patchValue(startOfMonth);
            } else {
                this.viewTaskFilterFormGroup.get(control)?.patchValue(moment().toDate());
            }
            this.viewTaskFilterFormGroup.get(control)?.setErrors(null);
            this.viewTaskFilterFormGroup.markAsDirty();
        }
    }
}
