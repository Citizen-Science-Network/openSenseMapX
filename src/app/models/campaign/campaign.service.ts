import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { CampaignStore } from './campaign.store';
//import { CampaignQuery } from './campaign.query';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Campaign } from './campaign.model';
import { schema } from 'normalizr';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

    createCampaign(title: string, polygonDraw: number[], owner: string, aboutMe: string, campaignGoals: string, campaignDetails: string, startDate: Date, endDate: Date, phenomena: string, image: string): Observable<Campaign> {
        return this.http.post<Campaign>(`${environment.api_url}/users/campaign`, {title, polygonDraw, owner, aboutMe, campaignGoals, campaignDetails, startDate, endDate, phenomena, image}).pipe(
            tap( value => {
                console.log(value);
                this.campaignStore.add([value]);
                //alert('Campaign was created successfully!');
            })
        )
    }

    updateCampaign(campaignId: string, campaign: Campaign): Observable<any> {
        return this.http.put(`${environment.api_url}/users/campaign/` + campaignId, campaign).pipe(
            tap( result => {
                 this.campaignStore.update(campaignId, campaign);
                 alert('Campaign was updated successfully!');
            })
        )
    }
    
    deleteCampaign(id: string): Observable<any> {
        return this.http.delete(`${environment.api_url}/users/campaign/${id}`).pipe(
            tap( result => {
                this.campaignStore.remove(id);
                //alert('Campaign deleted!');
            })
        )
    }

    remove(id: ID){
        this.campaignStore.remove(id);
    }
}