export class AIError extends Error {

  constructor(
    message:string,
    public provider?:string
  ){
    super(message);
    this.name="AIError";
  }

}
