import {
OpenAIProvider
} from "./providers/openai.js";


import {
GeminiProvider
} from "./providers/gemini.js";


import {
GroqProvider
} from "./providers/groq.js";


import {
ClaudeProvider
} from "./providers/claude.js";


import {
MockProvider
} from "./providers/mock.js";



export class AIService {


static getProvider(
name:string
){


switch(name){


case "openai":

return new OpenAIProvider();



case "gemini":

return new GeminiProvider();



case "groq":

return new GroqProvider();



case "claude":

return new ClaudeProvider();



case "mock":

return new MockProvider();



default:

throw new Error(
"Unsupported provider"
);


}


}


}
