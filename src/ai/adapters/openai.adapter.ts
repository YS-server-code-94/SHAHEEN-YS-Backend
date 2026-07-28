import {
AIAdapter,
AIRequest,
AIResponse
} from "../ai.types.js";


import {
openAIProvider
} from "../providers/openai.provider.js";


export class OpenAIAdapter
implements AIAdapter {


name =
"OPENAI" as const;



async chat(
request:AIRequest
):Promise<AIResponse>{

return openAIProvider(request);

}


}
