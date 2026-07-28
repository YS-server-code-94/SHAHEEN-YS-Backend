import {
 AIProvider,
 AIResponse
} from "./provider.interface.js";


export class OpenAIProvider implements AIProvider {


 name="OPENAI";


 async chat(
  message:string,
  history:any[]
 ):Promise<AIResponse>{


  const start=Date.now();


  /*
   لاحقاً يتم ربط OpenAI SDK هنا
  */


  const response =
  `OpenAI response: ${message}`;


  return {

   content:response,

   model:"gpt-4",

   provider:this.name,

   tokens:
   response.length,

   latency:
   Date.now()-start

  };


 }

}
