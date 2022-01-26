import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { CampaignStore } from './campaign.store';
//import { CampaignQuery } from './campaign.query';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Campaign } from './campaign.model';
import { schema } from 'normalizr';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class CampaignService {

    AUTH_API_URL = environment.api_url;

    constructor(
        private campaignStore: CampaignStore, 
        //private campaignQuery: CampaignQuery, 
        private http: HttpClient) {
    }

    get () {

        const campaign = new schema.Entity('campaigns', {}, { idAttribute: '_id'});
    
       return this.http.get<any>(`${environment.api_url}/users/campaigns`).pipe(tap(entities => {
            this.campaignStore.upsertMany(entities.data.stream)   
            console.log(entities.data.stream);
       }))
    }

    getSingleCampaign(id){
        return this.http.get<Campaign>(`${environment.api_url}/users/campaigns/${id}`).pipe(tap(entity => {
            console.log(entity)
        }))
    }

    // getMyCampaigns(){
    //     let headers = new HttpHeaders();
    //     headers = headers.append('Authorization', 'Bearer '+ window.localStorage.getItem('sb_accesstoken'));

    //     this.http.get(this.AUTH_API_URL + '/users/me/campaigns', {headers: headers}).subscribe(res:any) => {
    //         console.log(res);
    //     }
    //}

    add(campaign: Campaign){
        this.campaignStore.add(campaign);
    }

    update(id, campaign: Partial<Campaign>){
        this.campaignStore.update(id, campaign);
    }

    remove(id: ID){
        this.campaignStore.remove(id);
    }
}