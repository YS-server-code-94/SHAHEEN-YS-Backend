import {
AIAdapter,
AIRequest,
AIResponse
} from "../ai.types.js";


import {
claudeProvider
} from "../providers/claude.provider.js";


export class ClaudeAdapter
implements AIAdapter {


name =
"CLAUDE" as const;



async chat(
request:AIRequest
):Promise<AIResponse>{

return claudeProvider(request);

}


}
