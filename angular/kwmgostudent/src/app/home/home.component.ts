import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Offer } from "../shared/offer";

@Component({
  selector: 'kgs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  offerSelected(offer:Offer) {
    this.router.navigate(['../offers', offer.id], {relativeTo:this.route});
  }

}