import { Component, OnInit } from '@angular/core';
import { KwmGoStudentService } from "../shared/kwm-go-student.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Offer } from "../shared/offer";
import { OfferFactory } from "../shared/offer-factory";

@Component({
  selector: 'kgs-offer-details',
  templateUrl: './offer-details.component.html',
  styles: [
  ]
})
export class OfferDetailsComponent implements OnInit {

  offer:Offer = OfferFactory.empty();

  constructor(private kgs:KwmGoStudentService,
              private route:ActivatedRoute,
              private router:Router,
              // private toastr:ToastrService,
              // public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const  params = this.route.snapshot.params;
    this.kgs.getSingle(params['id']).subscribe(o=> this.offer = o);
  }

}
