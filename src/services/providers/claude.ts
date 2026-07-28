import Anthropic from "@anthropic-ai/sdk";

import {
AIMessage,
AIProvider
} from "../../types/provider.js";


import {
requireApiKey
} from "./providerCheck.js";


export class ClaudeProvider implements AIProvider {


private client:Anthropic;



constructor(){


this.client =
new Anthropic({

apiKey:
requireApiKey(
process.env.CLAUDE_API_KEY,
"Claude"
)

});


}



async chat(
messages:AIMessage[]
):Promise<string>{


const result =
await this.client.messages.create({

model:"claude-3-5-sonnet-latest",

max_tokens:1024,

messages:
messages
.filter(
m=>m.role!=="system"
)
.map(m=>({

role:
m.role==="assistant"
?"assistant"
:"user",

content:m.content

}))


});


const block = result.content[0];

if (block.type === "text") {
    return block.text;
}

return "";


}



async stream(
messages:AIMessage[],
onToken:(token:string)=>void
):Promise<void>{


const response =
await this.chat(messages);


onToken(response);


}



}
