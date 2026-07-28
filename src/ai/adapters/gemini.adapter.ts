import {
AIAdapter,
AIRequest,
AIResponse
} from "../ai.types.js";


import {
geminiProvider
} from "../providers/gemini.provider.js";


export class GeminiAdapter
implements AIAdapter {


name =
"GEMINI" as const;



async chat(
request:AIRequest
):Promise<AIResponse>{

return geminiProvider(request);

}


}
