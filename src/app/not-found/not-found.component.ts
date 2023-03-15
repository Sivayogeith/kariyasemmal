import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  currentUrl: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentUrl = this.route.snapshot.url.join('/');
  }
}
