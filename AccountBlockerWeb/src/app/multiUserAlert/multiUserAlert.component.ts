import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/Service/Authentication.service';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-multiUserAlert',
  templateUrl: './multiUserAlert.component.html',
  styleUrls: ['./multiUserAlert.component.scss']
})
export class MultiUserAlertComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
