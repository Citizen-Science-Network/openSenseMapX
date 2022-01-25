import { PhenomenaService } from 'src/app/modules/core/services/phenomena.service';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchComponent } from './filter/search/search.component';
import { SearchContainerComponent } from './filter/search-container/search-container.component';
import { PhenomenonComponent } from './filter/phenomenon/phenomenon.component';
import { NavContainerComponent } from './nav/nav-container/nav-container.component';
import { NavRightComponent } from './nav/nav-right/nav-right.component';
import { FilterContainerComponent } from './filter/filter-container/filter-container.component';
import { BottomBarContainerComponent } from './bottom-bar-container/bottom-bar-container.component';
import { RouterModule } from '@angular/router';
import { DatepickerComponent } from './filter/datepicker/datepicker.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FilterSwitcherComponent } from './filter/filter-switcher/filter-switcher.component';
import { FilterComponent } from './filter/filter/filter.component';
import { ExploreModule } from '../explore/explore.module';
import { ImpressumComponent } from './impressum/impressum.component';
import { FaqComponent } from './faq/faq.component';
import { DonateComponent } from './donate/donate.component';
import { ThanksComponent } from './thanks/thanks.component';
import { PhenoInfoComponent } from './pheno-info/pheno-info.component';
import { PhenoInfoModalComponent } from './pheno-info-modal/pheno-info-modal.component';
import { SharedModule } from '../shared/shared.module';
import { VisContainerComponent } from './vis/vis-container/vis-container.component';
import { VisComponent } from './vis/vis/vis.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { FilterContainerValuesComponent } from './filter/filter-container-values/filter-container-values.component';
import { FilterValuesComponent } from './filter/filter-values/filter-values.component';
import { DatetimeModalContainerComponent } from './filter/datetime-modal-container/datetime-modal-container.component';
import { DatetimeModalComponent } from './filter/datetime-modal/datetime-modal.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { SidebarMenuItemsComponent } from './sidebar-menu-items/sidebar-menu-items.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SidebarBreadcrumbsComponent } from './sidebar-breadcrumbs/sidebar-breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';
import { NewVisContainerComponent } from './new-vis-container/new-vis-container.component';
import { NewVisComponent } from './new-vis/new-vis.component';
import { VisFormComponent } from './vis-form/vis-form.component';
import { CreateComponent } from './create/create.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignService } from 'src/app/models/campaign/campaign.service';
import { ForumComponent } from './forum/forum.component';
import { ThreadsComponent } from './threads/threads.component';


@NgModule({
  declarations: [FilterContainerComponent, SearchComponent, SearchContainerComponent, PhenomenonComponent, NavContainerComponent, NavRightComponent, BottomBarContainerComponent, DatepickerComponent, FilterSwitcherComponent, FilterComponent, ImpressumComponent, FaqComponent, DonateComponent, ThanksComponent, PhenoInfoComponent, PhenoInfoModalComponent, VisContainerComponent, VisComponent, FilterContainerValuesComponent, FilterValuesComponent, DatetimeModalContainerComponent, DatetimeModalComponent, SidebarMenuComponent, SidebarMenuItemsComponent, AboutComponent, PrivacyComponent, SidebarBreadcrumbsComponent, ContactComponent, NewVisContainerComponent, NewVisComponent, VisFormComponent, CreateComponent, CampaignsComponent, ForumComponent, ThreadsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
    PhenomenaService,
    [CampaignService],
    [DatePipe]

],
  exports: [FilterContainerComponent, NavContainerComponent, BottomBarContainerComponent, PhenomenonComponent, ImpressumComponent, FaqComponent, DonateComponent, ThanksComponent, PhenoInfoModalComponent, FilterContainerValuesComponent, DatetimeModalContainerComponent, NewVisContainerComponent],
})
export class CoreModule { }
