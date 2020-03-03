import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss', 'custom.css'],
})
export class HomePage { 

  constructor(private router: Router) {}

  startApp() {
    this.router.navigate(["sme"]);
  }  
}
