import { Component, OnInit } from '@angular/core';
import { KwmGoStudentService } from "../shared/kwm-go-student.service";
import { Offer } from "../shared/offer";
import { AuthenticationService } from "../shared/authentication.service";

@Component({
  selector: 'kgs-offer-list',
  templateUrl: './offer-list.component.html',
  styles: [
  ]
})
export class OfferListComponent implements OnInit {

  offers:Offer[] = [];

  constructor(private kgs:KwmGoStudentService, public authService:AuthenticationService) { }

  ngOnInit(): void {
    this.kgs.getAll().subscribe(res => this.offers = res);
  }

}
