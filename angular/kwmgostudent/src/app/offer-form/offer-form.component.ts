import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { OfferFormErrorMessages } from "./offer-form-error-messages";
import { OfferFactory } from "../shared/offer-factory";
import { KwmGoStudentService } from "../shared/kwm-go-student.service";
import { Offer, User } from "../shared/offer";

@Component({
  selector: 'kgs-offer-form',
  templateUrl: './offer-form.component.html',
  styles: [
  ]
})
export class OfferFormComponent implements OnInit {

  offerForm:FormGroup;
  offer = OfferFactory.empty();
  errors:{[key:string]:string} = {};
  isUpdatingOffer = false;
  timeslots:FormArray;
  emptyUser = new User(1, [], "", "", false, "", "");

  constructor(private fb:FormBuilder, private kgs:KwmGoStudentService, private route:ActivatedRoute, private router:Router) {
    this.offerForm = this.fb.group({});
    this.timeslots = this.fb.array([]);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      //update offer
      this.isUpdatingOffer = true;
      this.kgs.getSingle(id).subscribe(offer =>{
        this.offer = offer;
        this.initOffer();
      })
    }
    this.initOffer();
  }

  initOffer(){
    this.buildTimeslotsArray();
    this.offerForm = this.fb.group({
      id: this.offer.id,
      user_id: this.offer.user_id,
      user: this.emptyUser,
      subject: [this.offer.subject, Validators.required],
      description: [this.offer.description, Validators.required],
      timeslots: this.timeslots
    });
    this.offerForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    });
  }

  buildTimeslotsArray() {
    if (this.offer.timeslots) {
      this.timeslots = this.fb.array([]);
      for (let slot of this.offer.timeslots) {
        let fg = this.fb.group( {
          id: new FormControl(slot.id),
          user: this.emptyUser,
          user_id: this.emptyUser.id,
          start: new FormControl(slot.start, [Validators.required]),
          end: new FormControl(slot.end, [Validators.required])
        });
        this.timeslots.push(fg);
      }
    }
  }

  addTimeslotControl() {
    this.timeslots.push(this.fb.group({id:0, user_id: 0, user: this.emptyUser, start:null, end:null}));
  }

  updateErrorMessages(){
    this.errors = {};
    for (const message of OfferFormErrorMessages) {
      const control = this.offerForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    // this.offerForm.value.images =  this.offerForm.value.images.filter(
    //   (thumbnail:{url:string})=>thumbnail.url
    // )
    const offer:Offer = OfferFactory.formObject(this.offerForm.value);
    // offer.authors = this.book.authors;
    if (this.isUpdatingOffer) {
      this.kgs.update(offer).subscribe(res => {
        this.router.navigate(["offers", offer.id]);
      })
    }
    else {
      // todo user
      offer.user = this.emptyUser;
      offer.user_id = 1;
      this.kgs.create(offer).subscribe(res=>{
        this.offer = OfferFactory.empty();
        this.offerForm.reset(offer);
        this.router.navigate(["offers"]);
      });
    }
  }

}
