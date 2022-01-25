import { CampaignsComponent } from './modules/core/campaigns/campaigns.component';
import { MyBoxesContainerComponent } from './modules/profile/my-boxes-container/my-boxes-container.component';
import { AuthGuard } from './modules/profile/services/auth-guard.service';
import { LoginContainerComponent } from './modules/profile/login-container/login-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoxSingleContainerComponent } from './modules/explore/box/box-single-container/box-single-container.component';
import { BoxCompareContainerComponent } from './modules/explore/box/box-compare-container/box-compare-container.component';
import { ImpressumComponent } from './modules/core/impressum/impressum.component';
import { VisContainerComponent } from './modules/core/vis/vis-container/vis-container.component';
import { RegisterContainerComponent } from './modules/profile/register-container/register-container.component';
import { DashboardContainerComponent } from './modules/profile/dashboard-container/dashboard-container.component';
import { ProfileContainerComponent } from './modules/profile/profile-container/profile-container.component';
import { LegendEditContainerComponent } from './modules/explore/legend/legend-edit-container/legend-edit-container.component';
import { SidebarMenuComponent } from './modules/core/sidebar-menu/sidebar-menu.component';
import { SidebarMenuItemsComponent } from './modules/core/sidebar-menu-items/sidebar-menu-items.component';
import { PrivacyComponent } from './modules/core/privacy/privacy.component';
import { AboutComponent } from './modules/core/about/about.component';
import { ContactComponent } from './modules/core/contact/contact.component';
import { NewVisContainerComponent } from './modules/core/new-vis-container/new-vis-container.component';
import { FaqComponent } from './modules/core/faq/faq.component';
import { DonateComponent } from './modules/core/donate/donate.component';
import { ThanksComponent } from './modules/core/thanks/thanks.component';
import { CreateComponent } from './modules/core/create/create.component';
import { ForumComponent } from './modules/core/forum/forum.component';
import { ThreadsComponent } from './modules/core/threads/threads.component';

const routes: Routes = [
  {path: '', component: BoxSingleContainerComponent, pathMatch: 'full'},
  {path: 'explore/:id', component: BoxSingleContainerComponent},
  {path: 'compare', component: BoxCompareContainerComponent},
  // {path: 'impressum', component: ImpressumComponent},
  // {path: 'about', component: ImpressumComponent},
  {path: 'vis', component: VisContainerComponent, outlet: 'modal'},
  {path: 'newvis', component: NewVisContainerComponent, outlet: 'modal'},
  {path: 'edit-legend', component: LegendEditContainerComponent, outlet: 'modal'},
  {path: 'login', component: LoginContainerComponent, outlet: 'sidebar'},
  {path: 'register', component: RegisterContainerComponent, outlet: 'sidebar'},
  {path: 'm', component: SidebarMenuComponent, outlet: 'sidebar', children: [
    {
      path: '',
      component: SidebarMenuItemsComponent
    },
    {
      path: 'profile',
      loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    // { path: 'about', component: AboutComponent, data: {name: 'About'}},
    { path: 'faq', component: FaqComponent, data: {name: 'FAQ'}},
    // { path: 'about', component: AboutComponent, data: {name: 'ABOUT'}},
    { path: 'contact', component: ContactComponent, data: {name: 'CONTACT'}},
    { path: 'imprint', component: ImpressumComponent, data: {name: 'IMPRINT'}},
    { path: 'privacy', component: PrivacyComponent, data: {name: 'PRIVACY'}},
    { path: 'donate', component: DonateComponent, data: {name: 'DONATE'}},
    { path: 'thanks', component: ThanksComponent, data: {name: 'THANKS'}},
    { path: 'create', component: CreateComponent, data: {name: 'CREATE'}},
    { path: 'campaigns', component: CampaignsComponent, data: {name: 'CAMPAIGNS'}},
    { path: 'forum', component: ForumComponent, data: {name: 'FORUM'}},
    { path: 'threads/:threadId', component: ThreadsComponent, data: {name: 'THREADS'}}
  ]},
  {path: 'dashboard', component: ProfileContainerComponent, outlet: 'sidebar', canActivate: [AuthGuard], children: [
    {path: '', component: DashboardContainerComponent, canActivate: [AuthGuard], pathMatch: 'full'},
    {path: 'boxes', component: MyBoxesContainerComponent, canActivate: [AuthGuard]}
    ]
  },
// {path: 'boxes', component: MyBoxesContainerComponent, outlet: 'sidebar', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
