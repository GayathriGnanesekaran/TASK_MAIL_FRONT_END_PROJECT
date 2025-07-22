import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplypageComponent } from './applypage/applypage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

const routes: Routes = [
   { path: '', redirectTo: 'loginpage', pathMatch: 'full' },
 
   {path:'applypage',component: ApplypageComponent},
   {path:'loginpage',component:LoginpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
