import {
AIProvider
} from "./provider.interface.js";


import {
OpenAIProvider
} from "./openai.provider.js";


import {
GeminiProvider
} from "./gemini.provider.js";


import {
GroqProvider
} from "./groq.provider.js";



const providers:
Record<string,AIProvider>
={


 OPENAI:
 new OpenAIProvider(),


 GEMINI:
 new GeminiProvider(),


 GROQ:
 new GroqProvider()


};



export function getAIProvider(
name:string="OPENAI"
)
{

 const provider =
 providers[name];


 if(!provider)
 {

 throw new Error(
 "AI provider not supported"
 );

 }


 return provider;

}
