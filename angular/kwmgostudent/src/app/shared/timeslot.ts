import { User } from "./user";

export class Timeslot {
  constructor(public id:number,
              // public users:User,
              public user_id:number,
              public start:any,
              public end:any) {

  }
}
