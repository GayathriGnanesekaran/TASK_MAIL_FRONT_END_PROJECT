import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';
import { ViewTaskFilterForm } from '../../forms/view-filter-form';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { ApplicationEventService, IApplicationEvent } from '../../services/application-event.service';
import moment from 'moment';
import { Router } from '@angular/router';
import { InputError } from '../../interfaces/input-error.model';
import { ValidationService } from '../../services/validation.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';
import { ModalMsg } from '../../interfaces/modal-msg';
@Component({
  selector: 'app-viewsample',
  standalone: false,
  templateUrl: './viewsample.component.html',
  styleUrl: './viewsample.component.css',
})
export class ViewsampleComponent implements OnInit {
  public viewTaskFilterFormGroup!: FormGroup;
  useridDropdown = [];
  loggeduser: any;
  selectDetailsRow = 0;
  viewTaskTimeArray: any[] = [];
  viewTaskScheduleArray = [];
  public _destroyed$ = new Subject();
  diceOptions: any = [];
  pageErrors!: InputError[];
  public valpopupInst!: NgbModalRef | null;

  constructor(
    private formUtilService: FormUtilService,
    private applicationEventService: ApplicationEventService,
    private taskmailserviceService: TaskmailserviceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private validationService: ValidationService,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess();

    this.viewTaskFilterFormGroup =
      this.formUtilService.buildFormGroup(ViewTaskFilterForm);
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setTimeout(() => {
      this.viewTaskFilterFormGroup.get('fromDate')?.patchValue(startOfMonth);
      this.viewTaskFilterFormGroup.get('toDate')?.patchValue(new Date());
    });

    this.taskmailserviceService
      .fetchDropDownValue('USERSNAME')
      .subscribe((data) => {
        if (data) {
          if (data && data.length > 0) {
            this.useridDropdown = data;
          }
        }
        const defaultResource: any = this.useridDropdown.find(
          (x: any) => x.codeName === this.loggeduser.userName.toUpperCase()
        );
        this.viewTaskFilterFormGroup
          ?.get('userName')
          ?.patchValue(defaultResource.codeName);
            const event: IApplicationEvent = {
                      name: 'SEARCH_TASK',
                      component: 'ViewFilterFormComponent',
                      value:'',
                  };
                  this.applicationEventService.emitAnEvent(event);
      });
    this.applicationEventService.appEvent$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((event: any) => {
        switch (event.name) {
          case 'SEARCH_TASK': {
            if (this.viewTaskFilterFormGroup.invalid) {
              this.validationError(
                this.viewTaskFilterFormGroup.controls,
                ViewTaskFilterForm
              );
            } else {
              const fromDate = moment(
                this.viewTaskFilterFormGroup.get('fromDate')?.value
              ).format('MM/DD/YYYY');
              const toDate = moment(
                this.viewTaskFilterFormGroup.get('toDate')?.value
              ).format('MM/DD/YYYY');
              this.viewTaskFilterFormGroup
                .get('fromDate')
                ?.patchValue(fromDate);
              this.viewTaskFilterFormGroup.get('toDate')?.patchValue(toDate);
              this.taskmailserviceService
                .getTaskHeader(this.viewTaskFilterFormGroup.getRawValue())
                .subscribe((data) => {
                  if(data){
                  this.viewTaskTimeArray = data;
                  this.selectDetailsRow = 0;
                  this.taskmailserviceService
                    .getTaskTimeHeader(
                      this.viewTaskTimeArray[this.selectDetailsRow].headerId
                    )
                    .subscribe((data) => {
                      this.viewTaskScheduleArray = data;
                      this.cdr.detectChanges();
                    });
                  }
              
                });
            }
            return;
          }
          case 'SELECTED__ROW': {
            this.selectDetailsRow = event?.value.index;
            this.taskmailserviceService
              .getTaskTimeHeader(
                this.viewTaskTimeArray[this.selectDetailsRow].headerId
              )
              .subscribe((data) => {
                this.viewTaskScheduleArray = data;
                this.cdr.detectChanges();
              });
            return;
          }
          case 'DICE_BUTTON_CLICK': {
            if (event?.value?.hostComponent === 'ViewTaskTimeDetailsComponent')
              this.selectDetailsRow = event?.value.index;
            this.taskmailserviceService
              .fetchDropDownValue('DICE_EDIT')
              .subscribe((res) => {
                this.diceOptions = res;
              });
            return;
          }
          case 'EDIT': {
            event.value.item.resource = event.value.item.resource.toUpperCase();
            event.value.item.type = event.value.item.type.toUpperCase();
            this.taskmailserviceService.setHeaderSuccess(event.value.item);
            this.router.navigate(['task/apply-page']);
      
            return;
          }
          case 'RESET': {
            const defaultResource: any = this.useridDropdown.find(
              (x: any) => x.codeName === this.loggeduser.userName.toUpperCase()
            );
            this.viewTaskFilterFormGroup
              ?.get('userName')
              ?.patchValue(defaultResource.codeName);
            const today = new Date();
            const startOfMonth = new Date(
              today.getFullYear(),
              today.getMonth(),
              1
            );
            setTimeout(() => {
              this.viewTaskFilterFormGroup
                .get('fromDate')
                ?.patchValue(startOfMonth);
              this.viewTaskFilterFormGroup
                .get('toDate')
                ?.patchValue(new Date());
            });
            return;
          }
          default:
            break;
        }
      });
  }
  validationError(controls?: any, objects?: any) {
    this.pageErrors = this.validationService.parseValidationErrors(
      controls,
      objects
    );
    if (this.pageErrors && !this.valpopupInst) {
      this.valpopupInst = this.modalService.open(AlertPopupComponent, {
        backdrop: 'static',
      });
      this.valpopupInst.componentInstance.content = new ModalMsg(
        'error',
        '',
        this.pageErrors
      );
      this.valpopupInst.result.then((result) => {
        if (result === 'OK' || result === 'CLOSE') {
          this.valpopupInst?.close();
          this.valpopupInst = null;
        }
      });
    }
  }
}
