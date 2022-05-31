import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KwmGoStudentService } from "../shared/kwm-go-student.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Offer, Timeslot, Usercomment } from "../shared/offer";
import { OfferFactory } from "../shared/offer-factory";
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
import { UsercommentFactory } from "../shared/usercomment-factory";

@Component({
  selector: 'kgs-offer-details',
  templateUrl: './offer-details.component.html',
  styles: [
  ]
})
export class OfferDetailsComponent implements OnInit {

  offer:Offer = OfferFactory.empty();
  // usercomment:Usercomment = UsercommentFactory.empty();

  constructor(private kgs:KwmGoStudentService,
              private route:ActivatedRoute,
              private router:Router,
              private toastr:ToastrService,
              // public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const  params = this.route.snapshot.params;
    this.kgs.getSingle(params['id']).subscribe(o=> this.offer = o);
  }
  renderDate(date:any) {
    return moment(date).format("Do MMM YYYY");
  }
  renderDateTime(date:any) {
    return moment(date).format("DD.MM.YYYY - hh:mm");
  }

  bookTimeslot(timeslot:Timeslot) {

  }

  removeTimeslot(timeslot: Timeslot) {
    if(confirm('Wollen Sie diesen Termin wirklich löschen')) {
      this.toastr.warning("Termin erfolgreich gelöscht", "Termin gelöscht");
      this.kgs.removeTimeslot(timeslot.id).subscribe(res => {
        const  params = this.route.snapshot.params;
        this.kgs.getSingle(params['id']).subscribe(o=> this.offer = o);
      });
    }
  }

  removeOffer() {
    if(confirm('Wollen Sie das Angebot wirklich löschen')) {
      this.toastr.warning("Angebot erfolgreich gelöscht", "Angebot gelöscht");
      this.kgs.remove(this.offer.id).subscribe(res => this.router.navigate(['../'], {relativeTo:this.route}));
    }
  }

}
