import {
 AIProvider,
 AIResponse
} from "./provider.interface.js";


export class GroqProvider implements AIProvider {


 name="GROQ";


 async chat(
 message:string,
 history:any[]
 ):Promise<AIResponse>{


 const start=Date.now();


 const response=
 `Groq response: ${message}`;


 return {

 content:response,

 model:"llama",

 provider:this.name,

 tokens:
 response.length,

 latency:
 Date.now()-start

 };


 }

}
