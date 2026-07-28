import OpenAI from "openai";

import {
    AIMessage,
    AIProvider
} from "../../types/provider.js";

import {
    requireApiKey
} from "./providerCheck.js";


export class OpenAIProvider implements AIProvider {


private client:OpenAI;


constructor(){

this.client = new OpenAI({

apiKey:
requireApiKey(
process.env.OPENAI_API_KEY,
"OpenAI"
)

});

}



async chat(
messages:AIMessage[]
):Promise<string>{


try{


const result =
await this.client.chat.completions.create({

model:"gpt-4o-mini",

messages

});


return result
.choices[0]
.message
.content ?? "";


}catch(error){


throw new Error(
"OpenAI request failed"
);


}


}



async stream(
messages:AIMessage[],
onToken:(token:string)=>void
):Promise<void>{


try{


const stream =
await this.client.chat.completions.create({

model:"gpt-4o-mini",

messages,

stream:true

});


for await(
const chunk of stream
){

const token =
chunk.choices[0]
.delta
.content;


if(token)
onToken(token);


}


}catch(error){


throw new Error(
"OpenAI streaming failed"
);


}


}



}
