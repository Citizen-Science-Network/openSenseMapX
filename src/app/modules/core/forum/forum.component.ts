import { Component, OnInit } from '@angular/core';
import { ThreadQuery } from 'src/app/models/threads/threads.query';
import { ThreadService } from 'src/app/models/threads/threads.service';
import { Thread } from 'src/app/models/threads/threads.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from 'src/app/models/session/state/session.service';
import { SessionQuery } from 'src/app/models/session/state/session.query';
import { ThreadStore } from 'src/app/models/threads/threads.store';

@Component({
  selector: 'osem-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  loggedIn$ = this.sessionQuery.isLoggedIn$;
  
  allThreads$ = this.threadQuery.selectAll();
    
  threadToBeUpdated: any;

  isUpdateActivated = false; 

  updateThreadSub: Subscription; 

  deleteThreadSub: Subscription;

  constructor(private router: Router, private sessionQuery: SessionQuery, private threadQuery: ThreadQuery, private threadService: ThreadService, private threadStore: ThreadStore) { }

  ngOnInit() {
    this.threadService.get().subscribe();
    this.allThreads$.subscribe(res => console.log(res));
  }

  viewThread(threadId: string){
    this.router.navigateByUrl(`/(sidebar:m/threads/${threadId})`);
  }

}
