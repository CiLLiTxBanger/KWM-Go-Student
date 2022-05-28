import { User } from "./user";
import { Usercomment } from "./usercomment";
import { Timelsot } from "./timelsot";

export { User } from "./user";
export { Usercomment } from "./usercomment";
export { Timelsot } from "./timelsot";


export class Offer {
  constructor(public id:number,
              public user:User,
              public subject:string,
              public description:string,
              public created_at:string,
              public usercomments?:Usercomment[],
              public timeslots?:Timelsot[]) {

  }
}
