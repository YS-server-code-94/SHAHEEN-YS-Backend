
import {
GoogleGenerativeAI
}
from "@google/generative-ai";


import {
AIProvider,
AIMessage
}
from "../../types/provider.js";



export class GeminiProvider
implements AIProvider{


private model;


constructor(){


const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY!
);


this.model =
genAI.getGenerativeModel({
model:"gemini-2.5-flash"
});


}



async chat(
messages:AIMessage[]
){


const result =
await this.model.generateContent(
messages[messages.length-1].content
);


return result.response.text();

}



async stream(
messages:AIMessage[],
onToken:(token:string)=>void
){


const result =
await this.model.generateContentStream(
messages[messages.length-1].content
);



for await(
const chunk of result.stream
){

onToken(chunk.text());

}


}



}

