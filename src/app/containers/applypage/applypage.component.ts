import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IFormObject } from '../../interfaces/form-object.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormUtilService } from '../../services/form-util.service';
import { ApplyTaskTimeEntity } from '../../forms/task-time-form';
import { ApplicationEventService } from '../../services/application-event.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
import { InputError } from '../../interfaces/input-error.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../services/validation.service';
import { ModalMsg } from '../../interfaces/modal-msg';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';
import { ToastrService } from 'ngx-toastr';
import { TaskGridDetailForm } from '../../forms/task-grid-detail.form';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-applypage',
  standalone: false,
  templateUrl: './applypage.component.html',
  styleUrl: './applypage.component.css',
})
export class ApplypageComponent implements OnInit {
  public ApplyTaskTimeFormGroup!: FormGroup;
  public _destroyed$ = new Subject();
  resourceDropdown = [];
  typeDropdown = [];
  loggeduser: any;
  pageErrors!: InputError[];
  public valpopupInst!: NgbModalRef | null;
  diceOptions: any;
  headerDatas: any;
  projectDropdown = [];
  isBillableDropdown = [];
  billingTypeDropdown = [];
  typeHeaderDropdown = [];
  teamDropdown = [];
  statusDropdown = [];

  taskDetailFormGroup!: FormGroup;
  taskDetailArray!: FormArray;
  selectDetailIndex = 0;
  resourceName: string = '';
  sendErrorMsg!: NgbModalRef;
  constructor(
    private formUtilService: FormUtilService,
    private applicationEventService: ApplicationEventService,
    private taskmailserviceService: TaskmailserviceService,
    private modalService: NgbModal,
    private validationService: ValidationService,
    private toaster: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.ApplyTaskTimeFormGroup =
      this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
    console.log('data', this.ApplyTaskTimeFormGroup);
    this.ApplyTaskTimeFormGroup.markAsDirty();
    this.taskDetailFormGroup =
      this.formUtilService.buildReactiveForm(TaskGridDetailForm);
    this.taskDetailArray = <FormArray>(
      this.taskDetailFormGroup.controls['taskDetailsList']
    );
  }

  ngOnInit() {
    this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess();
    this.headerDatas = this.taskmailserviceService.getHeaderSuccess();

    forkJoin({
      typeHeader: this.taskmailserviceService.fetchDropDownValue('TYPE_HEADER'),
      resource: this.taskmailserviceService.fetchDropDownValue('USERSNAME'),
      project: this.taskmailserviceService.fetchDropDownValue('PROJECT'),
      type: this.taskmailserviceService.fetchDropDownValue('TYPE'),
      isBillable: this.taskmailserviceService.fetchDropDownValue('ISBILLABLE'),

      billingType:
        this.taskmailserviceService.fetchDropDownValue('BILLINGTYPE'),
      team: this.taskmailserviceService.fetchDropDownValue('TEAM'),
      status: this.taskmailserviceService.fetchDropDownValue('STATUS'),
    }).subscribe((data) => {
      if (data) {
        if (data.typeHeader && data.typeHeader.length > 0) {
          this.typeHeaderDropdown = data.typeHeader;
        }
        if (data.resource && data.resource.length > 0) {
          this.resourceDropdown = data.resource;
        }
        if (data.project && data.project.length > 0) {
          this.projectDropdown = data.project;
        }
        if (data.type && data.type.length > 0) {
          this.typeDropdown = data.type;
        }
        if (data.isBillable && data.isBillable.length > 0) {
          this.isBillableDropdown = data.isBillable;
        }
        if (data.billingType && data.billingType.length > 0) {
          this.billingTypeDropdown = data.billingType;
        }
        if (data.team && data.team.length > 0) {
          this.teamDropdown = data.team;
        }
        if (data.status && data.status.length > 0) {
          this.statusDropdown = data.status;
        }
      }
      if (this.loggeduser?.userName) {
        const defaultResource: any = this.resourceDropdown.find(
          (x: any) => x.codeName === this.loggeduser?.userName.toUpperCase()
        );
        this.ApplyTaskTimeFormGroup?.get('resource')?.patchValue(
          defaultResource?.codeName
        );
      }
      if (this.headerDatas) {
        this.ApplyTaskTimeFormGroup.patchValue(this.headerDatas);
        this.ApplyTaskTimeFormGroup.markAsPristine();
        this.taskmailserviceService
          .getTaskTimeHeader(this.headerDatas.headerId)
          .subscribe((data) => {
            this.updateArrayValues(data);
            this.cdr.detectChanges();
          });
      }
    });
    this.applicationEventService.appEvent$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((event) => {
        switch (event.name) {
          case 'EDIT': {
            this.ApplyTaskTimeFormGroup.patchValue(event.value);
            return;
          }
          case 'DICE_BUTTON_CLICK': {
            this.diceOptions = [];
            if (event?.value?.hostComponent === 'ApplyTaskTimeGridComponent') {
              this.taskmailserviceService
                .fetchDropDownValue('DICE_RESET')
                .subscribe((res) => {
                  this.diceOptions = res;
                  return;
                });
            } else if (
              event?.value?.hostComponent === 'ApplyTaskTimeScheduleComponent'
            ) {
              this.taskmailserviceService
                .fetchDropDownValue('DICE_DELETE')
                .subscribe((res) => {
                  this.diceOptions = res;
                  return;
                });
            }
            return;
          }
          case 'RESET': {
            this.ApplyTaskTimeFormGroup =
              this.formUtilService.buildFormGroup(ApplyTaskTimeEntity);
            const defaultResource: any = this.resourceDropdown.find(
              (x: any) => x.codeName === this.loggeduser.userName.toUpperCase()
            );
            this.ApplyTaskTimeFormGroup?.get('resource')?.patchValue(
              defaultResource.codeName
            );
            this.taskmailserviceService.remove('headerValue');
            return;
          }

          case 'ADDING_NEW_TASK': {
            if (this.ApplyTaskTimeFormGroup.dirty) {
              this.saveTaskTimeDetails('ADDING_NEW_TASK');
            } else if (this.taskDetailArray.dirty) {
              this.saveTaskTimeDetails('ADDING_NEW_TASK');
            } else if (this.taskDetailArray.invalid) {
              this.validationError(
                (
                  this.taskDetailArray.controls[
                    this.selectDetailIndex
                  ] as FormGroup
                ).controls,
                TaskGridDetailForm['taskDetailsList'].subForm
              );
            } else {
              this.addNewTaskDetail();
              return;
            }
            return;
          }
          case 'DELETE': {
            if (event?.value.item.value.detailsId == 0) {
              this.selectDetailIndex =
                event?.value?.index != 0 ? event?.value?.index - 1 : 0;
              this.taskDetailArray.removeAt(event?.value?.index);
              this.taskDetailArray.markAsPristine();
              return;
            } else {
              if (this.taskDetailArray.invalid) {
                this.validationError(
                  (
                    this.taskDetailArray.controls[
                      this.selectDetailIndex
                    ] as FormGroup
                  ).controls,
                  TaskGridDetailForm['taskDetailsList'].subForm
                );
              } else {
                this.taskmailserviceService
                  .deleteTasksDetails(
                    event?.value.item.value.detailsId,
                    event?.value.item.value.headerId
                  )
                  .subscribe((res: any) => {
                    if (res.status == 2) {
                      this.toaster.success(
                        'Task Details Row Deleted Successfully'
                      );
                      this.taskmailserviceService
                        .getTaskTimeHeader(this.headerDatas.headerId)
                        .subscribe((data) => {
                          this.updateArrayValues(data);
                          this.selectDetailIndex =
                            event?.value?.index != 0
                              ? event?.value?.index - 1
                              : 0;
                          this.cdr.detectChanges();
                          return;
                        });
                    }

                    return;
                  });
              }
            }

            return;
          }
          case 'SELECTED_TASK_DETAILS': {
            if (this.selectDetailIndex === event?.value?.index) {
              return;
            } else {
              if (this.taskDetailArray.dirty) {
                this.saveTaskTimeDetails('SELECT_DETAILS', event);
              } else {
                this.selectDetailIndex = event?.value?.index;
              }

              return;
            }
          }
          case 'CHANGE_RESOURCE': {
            this.resourceName =
              this.ApplyTaskTimeFormGroup?.get('resource')?.value;
            const resName: any = this.resourceDropdown.find(
              (x: any) => x.codeName === this.resourceName
            );
            this.ApplyTaskTimeFormGroup.get('headerResourceId')?.patchValue(
              resName.codeId
            );
            this.taskDetailArray.controls.forEach(
              (element: any, index: any) => {
                this.taskDetailArray.controls[index]
                  .get('resName')
                  ?.patchValue(resName.screenName);
                this.taskDetailArray.controls[index]
                  .get('detailsResourceId')
                  ?.patchValue(resName.codeId);
              }
            );
            return;
          }
        }
      });
  }

  addNewTaskDetail() {
    this.selectDetailIndex = this.taskDetailArray.length;
    this.taskDetailArray.push(
      this.formUtilService.buildFormGroup(
        TaskGridDetailForm['taskDetailsList'].subForm
      )
    );
    this.taskDetailArray.controls[this.selectDetailIndex]
      .get('headerId')
      ?.patchValue(this.ApplyTaskTimeFormGroup.get('headerId')?.value);
    const resName: any = this.resourceDropdown.find(
      (x: any) => x.codeName === this.resourceName
    );
    this.taskDetailArray.controls[this.selectDetailIndex]
      .get('resName')
      ?.patchValue(
        this.resourceName !== '' ? resName.screenName : this.loggeduser.userName
      );
    this.taskDetailArray.controls[this.selectDetailIndex]
      .get('userId')
      ?.patchValue(this.loggeduser.userId);
    this.taskDetailArray.controls[this.selectDetailIndex]
      .get('userName')
      ?.patchValue(this.loggeduser.userName);
    this.taskDetailArray.controls[this.selectDetailIndex]
      .get('detailsResourceId')
      ?.patchValue(
        this.resourceName !== '' ? resName.codeId : this.loggeduser.userId
      );
    this.ApplyTaskTimeFormGroup.get('headerResourceId')?.patchValue(
      this.resourceName !== '' ? resName.codeId : this.loggeduser.userId
    );
    this.taskDetailArray.updateValueAndValidity();
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
        if (result === 'Close click' || result === 'Cross click') {
          this.valpopupInst?.close();
          this.valpopupInst = null;
        }
      });
    }
  }

  cancelTaskDetailArray() {
    this.taskDetailArray.clear();
  }

  saveTaskTimeDetails(type?: string, event?: any) {
    if (this.ApplyTaskTimeFormGroup.invalid) {
      this.validationError(
        this.ApplyTaskTimeFormGroup.controls,
        ApplyTaskTimeEntity
      );
    } else if (this.taskDetailArray.invalid) {
      this.validationError(
        (this.taskDetailArray.controls[this.selectDetailIndex] as FormGroup)
          .controls,
        TaskGridDetailForm['taskDetailsList'].subForm
      );
    } else {
      if (this.ApplyTaskTimeFormGroup.dirty) {
        this.saveTaskHeader(type);
      }
      if (this.taskDetailArray.dirty) {
        this.saveTaskDetails(type, event);
      }
    }
  }
  updateArrayValues(res?: any) {
    this.taskDetailFormGroup =
      this.formUtilService.buildReactiveForm(TaskGridDetailForm);
    this.taskDetailArray = <FormArray>(
      this.taskDetailFormGroup.controls['taskDetailsList']
    );
    res.forEach((element: any, index: any) => {
      this.taskDetailArray.push(
        this.formUtilService.buildFormGroup(
          TaskGridDetailForm['taskDetailsList'].subForm,
          {
            ...element,
          }
        )
      );
      setTimeout(() => {
        this.taskDetailArray.controls[index]
          .get('actEndDt')
          ?.patchValue(new Date(element.actEndDt));
        this.taskDetailArray.controls[index]
          .get('estEndDt')
          ?.patchValue(new Date(element.estEndDt));
        this.taskDetailArray.controls[index]
          .get('actStDt')
          ?.patchValue(new Date(element.actStDt));
        this.taskDetailArray.controls[index]
          .get('estStDt')
          ?.patchValue(new Date(element.estStDt));
      }, 100);
    });
    setTimeout(() => {
      this.taskDetailArray.markAsPristine();
    }, 100);

    this.taskDetailArray.updateValueAndValidity();
  }

  saveTaskDetails(type?: string, event?: any) {
    const tempArray = [];
    if (
      this.taskDetailArray.controls[this.selectDetailIndex].get('detailsId')
        ?.value === 0
    ) {
      const data =
        this.taskDetailArray.controls[this.selectDetailIndex].getRawValue();
      data.userId = data.userId.toString();
      tempArray.push(data);
      this.taskmailserviceService
        .saveTasksDetails(tempArray)
        .subscribe((res) => {
          if (res) {
            this.toaster.success('Task Details Saved Successfully');
            this.updateArrayValues(res);
            if (type == 'ADDING_NEW_TASK') {
              this.addNewTaskDetail();
            }
            if (type == 'SELECT_DETAILS') {
              this.selectDetailIndex = event?.value?.index;
            }
          }
        });
    } else {
      const data =
        this.taskDetailArray.controls[this.selectDetailIndex].getRawValue();
      data.userId = data.userId.toString();
      tempArray.push(data);
      this.taskmailserviceService
        .updateTasksDetails(tempArray)
        .subscribe((res) => {
          if (res) {
            this.toaster.success('Task Details Updated Successfully');
            this.updateArrayValues(res);
            if (type == 'ADDING_NEW_TASK') {
              this.addNewTaskDetail();
            }
            if (type == 'SELECT_DETAILS') {
              this.selectDetailIndex = event?.value?.index;
            }
          }
        });
    }
  }

  saveTaskHeader(type?: string) {
    this.ApplyTaskTimeFormGroup.get('userName')?.patchValue(
      this.loggeduser.userName
    );
    this.ApplyTaskTimeFormGroup.get('userId')?.patchValue(
      this.loggeduser.userPk
    );
    if (this.ApplyTaskTimeFormGroup.get('headerId')?.value === 0) {
      this.taskmailserviceService
        .saveTaskHeader(this.ApplyTaskTimeFormGroup.getRawValue())
        .subscribe((res) => {
          if (res) {
            this.ApplyTaskTimeFormGroup.patchValue(res);
            this.taskmailserviceService.setHeaderSuccess(res);
            this.toaster.success('Task Time Detail Added Successfully');
            this.ApplyTaskTimeFormGroup.markAsPristine();
            if (type == 'ADDING_NEW_TASK') {
              this.addNewTaskDetail();
            }
          }
        });
    } else {
      this.taskmailserviceService
        .updateTaskHeader(this.ApplyTaskTimeFormGroup.getRawValue())
        .subscribe((res) => {
          if (res) {
            this.taskmailserviceService.setHeaderSuccess(res);
            this.ApplyTaskTimeFormGroup.patchValue(res);
            this.toaster.success('Task Time Detail Updated Successfully');
            this.ApplyTaskTimeFormGroup.markAsPristine();
            if (type == 'ADDING_NEW_TASK') {
              this.addNewTaskDetail();
            }
          }
        });
    }
  }

  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
  send() {
    this.taskmailserviceService
      .sendTaskMail(this.ApplyTaskTimeFormGroup.get('headerId')?.value)
      .subscribe((res) => {
        if (res.status === 2) {
          this.toaster.success('Mail Sent Successfully');
        } else {
          this.sendErrorMsg = this.modalService.open(AlertPopupComponent, {
            backdrop: 'static',
          });
          const errorArray = [new InputError('select', res.message)];
          this.sendErrorMsg.componentInstance.content = new ModalMsg(
            'error',
            '',
            errorArray
          );
        }
      });
  }
}
