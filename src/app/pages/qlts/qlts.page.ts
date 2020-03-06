import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qlts',
  templateUrl: './qlts.page.html',
  styleUrls: ['./qlts.page.scss'],
})
export class QltsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  navigate(uri) {
    const origin = window.location.origin;
    window.location.href = origin + uri;
  }

}
