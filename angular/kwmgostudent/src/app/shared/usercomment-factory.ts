import { Usercomment } from "./usercomment";

export class UsercommentFactory {
  static empty():Usercomment {
    return new Usercomment(0, 0, 0, "", "");
  }

  static formObject(rawUsercomment: any):Usercomment {
    //cast from JSON Object via REST to Offer Domain Object
    return new Usercomment(
      rawUsercomment.id,
      rawUsercomment.user_id,
      rawUsercomment.offer_id,
      rawUsercomment.text,
      rawUsercomment.created_at
    );
  }
}
