// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { ApplypageComponent } from './applypage/applypage.component';
<<<<<<< HEAD
import { ViewpageComponent } from './viewpage/viewpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
<<<<<<< Updated upstream
=======
import { TaskGridComponent } from './task-grid/task-grid.component';
>>>>>>> 9bb3fa978ba83702a4e9cb2c5208d018b0e23407
=======
import { HttpClient, provideHttpClient} from '@angular/common/http';

>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    TaskGridComponent,
    HomepageComponent,
    ApplypageComponent,
    ViewpageComponent,
    PagenotfoundComponent,
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
