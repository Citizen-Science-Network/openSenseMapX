import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThreadQuery } from 'src/app/models/threads/threads.query';
import { ThreadService } from 'src/app/models/threads/threads.service';
import { ThreadStore } from 'src/app/models/threads/threads.store';
import { Thread } from 'src/app/models/threads/threads.model';
import { SessionService } from 'src/app/models/session/state/session.service';
import { SessionQuery } from 'src/app/models/session/state/session.query';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'osem-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {

  loggedIn$ = this.sessionQuery.isLoggedIn$;

  threads: Thread[]= [];

  thread$ = this.threadQuery.selectEntity('61d432b86734cf0534df3e14');

  threadToBeUpdated: Thread;

  isUpdateActivated = false;
  
  updateThreadSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private threadQuery: ThreadQuery, private threadService: ThreadService, private threadStore: ThreadStore, private sessionQuery: SessionQuery) { }

  url_id$: string;
  
  //private route$: ActivatedRoute

  ngOnInit() {

  this.threadService.get().subscribe();
   
  

  //   this.activatedRoute.queryParams.subscribe(params => {
  //     let threadId = params['id'];
  //     console.log(threadId); // Print the parameter to the console. 
  // });
  this.activatedRoute.url.subscribe(params => {
    this.url_id$ = params[1].path;
    console.log(this.url_id$);
  });
  }

  formatThreadDate(event){
    this.threadToBeUpdated.date= new Date(event);
    console.log(this.threadToBeUpdated);
  }

  
  addComments(event){
    //this.threadToBeUpdated = Object.assign([], this.threadToBeUpdated);
    this.threadToBeUpdated = cloneDeep(this.threadToBeUpdated);
    this.threadToBeUpdated.comments.push(event);
    console.log(this.threadToBeUpdated);
  }

  updateThread(updateForm){
    console.log(updateForm);
    console.log(updateForm.value);
    this.updateThreadSub = this.threadService.updateComments(this.url_id$, this.threadToBeUpdated).subscribe(result =>
      console.log('works'));
  }
  
  showThreadForm(thread: Thread){
    this.threadToBeUpdated={...thread};
    this.isUpdateActivated = true;
    console.log(thread);
  }
 

}
