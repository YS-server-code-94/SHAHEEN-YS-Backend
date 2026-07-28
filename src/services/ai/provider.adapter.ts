export interface AIResponse {
  content: string;
  model: string;
  provider: string;
  tokens: number;
  latency: number;
}


export interface AIProvider {
  chat(message:string):Promise<AIResponse>;
}


export class DefaultAIProvider implements AIProvider {


async chat(message:string):Promise<AIResponse>{

const start = Date.now();


/*
 Temporary adapter.
 Replace with OpenAI/Gemini/Groq adapters.
*/


const response = `SHAHEEN-YS AI Response: ${message}`;


return {

content:response,

model:"default",

provider:"internal",

tokens:response.length,

latency:Date.now()-start

};


}

}
