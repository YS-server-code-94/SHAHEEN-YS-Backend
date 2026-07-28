export interface AIResponse {

  content:string;

  model:string;

  provider:string;

  tokens:number;

  latency:number;

}


export interface AIProvider {

  name:string;


  chat(
    message:string,
    history:any[]
  ):Promise<AIResponse>;

}
