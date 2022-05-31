import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Offer, User } from "../shared/user";
import { KwmGoStudentService } from "../shared/kwm-go-student.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UsercommentFactory } from "../shared/usercomment-factory";
import { OfferFormErrorMessages } from "../offer-form/offer-form-error-messages";
import { UsercommentFormErrorMessages } from "./usercomment-form-error-messages";
import { OfferFactory } from "../shared/offer-factory";
import { Timeslot } from "../shared/timeslot";
import { Usercomment } from "../shared/usercomment";

@Component({
  selector: 'kgs-timeslot-form',
  templateUrl: './usercomment-form.component.html',
  styles: [
  ]
})
export class UsercommentFormComponent implements OnInit {

  usercommentForm:FormGroup;
  usercomment = UsercommentFactory.empty();
  errors:{[key:string]:string} = {};

  constructor(private fb:FormBuilder, private kgs:KwmGoStudentService, private route:ActivatedRoute, private router:Router) {
    this.usercommentForm = this.fb.group({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.usercommentForm = this.fb.group({
      id: this.usercomment.id,
      user_id: this.usercomment.user_id,
      offer_id: id,
      text: [this.usercomment.text, Validators.required]
    });
    this.usercommentForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    });
  }

  private updateErrorMessages() {
    this.errors = {};
    for (const message of UsercommentFormErrorMessages) {
      const control = this.usercommentForm.get(message.forControl);
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
    const usercomment:Usercomment = UsercommentFactory.formObject(this.usercommentForm.value);
    const id = this.route.snapshot.params["id"];
    // todo user
    usercomment.user_id = 1;
    usercomment.offer_id = id;
    this.kgs.createUsercomment(usercomment).subscribe(res=>{
      this.usercomment = UsercommentFactory.empty();
      this.usercommentForm.reset(usercomment);
      this.router.navigate(["offers", id]);
    });
  }
}
