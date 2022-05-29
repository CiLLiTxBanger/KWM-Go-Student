export class ErrorMessage {

  constructor(
    public forControl:string,
    public forValidator:string,
    public text:string
  ) {  }
}

export const OfferFormErrorMessages = [
  new ErrorMessage('subject', 'required', 'Ein Fach muss angegeben werden'),
  new ErrorMessage('description', 'required', 'Es muss eine Beschreibung angegeben werden'),
  // new ErrorMessage('isbn', 'minlength', 'Die ISBN muss mindestens 10 Zeichen enthalten'),
  // new ErrorMessage('isbn', 'maxlength', 'Eine ISBN darf höchstens 13 Zeichen haben'),
  // new ErrorMessage('isbn', 'isbnFormat', 'ISBN muss 10 oder 13 Zeichen haben'),
  // new ErrorMessage('isbn', 'isbnExists', 'ISBN existiert bereits'),
  new ErrorMessage('created_at', 'required', 'Es muss ein Erscheinungsdatum angegeben werden'),
  // new ErrorMessage('timeslots', 'required', 'Es muss ein Autor angegeben werden'),
  // new ErrorMessage('rating', 'min', 'Bewertung kann nur positive Werte annehmen'),
  // new ErrorMessage('rating', 'max', 'Maximal 10 Sterne erlaubt')
];
