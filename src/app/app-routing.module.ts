import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplypageComponent } from './applypage/applypage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ViewpageComponent } from './viewpage/viewpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
    {path:'',component:LoginpageComponent},
    {path:'apply-page',component: ApplypageComponent},
    {path:'view-page',component:ViewpageComponent},
    {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
        
}
