import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ThreadStore } from './threads.store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Thread } from './threads.model';
import { schema } from 'normalizr';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Campaign } from '../campaign/campaign.model';

@Injectable({ providedIn: 'root'})
export class ThreadService {

    AUTH_API_URL = environment.api_url;
    

    constructor(
        private threadStore: ThreadStore, 
        private http: HttpClient) {
    }

    createThread(title: string, date: Date, campaign: string): any {
        return this.http.post<any>(`${environment.api_url}/users/thread`, {title, date, campaign}).pipe(
            tap( value => {
                console.log(value);
                this.threadStore.add([value]);
                //alert('Campaign was created successfully!');
            })
        )
    }

    get () {

        const thread = new schema.Entity('threads', {}, { idAttribute: '_id'});
    
       return this.http.get<any>(`${environment.api_url}/users/threads`).pipe(tap(entities => {
            this.threadStore.upsertMany(entities.data.stream)   
            console.log(entities.data.stream);
       }))
    }

    //  updateComments(id: string, comments: any): Observable<Thread> {
    //      return this.http.put<Thread>(`${environment.api_url}/users/thread/` + id, comments)
    //  }
     updateComments(id: string, thread: Thread): Observable<any> {
        return  this.http.put(`${environment.api_url}/users/thread/` + id, thread).pipe(
           tap( result => {
                this.threadStore.update(id, thread);
                
         }))
          
    }
    
}