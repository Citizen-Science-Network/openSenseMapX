import { Injectable } from '@angular/core';
import { Query, QueryEntity, toBoolean } from '@datorama/akita';
import { ThreadStore, ThreadState } from './threads.store'; 

 @Injectable({ providedIn: 'root' })
 export class ThreadQuery extends QueryEntity<ThreadState> {
  
constructor(protected store: ThreadStore) {
     super(store);
   }
 }