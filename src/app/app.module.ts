// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './containers/loginpage/loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';


import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TaskGridComponent } from './task-grid/task-grid.component';
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
    // NgbButtonsModule,
    // NgbDropdownModule,
    // NgbModalModule,
    NgbPopoverModule,
    // NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap'
import { SafeIconPipe } from './components/safe-icon.pipe';
import { InspireIconComponent } from './components/inspire-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    TaskGridComponent,
    HomepageComponent,
   

    PagenotfoundComponent,

    ViewsampleComponent,
    ViewFilterFormComponent,
    ViewTaskTimeDetailsComponent,
    ViewTaskScheduleDetailsComponent,
 
    ApplyTaskTimeGridComponent,
    ApplyTaskTimeScheduleComponent,
    ApplypageComponent,

    HeaderCommonComponent,
    InspireIconComponent,
      DiceMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    SafeIconPipe,
    BsDatepickerModule
   ],
  providers: [
   provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
