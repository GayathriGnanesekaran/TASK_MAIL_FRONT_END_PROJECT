// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { ApplypageComponent } from './applypage/applypage.component';
import { ViewpageComponent } from './viewpage/viewpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TaskGridComponent } from './task-grid/task-grid.component';
import { HttpClient, provideHttpClient} from '@angular/common/http';
import { ViewsampleComponent } from './viewsample/viewsample.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    TaskGridComponent,
    HomepageComponent,
    ApplypageComponent,
    ViewpageComponent,
    PagenotfoundComponent,
    ViewsampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   ],
  providers: [
   provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
