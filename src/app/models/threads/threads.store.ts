import { Injectable } from "@angular/core";
import { EntityStore, EntityState, StoreConfig, MultiActiveState } from "@datorama/akita";
import { Thread } from './threads.model'; 

export interface ThreadState extends EntityState<Thread>, MultiActiveState{}

const initialState = {
    
};

@Injectable({ providedIn: 'root'})
@StoreConfig({name: 'Thread', idKey: '_id'})
export class ThreadStore extends EntityStore<ThreadState>{

    constructor(){
        super(initialState);
    }
}
