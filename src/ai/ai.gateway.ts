import {
 AIProviderName,
 AIResponse
} from "./ai.types.js";


import {
 createProvider
} from "./provider.factory.js";



export interface GatewayMessage {

 role:
 "user" |
 "assistant" |
 "system";


 content:string;

}



export interface GatewayInput {

 provider?:AIProviderName;

 messages:GatewayMessage[];

 model?:string;

 stream?:boolean;

}




class AIGateway {


 async chat(
 input:GatewayInput
 ):Promise<AIResponse>{


 const providerName =
 input.provider ?? "OPENAI";


 const adapter =
 createProvider(providerName);



 const start =
 Date.now();



 const lastMessage =
 input.messages[
 input.messages.length - 1
 ];



 if(!lastMessage){

 throw new Error(
 "No message provided"
 );

 }



 const response =
 await adapter.chat({

 message:
 lastMessage.content,

 model:
 input.model,

 stream:
 input.stream

 });



 return {

 ...response,

 provider:
 providerName,


 latency:
 Date.now()-start

 };


 }


}



export const aiGateway =
new AIGateway();
