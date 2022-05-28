import { User } from "./user";

export class Usercomment {
  constructor(public id:number,
              public offer_id:number,
              public user:User,
              public text:string) {

  }
}
