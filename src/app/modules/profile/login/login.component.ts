import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'osem-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  @Input() user;
  // @Input() errorMessage;
  // @Input() loading;
  @Output() loggedIn = new EventEmitter();


  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit() {

    this.loginForm = this.builder.group({
      email: [null, Validators.required],
      password:  [null, Validators.required]
    });
  }

  ngOnDestroy() {
  }

  login() {
    if(this.loginForm.valid)
      this.loggedIn.emit(this.loginForm.getRawValue());
 }

}

