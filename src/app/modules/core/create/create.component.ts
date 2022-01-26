import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormDesign } from 'src/app/form';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { PhenomenaService } from '../services/phenomena.service';
import { CampaignQuery } from 'src/app/models/campaign/campaign.query';
import { CampaignService } from 'src/app/models/campaign/campaign.service';
import { MapService } from 'src/app/modules/explore/services/map.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';

@Component({
  selector: 'osem-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  phenomena;
  model = new FormDesign();
  selectedPolygon$ = this.uiQuery.selectedPolygon$;

  submitted = false;
  allCampaigns$ = this.campaignQuery.selectAll();

  onSubmit() {
              this.submitted = true;
            }

  constructor(private campaignQuery: CampaignQuery, private campaignservice: CampaignService, private phenomenaService: PhenomenaService, private uiService: UiService,
    private mapService: MapService, private uiQuery: UiQuery) {}

  ngOnInit() {
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
