import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qlcb',
  templateUrl: './qlcb.page.html',
  styleUrls: ['./qlcb.page.scss'],
})
export class QlcbPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  navigate(uri) {
    const origin = window.location.origin;
    window.location.href = origin + uri;
  }

}
