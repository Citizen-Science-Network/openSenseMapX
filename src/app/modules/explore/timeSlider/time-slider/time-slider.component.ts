import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { slideInOutHorizontal, slideInOutHorizontalBoolean } from 'src/app/helper/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInOutHorizontal, slideInOutHorizontalBoolean]
})
export class TimeSliderComponent implements OnInit {

  @Input() dateRange;
  @Input() selectedDate; 
  @Input() selectedPheno; 
  @Input() filterVisible; 
  @Input() intervalPlaying; 
  @Output() dateSelected = new EventEmitter();
  @Output() dateRangeRemoved = new EventEmitter();
  @Output() backwardPressed = new EventEmitter();
  @Output() playPressed = new EventEmitter();
  @Output() forwardPressed = new EventEmitter();
  @Output() pausePressed = new EventEmitter();
  
  selectDate = 1572966000000;
  step = 3600000;

  constructor() { }

  ngOnInit() {
  }

  changed(ev){
    this.dateSelected.emit(new Date(this.selectedDate));
  }

  removeDateRange(){
    this.dateRangeRemoved.emit();
  }

  backward(){
    this.backwardPressed.emit()
  }
  play(){
    this.playPressed.emit()
  }
  pause(){
    this.pausePressed.emit()
  }
  forward(){
    this.forwardPressed.emit()
  }

}
