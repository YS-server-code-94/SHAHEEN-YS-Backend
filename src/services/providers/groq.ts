
import Groq from "groq-sdk";

import {
AIProvider,
AIMessage
}
from "../../types/provider.js";


export class GroqProvider
implements AIProvider{


private client;


constructor(){

this.client=new Groq({

apiKey:
process.env.GROQ_API_KEY

});


}



async chat(messages:AIMessage[]){


const result =
await this.client.chat.completions.create({

model:"llama-3.3-70b-versatile",

messages

});


return result
.choices[0]
.message
.content ?? "";

}



async stream(
messages:AIMessage[],
onToken:(token:string)=>void
){


const stream =
await this.client.chat.completions.create({

model:"llama-3.3-70b-versatile",

messages,

stream:true

});


for await(
const chunk of stream
){

const token =
chunk.choices[0]
.delta.content;


if(token)
onToken(token);

}


}


}

