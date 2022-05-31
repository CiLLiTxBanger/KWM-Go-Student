import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../shared/user";
import { UserService } from "../shared/user.service";

@Component({
  selector: 'kgs-account',
  templateUrl: './account.component.html',
  styles: [
  ]
})
export class AccountComponent implements OnInit {
  // offers: Offer = NachhilfeFactory.empty();
  user: User = new User(0, [], "ds", "sds", false, "", "", "", "")
  //todo wo wird formUser in factory aufgerufen?

  // user: User | undefined;

  constructor(
    private us: UserService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    console.log(this.user);
    this.us.getSingleUser(this.getCurrentUserId()).subscribe(res=>this.user =res);
    console.log(this.user);
  }
  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }
}
