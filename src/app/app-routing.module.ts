import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplypageComponent } from './containers/applypage/applypage.component';
import { LoginpageComponent } from './containers/loginpage/loginpage.component';
import { ViewsampleComponent } from './containers/viewsample/viewsample.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NavigationComponent } from './containers/navigation/navigation.component';

const routes: Routes = [
    {path:'',component:LoginpageComponent},
    {path:'task',component: NavigationComponent,
      children: [
        { path: '', redirectTo: 'apply-page', pathMatch: 'full' },
        { path: 'apply-page', component: ApplypageComponent },
        { path: 'view-page', component: ViewsampleComponent },
      ],
    },
    // {path:'apply-page',component:ApplypageComponent},
    // {path:'view-page',component:ViewsampleComponent},
    {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
        
}
