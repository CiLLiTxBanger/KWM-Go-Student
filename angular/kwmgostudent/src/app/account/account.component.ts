import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../shared/user";
import { UserService } from "../shared/user.service";
import * as moment from "moment";

@Component({
  selector: 'kgs-account',
  templateUrl: './account.component.html',
  styles: [
  ]
})
export class AccountComponent implements OnInit {
  // offers: Offer = NachhilfeFactory.empty();
  user: User = new User(0, [], "", "", false, "", "", "", "")

  constructor(
    private us: UserService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.us.getSingleUser(this.getCurrentUserId()).subscribe(res=>this.user = res, );
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  renderDate(date:any) {
    return moment(date).format("Do MMM YYYY");
  }

  renderDateTime(date:any) {
    return moment(date).format("DD.MM.YYYY - hh:mm");
  }
}
