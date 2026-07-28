import {
 AIProvider,
 AIResponse
} from "./provider.interface.js";


export class GeminiProvider implements AIProvider {


 name="GEMINI";


 async chat(
 message:string,
 history:any[]
 ):Promise<AIResponse>{


 const start=Date.now();


 const response=
 `Gemini response: ${message}`;


 return {

 content:response,

 model:"gemini-pro",

 provider:this.name,

 tokens:
 response.length,

 latency:
 Date.now()-start

 };


 }

}
