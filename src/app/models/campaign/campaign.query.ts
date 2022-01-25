import { Injectable } from '@angular/core';
import { Query, QueryEntity, toBoolean } from '@datorama/akita';
import { CampaignStore, CampaignState } from './campaign.store'; 
import { Observable } from 'rxjs';
import { Campaign } from './campaign.model';

 @Injectable({ providedIn: 'root' })
 export class CampaignQuery extends QueryEntity<CampaignState> {
  
constructor(protected store: CampaignStore) {
     super(store);
   }

   getCampaigns(): Observable<Campaign[]>{
     return this.select( state => state.campaigns);
   }
 }