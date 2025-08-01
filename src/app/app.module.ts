// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './containers/loginpage/loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClient, provideHttpClient} from '@angular/common/http';
import { ViewsampleComponent } from './containers/viewsample/viewsample.component';
import { ViewFilterFormComponent } from './components/view-filter-form/view-filter-form.component';
import { ViewTaskTimeDetailsComponent } from './components/view-task-time-details/view-task-time-details.component';
import { ViewTaskScheduleDetailsComponent } from './components/view-task-schedule-details/view-task-schedule-details.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HeaderCommonComponent } from './components/header-common/header-common.component';

import { ApplyTaskTimeGridComponent } from './components/apply-task-time-grid/apply-task-time-grid.component';
import { ApplyTaskTimeScheduleComponent } from './components/apply-task-time-schedule/apply-task-time-schedule.component';
import { ApplypageComponent } from './containers/applypage/applypage.component';
import { DiceMenuComponent } from './components/dice-menu/dice-menu.component';
import {
  NgbActiveModal,
    // NgbButtonsModule,
    // NgbDropdownModule,
    // NgbModalModule,
    NgbPopoverModule,
    // NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap'
import { SafeIconPipe } from './components/safe-icon.pipe';
import { InspireIconComponent } from './components/inspire-icon.component';
import { NavigationComponent } from './containers/navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AlertPopupComponent } from './containers/alert-popup/alert-popup.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    PagenotfoundComponent,

    ViewsampleComponent,
    ViewFilterFormComponent,
    ViewTaskTimeDetailsComponent,
    ViewTaskScheduleDetailsComponent,
 
    ApplyTaskTimeGridComponent,
    ApplyTaskTimeScheduleComponent,
    ApplypageComponent,
  NavigationComponent,
    HeaderCommonComponent,
    InspireIconComponent,
      DiceMenuComponent,
      AlertPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    SafeIconPipe,
    BsDatepickerModule,
    NgbModule
   ],
  providers: [
   provideHttpClient(),
   NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
