import { Offer } from "./offer";
export { Offer } from "./offer";

export class User {
  constructor(public id:number,
              public offers:Offer[],
              public firstname:string,
              public lastname:string,
              public role:boolean,
              public email:string,
              public password:string,
              public phonenumber?:string,
              public description?:string,) {

  }
}
