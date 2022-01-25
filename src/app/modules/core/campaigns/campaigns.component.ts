import { Component, OnInit } from '@angular/core';
import { CampaignQuery } from 'src/app/models/campaign/campaign.query';
import { CampaignService } from 'src/app/models/campaign/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { PhenomenaService } from '../services/phenomena.service';
import { SessionService } from 'src/app/models/session/state/session.service';
import { SessionQuery } from 'src/app/models/session/state/session.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { ThreadService } from 'src/app/models/threads/threads.service';
import { ThreadStore } from 'src/app/models/threads/threads.store';

@Component({
  selector: 'osem-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  loggedIn$ = this.sessionQuery.isLoggedIn$;

  currentUser: any;

  whurl = 'https://discord.com/api/webhooks/932937133918937130/kmiGdfNRbD8MluFz2eLHJwyFmTmtODuPxqImAxC34DyOlJ1Z8OC1vA7rHAypexC-xeTr';

  allCampaigns$ = this.campaignQuery.selectAll();

  campaignToBeUpdated: any;

  isUpdateActivated = false;

  updateCampaignSub: Subscription;

  deleteCampaignSub: Subscription;

  phenomena

  //Accordion stuff
  view_ac='';
  //Function for opening and closing accordion
  changeAccordion(ac) {
    if (ac == this.view_ac) {
      this.view_ac = '';
    }
    else {
      this.view_ac = ac;
    }
  }

  //Function for opening "update" functionality only for currently selected campaign
  view_update = '';
  changeUpdate(update) {
    if (update == this.view_update) {
      this.view_update = '';
    }
    else {
      this.view_update = update;
    }
  }
  constructor(private sessionQuery: SessionQuery,
              private phenomenaService: PhenomenaService,
              private datePipe : DatePipe,
              private campaignQuery: CampaignQuery,
              private campaignservice: CampaignService,
              private threadService: ThreadService,
              private threadStore: ThreadStore,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private uiService: UiService) { }

  ngOnInit() {
    this.campaignservice.get().subscribe();
    this.phenomena = this.phenomenaService.getPhenomena();
    //Hide menu on the left side
    this.uiService.setFilterVisible(false);
  }

  formatStartdate(event){
    this.campaignToBeUpdated.startDate = new Date(event);
  }

  formatEnddate(event){
    this.campaignToBeUpdated.endDate = new Date(event);
  }

  

  createThread(campaign: Campaign){
    this.campaignToBeUpdated = {...campaign};
    console.log(this.campaignToBeUpdated._id);
    console.log(this.campaignToBeUpdated.title);
    let date = new Date();
    console.log(date);
    let title = this.campaignToBeUpdated.title + ' thread';
    console.log(title);
    const msg = {content: title};
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.whurl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(msg));
    
    this.threadService.createThread(title, date, this.campaignToBeUpdated._id).subscribe(result => {
      this.threadStore.update(state => {
        console.log(state);
        
        return {
          threads : 
          
            result
          
        };
      });

  })}

   addParticipant(event){
     console.log(event);
     this.sessionQuery.user$.subscribe(result =>
       this.currentUser = result.name);
     this.campaignToBeUpdated.participants.push(this.currentUser);
     console.log(this.campaignToBeUpdated);
   }

  showUpdateForm(campaign: Campaign){
    this.campaignToBeUpdated = {...campaign};
    this.isUpdateActivated = true;
    console.log(campaign);
    console.log(this.campaignToBeUpdated);
  }

   joinCampaign(campaign: Campaign){
     this.campaignToBeUpdated = {...campaign};
     console.log(this.campaignToBeUpdated);
     this.sessionQuery.user$.subscribe(result =>
      this.currentUser = result.name);

     console.log(this.currentUser);
     this.campaignToBeUpdated.participants =this.currentUser;
     console.log(this.campaignToBeUpdated);
    this.updateCampaignSub = this.campaignservice.updateCampaign(
        this.campaignToBeUpdated._id, this.campaignToBeUpdated).subscribe(result =>
         console.log(result)
         );
      //this.campaignToBeUpdated = null;
    }

  updateCampaign(updateForm) {
      // let sd= updateForm.value.startDate;
      // sd = this.datePipe.transform(sd, 'yyyy-MM-dd');
      // sd = new Date(sd);
      // console.log(sd);
      //console.log(updateForm);
      console.log(updateForm.value);
      this.updateCampaignSub = this.campaignservice.updateCampaign(
       this.campaignToBeUpdated._id, updateForm.value).subscribe(result =>
         console.log(result)
         //console.log(updateForm.value)
       );
     this.isUpdateActivated = false;
     this.campaignToBeUpdated = null;
   }

  deleteCampaign(campaignId: string){
    this.deleteCampaignSub = this.campaignservice.deleteCampaign(campaignId).subscribe(result => {
      console.log(result);
    })
  }

}
