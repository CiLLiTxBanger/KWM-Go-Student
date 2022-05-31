import { Offer } from "./offer";

export class OfferFactory {
  static empty():Offer {
    return new Offer(0, 0,{ id:0, offers:[], firstname:"", lastname:"", role:false, email:"", password:""}, "", "", [], [], "");
  }

  static formObject(rawOffer: any):Offer {
    //cast from JSON Object via REST to Offer Domain Object
    return new Offer(
      rawOffer.id,
      rawOffer.user_id,
      rawOffer.user,
      rawOffer.subject,
      rawOffer.description,
      rawOffer.usercomments,
      rawOffer.timeslots,
      rawOffer.created_at,
    );
  }
}
