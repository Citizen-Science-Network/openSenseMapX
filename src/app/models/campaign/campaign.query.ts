import { Injectable } from '@angular/core';
import { Query, QueryEntity, toBoolean } from '@datorama/akita';
import { CampaignStore, CampaignState } from './campaign.store'; 

 @Injectable({ providedIn: 'root' })
 export class CampaignQuery extends QueryEntity<CampaignState> {
  
constructor(protected store: CampaignStore) {
     super(store);
   }
 }