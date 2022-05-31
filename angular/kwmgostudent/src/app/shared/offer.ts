import { User } from "./user";
import { Usercomment } from "./usercomment";
import { Timeslot } from "./timeslot";

export { User } from "./user";
export { Usercomment } from "./usercomment";
export { Timeslot } from "./timeslot";


export class Offer {
  constructor(public id:number,
              public user_id:number,
              public user:User,
              public subject:string,
              public description:string,
              public usercomments?:Usercomment[],
              public timeslots?:Timeslot[],
              public created_at?:any) {

  }
}
