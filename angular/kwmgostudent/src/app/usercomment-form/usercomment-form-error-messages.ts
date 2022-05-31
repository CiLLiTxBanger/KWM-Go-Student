export class ErrorMessage {

  constructor(
    public forControl:string,
    public forValidator:string,
    public text:string
  ) {  }
}

export const UsercommentFormErrorMessages = [
  new ErrorMessage('start', 'required', 'Start fehlt'),
  new ErrorMessage('end', 'required', 'Ende fehlt')
];
