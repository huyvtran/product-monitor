import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mshopkeeper',
  templateUrl: './mshopkeeper.page.html',
  styleUrls: ['./mshopkeeper.page.scss'],
})
export class MshopkeeperPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  navigate(uri) {
    const origin = window.location.origin;
    window.location.href = origin + uri;
  }
}
