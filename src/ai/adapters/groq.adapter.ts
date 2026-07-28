import {
AIAdapter,
AIRequest,
AIResponse
} from "../ai.types.js";


import {
groqProvider
} from "../providers/groq.provider.js";


export class GroqAdapter
implements AIAdapter {


name =
"GROQ" as const;



async chat(
request:AIRequest
):Promise<AIResponse>{

return groqProvider(request);

}


}
