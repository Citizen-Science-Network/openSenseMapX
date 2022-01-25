import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormDesign } from 'src/app/form';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { PhenomenaService } from '../services/phenomena.service';
import { CampaignQuery } from 'src/app/models/campaign/campaign.query';
import { CampaignService } from 'src/app/models/campaign/campaign.service';
import { MapService } from 'src/app/modules/explore/services/map.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { CampaignStore } from 'src/app/models/campaign/campaign.store';
import { Campaign } from 'src/app/models/campaign/campaign.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as uuid from 'uuid';





@Component({
  selector: 'osem-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {


  createCampaignSub: Subscription;

  campaigns =[];

  phenomena

  model = new FormDesign();
  selectedPolygon$ = this.uiQuery.selectedPolygon$;

  submitted = false;
  allCampaigns$ = this.campaignQuery.selectAll();
  singleCampaign$ = this.campaignQuery.selectLast();

 // onSubmit() {
 //             this.submitted = true;
 //           }


  constructor(private campaignQuery: CampaignQuery, private campaignservice: CampaignService, private phenomenaService: PhenomenaService, private uiService: UiService,
    private mapService: MapService, private uiQuery: UiQuery) {}

  ngOnInit(): void {
     this.campaignQuery.getCampaigns().subscribe(res => this.campaigns = res);
     this.phenomena = this.phenomenaService.getPhenomena();
     this.campaignservice.get().subscribe();
     this.uiService.setFilterVisible(false);
     this.mapService.DrawControlMap();
     this.selectedPolygon$.subscribe(polygon => {this.model.polygonDraw = polygon});
     let that = this;
     setTimeout(function(){ that.uiService.setdrawmode(true)},100)
    }

    ngOnDestroy(){
      console.log("Destroy");
      this.uiService.setdrawmode(false);
    }



}

  onSubmit(submittedForm){
    
    function formatTimeString(s){
      var b = s.split("-", 3);
      return b[0] + '-' + b[1] + '-' + b[2] + 'T15:00:00Z';
    }

    // console.log(formatTimeString(submittedForm.value.startdate));
    
    // let sd = formatTimeString(submittedForm.value.startdate);

    // let d = new Date('2021-12-03');

    // console.log(d);

    let startD = new Date(submittedForm.value.startdate);

    let x = startD.toISOString();

    startD = new Date(x);

    console.log(startD);

    let endD = new Date(submittedForm.value.enddate);

    let y = endD.toISOString();

    endD= new Date(y);

    console.log(endD);

    //const bson = require('bson');

    //let newID = new bson.ObjectId();
    //newID = newID.toString();
                     
    if(submittedForm.invalid){
      return;
    }

    const campaign ={ 
      //_id: uuid.v4(), 
      //_id: newID,
      title: submittedForm.value.title,
      owner: 'any',
      aboutMe: submittedForm.value.aboutme,
      campaignGoals: submittedForm.value.campaigngoals,
      campaignDetails: submittedForm.value.campaigndetails,
      startDate: startD,
      endDate: endD,
      phenomena: submittedForm.value.phenomena,
      participants: [] 
    }

    console.log(campaign);
    // if(campaign._id.match(/^[0-9a-fA-F]{24}$/)){
    //   console.log('matches');
    // }

        
    this.campaignservice.createCampaign(campaign.title, campaign.aboutMe, campaign.campaignGoals, campaign.campaignDetails, campaign.startDate, campaign.endDate, campaign.phenomena).subscribe(result => {
      this.campaignStore.update(state => {
        console.log(state);
        
        return {
          campaigns : 
          
            result
          
        };
      });
      this.router.navigateByUrl('/(sidebar:m/campaigns)');
    });


  
  // const campaign: Campaign = { _id: uuid.v4(), 
  //                              title: submittedForm.value.title,
  //                              owner: 'any',
  //                              aboutMe: submittedForm.value.aboutMe,
  //                              campaignGoals: submittedForm.value.campaignGoals,
  //                              campaignDetails: submittedForm.value.campaignDetails,
  //                              startDate: submittedForm.value.startDate,
  //                              endDate: submittedForm.value.endDate,
  //                              phenomena: submittedForm.value.phenomena 
  // }
       
  // this.createCampaignSub = this.campaignservice.createCampaign(campaign).subscribe(result => {
  //   console.log(this.createCampaignSub);
  //   this.router.navigateByUrl('/(sidebar:m/campaigns');
  // });                             
  }
}  
